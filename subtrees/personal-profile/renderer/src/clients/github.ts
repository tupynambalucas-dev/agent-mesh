import type { Repository, GitHubStats } from '../schemas/githubstats.schema.js';

// Helper function to sleep for a specified duration in milliseconds
const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

interface FetchOptions {
  token: string;
  maxRetries: number;
}

interface GraphQLBasicResponse {
  data?: {
    viewer?: {
      login: string;
      name: string | null;
      contributionsCollection?: {
        contributionYears: number[];
      };
    };
  };
  errors?: Array<{ message: string }>;
}

interface UserEmail {
  email: string;
  primary: boolean;
  verified: boolean;
}

interface ContributorStats {
  author?: {
    login: string;
  };
  weeks?: Array<{
    a?: number;
    d?: number;
    c?: number;
  }>;
}

interface RepositoryContributionEdge {
  repository?: {
    nameWithOwner: string;
    stargazerCount?: number;
    forkCount?: number;
    isPrivate?: boolean;
    languages?: {
      edges?: Array<{
        size: number;
        node: {
          name: string;
          color: string | null;
        };
      }>;
    };
  };
}

interface GraphQLRepoResponse {
  data?: {
    viewer?: {
      contributionsCollection?: {
        totalRepositoryContributions?: number;
        totalIssueContributions?: number;
        totalCommitContributions?: number;
        totalPullRequestContributions?: number;
        totalPullRequestReviewContributions?: number;
        commitContributionsByRepository?: RepositoryContributionEdge[];
      };
    };
  };
  errors?: Array<{ message: string }>;
}

/**
 * Fetch basic user info: username, profile name, and contribution years.
 */
export async function getBasicInfo(token: string): Promise<{
  login: string;
  name: string;
  years: number[];
  emails: string[];
}> {
  console.info('Getting contribution years and basic info...');
  const query = `
    query {
      viewer {
        login
        name
        contributionsCollection {
          contributionYears
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'monorepo-profile-generator',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to get basic info from GitHub API: ${response.status} ${response.statusText}`,
    );
  }

  const json = (await response.json()) as GraphQLBasicResponse;
  if (json.errors !== undefined && json.errors.length > 0) {
    throw new Error(`GraphQL Errors in getBasicInfo: ${JSON.stringify(json.errors)}`);
  }

  const viewer = json.data?.viewer;
  if (viewer === undefined) {
    throw new Error('Invalid GraphQL response structure in getBasicInfo');
  }

  const login = viewer.login;
  const name = viewer.name ?? login;
  const years = viewer.contributionsCollection?.contributionYears ?? [];

  console.info('Getting contributor emails...');
  let emails: string[] = [];
  try {
    const emailRes = await fetch('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'monorepo-profile-generator',
      },
    });

    if (emailRes.ok) {
      const emailJson = (await emailRes.json()) as UserEmail[];
      emails = emailJson
        .map((e) => e.email)
        .filter((email): email is string => typeof email === 'string' && email !== '');
    } else {
      console.warn(
        `Failed to get user emails. Token may lack 'user:email' permission. Status: ${emailRes.status}`,
      );
    }
  } catch (err) {
    console.warn('Failed to get user emails due to connection error:', err);
  }

  if (emails.length === 0) {
    emails = [`${login}@users.noreply.github.com`];
  }

  return { login, name, years, emails };
}

/**
 * Fetch lines changed for a repository from GitHub's REST endpoint.
 * Returns:
 * - 'ok' if lines changed were successfully retrieved and set
 * - 'retry' if the endpoint returned 202, 403, or 429
 * - 'failed' if other error occurred
 */
async function fetchLinesChangedForRepo(
  repo: Repository,
  login: string,
  token: string,
): Promise<'ok' | 'retry' | 'failed'> {
  const url = `https://api.github.com/repos/${repo.name}/stats/contributors`;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'monorepo-profile-generator',
      },
    });

    if (res.status === 200) {
      const contributors = (await res.json()) as ContributorStats[];
      let linesChanged = 0;
      if (Array.isArray(contributors)) {
        for (const contributor of contributors) {
          if (contributor.author?.login === login) {
            for (const week of contributor.weeks ?? []) {
              linesChanged += (week.a ?? 0) + (week.d ?? 0);
            }
          }
        }
      }
      repo.lines_changed = linesChanged;
      console.info(`Got ${linesChanged} lines changed by ${login} in ${repo.name}`);
      return 'ok';
    }

    if (res.status === 202 || res.status === 403 || res.status === 429) {
      console.info(
        `Status ${res.status} (Accepted/RateLimited) when querying contributors stats for ${repo.name}`,
      );
      return 'retry';
    }

    console.warn(
      `Unexpected status ${res.status} when querying contributors stats for ${repo.name}`,
    );
    return 'failed';
  } catch (error) {
    console.error(`Error querying contributors stats for ${repo.name}:`, error);
    return 'failed';
  }
}

