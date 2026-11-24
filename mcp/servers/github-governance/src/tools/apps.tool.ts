import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import {
  config,
  formatMcpResponse,
  getOctokitClient,
  getAppJwtOctokit,
} from '@tupynambalucas-dev/mcp-core-github';

export const auditGithubAppsToolDefinition = {
  name: 'audit_github_apps',
  description: 'Audit GitHub Apps metadata, installations, permissions, and declarative alignment across the organization.',
  inputSchema: {
    type: 'object',
    properties: {
      org: { type: 'string', description: 'Organization name (defaults to GITHUB_ORG)' },
      detect_drift: { type: 'boolean', description: 'Whether to compare against foundation declarative manifests' },
    },
  },
};

function resolveFoundationManifestsDir(): string | null {
  const candidates = [
    path.resolve(process.cwd(), 'foundation', 'identity', 'apps', 'github'),
    path.resolve(process.cwd(), '..', 'foundation', 'identity', 'apps', 'github'),
    path.resolve(process.cwd(), '..', '..', 'foundation', 'identity', 'apps', 'github'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      return c;
    }
  }
  return null;
}

export async function handleAuditGithubApps(args: unknown) {
  const schema = z.object({
    org: z.string().optional().default(config.GITHUB_ORG),
    detect_drift: z.boolean().optional().default(true),
  });
  const parsed = schema.parse(args);
  const octokit = await getOctokitClient('org-manager');

  let installations: unknown[] = [];
  try {
    const res = await octokit.request('GET /orgs/{org}/installations', {
      org: parsed.org,
    });
    installations = res.data.installations || [];
  } catch {
    // Non-fatal if token doesn't have org_administration
  }

  const result: Record<string, unknown> = {
    organization: parsed.org,
    installations_count: installations.length,
    installations,
  };

  if (parsed.detect_drift) {
    const foundationDir = resolveFoundationManifestsDir();
    const appAudits: Record<string, unknown>[] = [];
    const tiers: ('org-manager' | 'automation' | 'guardian')[] = ['org-manager', 'automation', 'guardian'];

    for (const tier of tiers) {
      let manifest: Record<string, unknown> | null = null;
      if (foundationDir) {
        const mPath = path.join(foundationDir, tier, 'manifest.json');
        if (fs.existsSync(mPath)) {
          try {
            manifest = JSON.parse(fs.readFileSync(mPath, 'utf8'));
          } catch {}
        }
      }

      try {
        const appClient = await getAppJwtOctokit(tier);
        if (appClient) {
          const appRes = await appClient.request('GET /app');
          const live = appRes.data as {
            id: number;
            slug: string;
            name: string;
            description?: string;
            permissions?: Record<string, string>;
          } | null;

          if (live) {
            const drifts: string[] = [];

            if (manifest) {
              if (live.name !== manifest.name) {
                drifts.push(`Name drift: live '${live.name}' !== manifest '${manifest.name}'`);
              }
              const expectedPerms = (manifest.default_permissions as Record<string, string>) || {};
              const livePerms = (live.permissions as Record<string, string>) || {};
              for (const [p, access] of Object.entries(expectedPerms)) {
                if (livePerms[p] !== access) {
                  drifts.push(`Permission drift on '${p}': live '${livePerms[p] || 'none'}' !== expected '${access}'`);
                }
              }
            }

            appAudits.push({
              tier,
              status: drifts.length === 0 ? 'IN_SYNC' : 'DRIFT_DETECTED',
              app_id: live.id,
              slug: live.slug,
              name: live.name,
              drifts,
              live_permissions: live.permissions,
            });
          }
        } else {
          appAudits.push({
            tier,
            status: 'NO_CREDENTIALS',
            manifest_target: manifest ? manifest.name : 'unknown',
          });
        }
      } catch (err: unknown) {
        appAudits.push({
          tier,
          status: 'ERROR',
          error: (err as Error).message,
        });
      }
    }

    result.apps_audit = appAudits;
  }

  return formatMcpResponse(result);
}