/**
 * Fetch repository views (traffic statistics) from GitHub's REST API.
 */
async function fetchViewsForRepo(repo: Repository, token: string): Promise<void> {
  const url = `https://api.github.com/repos/${repo.name}/traffic/views`;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'monorepo-profile-generator',
      },
    });

    if (res.ok) {
      const data = (await res.json()) as { count?: number };
      repo.views = data.count ?? 0;
    } else {
      console.info(`Failed to get views for ${repo.name} (Status: ${res.status})`);
    }
  } catch (error) {
    console.info(`Failed to get views for ${repo.name} due to connection error:`, error);
  }
}

/**
 * Fetch repositories and stats for a given time range (subdivided recursively if threshold reached).
 */
async function getReposByYear(
  token: string,
  login: string,
  year: number,
  startMonth: number,
  months: number,
  stats: GitHubStats,
  seen: Set<string>,
): Promise<void> {
  const fromStr = `${year}-${String(startMonth + 1).padStart(2, '0')}-01T00:00:00Z`;
  const endYear = year + Math.floor((startMonth + months) / 12);
  const endMonth = (startMonth + months) % 12;
  const toStr = `${endYear}-${String(endMonth + 1).padStart(2, '0')}-01T00:00:00Z`;

  console.info(
    `Getting ${months} month(s) of data starting from ${startMonth + 1}/${year} (${fromStr} to ${toStr})...`,
  );

  const query = `
    query ($from: DateTime, $to: DateTime) {
      viewer {
        contributionsCollection(from: $from, to: $to) {
          totalRepositoryContributions
          totalIssueContributions
          totalCommitContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          commitContributionsByRepository(maxRepositories: 100) {
            repository {
              nameWithOwner
              stargazerCount
              forkCount
              isPrivate
              languages(
                first: 100,
                orderBy: { direction: DESC, field: SIZE }
              ) {
                edges {
                  size
                  node {
                    name
                    color
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'monorepo-profile-generator',
    },
    body: JSON.stringify({
      query,
      variables: { from: fromStr, to: toStr },
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to query year ${year} (${startMonth + 1}-${startMonth + months}): ${response.status} ${response.statusText}`,
    );
  }

  const json = (await response.json()) as GraphQLRepoResponse;
  if (json.errors !== undefined && json.errors.length > 0) {
    throw new Error(`GraphQL Errors in getReposByYear: ${JSON.stringify(json.errors)}`);
  }

  const collection = json.data?.viewer?.contributionsCollection;
  if (collection === undefined) {
    throw new Error('Invalid GraphQL response structure in getReposByYear');
  }

  const repoContributions = collection.commitContributionsByRepository ?? [];
  console.info(`Parsed ${repoContributions.length} repositories for this period.`);

  // Recursive Division Strategy matching reference Zig code:
  // If we returned 100 repositories, we split the range into smaller sub-ranges.
  const limit = 100;
  if (repoContributions.length >= limit) {
    let divided = false;
    for (const factor of [2, 3]) {
      if (months % factor === 0) {
        const subMonths = months / factor;
        console.warn(
          `Hit 100 repositories limit. Subdividing ${months}-month range by factor ${factor} into ${factor} parts of ${subMonths} month(s).`,
        );
        for (let i = 0; i < factor; i++) {
          await getReposByYear(
            token,
            login,
            year,
            startMonth + subMonths * i,
            subMonths,
            stats,
            seen,
          );
        }
        divided = true;
        break;
      }
    }

    if (divided) {
      // Early return since subdivided calls will handle the repo processing
      return;
    } else {
      console.warn(
        `More than ${limit} repos returned for ${startMonth + 1}/${year} and cannot subdivide further. Some data may be omitted.`,
      );
    }
  }

  // Aggregate contributions
  stats.repo_contributions += collection.totalRepositoryContributions ?? 0;
  stats.issue_contributions += collection.totalIssueContributions ?? 0;
  stats.commit_contributions += collection.totalCommitContributions ?? 0;
  stats.pr_contributions += collection.totalPullRequestContributions ?? 0;
  stats.review_contributions += collection.totalPullRequestReviewContributions ?? 0;

  for (const contribution of repoContributions) {
    const rawRepo = contribution.repository;
    if (rawRepo === undefined) continue;

    const nameWithOwner = rawRepo.nameWithOwner;
    if (seen.has(nameWithOwner)) {
      console.info(`Skipping repository ${nameWithOwner} (already seen)`);
      continue;
    }

    const repository: Repository = {
      name: nameWithOwner,
      stars: rawRepo.stargazerCount ?? 0,
      forks: rawRepo.forkCount ?? 0,
      private: rawRepo.isPrivate ?? false,
      languages:
        rawRepo.languages?.edges?.map((e) => ({
          name: e.node.name,
          size: e.size,
          color: e.node.color ?? null,
        })) ?? [],
      views: 0,
      lines_changed: 0,
    };

    console.info(`Getting traffic views for ${nameWithOwner}...`);
    await fetchViewsForRepo(repository, token);

    // Make initial attempt to get lines changed from API
    console.info(`Making initial lines changed attempt for ${nameWithOwner}...`);
    await fetchLinesChangedForRepo(repository, login, token);

    seen.add(nameWithOwner);
    stats.repositories.push(repository);
  }
}

/**
 * Fetch all GitHub statistics for the user and compile the raw data.
 */
export async function getGitHubStats(options: FetchOptions): Promise<GitHubStats> {
  const { token, maxRetries } = options;

  const basicInfo = await getBasicInfo(token);
  const seen = new Set<string>();

  const stats: GitHubStats = {
    user: basicInfo.login,
    name: basicInfo.name,
    emails: basicInfo.emails,
    repo_contributions: 0,
    issue_contributions: 0,
    commit_contributions: 0,
    pr_contributions: 0,
    review_contributions: 0,
    repositories: [],
  };

  // Fetch repositories and stats for each contribution year
  for (const year of basicInfo.years) {
    await getReposByYear(token, basicInfo.login, year, 0, 12, stats, seen);
  }

  // Sort repositories by views (descending), then stars + forks (descending)
  stats.repositories.sort((a, b) => {
    if (b.views === a.views) {
      return b.stars + b.forks - (a.stars + a.forks);
    }
    return b.views - a.views;
  });

  // Retry loop for repositories that still need lines_changed (i.e. currently 0)
  console.info('Starting lines changed retry and fallback loop...');
  for (const repo of stats.repositories) {
    if (repo.lines_changed > 0) {
      continue;
    }

    let retryCount = 0;
    let success = false;

    while (retryCount <= maxRetries) {
      const status = await fetchLinesChangedForRepo(repo, basicInfo.login, token);
      if (status === 'ok') {
        success = true;
        break;
      } else if (status === 'retry') {
        retryCount++;
        const delayMs = Math.floor(Math.random() * 4000); // 0 to 4 seconds delay
        console.info(
          `Waiting ${delayMs}ms before retry ${retryCount}/${maxRetries} for ${repo.name}`,
        );
        await sleep(delayMs);
      } else {
        // Other error (404, etc.) - break early to trigger clone fallback immediately
        break;
      }
    }

    if (!success) {
      console.warn(
        `[GitHub API] Failed to fetch lines changed for ${repo.name} after ${maxRetries} retries. Defaulting to 0.`,
      );
      repo.lines_changed = 0;
    }
  }

  return stats;
}

async function getFileSha(
  owner: string,
  repo: string,
  path: string,
  branch: string,
  token: string,
): Promise<string | undefined> {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'monorepo-profile-generator',
    },
  });
  if (response.status === 200) {
    const data = (await response.json()) as { sha: string };
    return data.sha;
  }
  return undefined;
}

export async function uploadFileContents(
  owner: string,
  repo: string,
  path: string,
  content: string,
  branch: string,
  token: string,
  message: string,
): Promise<void> {
  const currentSha = await getFileSha(owner, repo, path, branch, token);
  const base64Content = Buffer.from(content).toString('base64');
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      'User-Agent': 'monorepo-profile-generator',
    },
    body: JSON.stringify({
      message,
      content: base64Content,
      sha: currentSha,
      branch,
    }),
  });

  if (response.ok === false) {
    const errText = await response.text();
    throw new Error(`Failed to upload ${path} to GitHub: ${response.statusText} - ${errText}`);
  }
}
