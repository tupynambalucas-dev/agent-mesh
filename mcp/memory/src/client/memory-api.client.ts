import { config } from '../config.js';

export class MemoryApiClient {
  private baseUrl: string;

  constructor() {
    const rawUrl = config.MEMORY_API_URL || 'http://memory-api:3006';
    this.baseUrl = rawUrl.endsWith('/api/memory')
      ? rawUrl
      : `${rawUrl.replace(/\/+$/, '')}/api/memory`;
  }

  async searchKnowledge(
    query: string,
    limit = 5,
    _minScore = 0.7,
    filter?: Record<string, unknown>,
  ): Promise<unknown> {
    const res = await fetch(`${this.baseUrl}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, limit, filter }),
    });

    if (!res.ok) {
      throw new Error(`Memory API search failed with status ${res.status}`);
    }

    return (await res.json()) as unknown;
  }

  async storeEpisodic(
    sessionId: string,
    role: 'user' | 'assistant' | 'system',
    content: string,
  ): Promise<unknown> {
    const res = await fetch(`${this.baseUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversationId: sessionId,
        agentId: 'cortex-agent',
        role,
        content,
      }),
    });

    if (!res.ok) {
      throw new Error(`Memory API chat store failed with status ${res.status}`);
    }

    return (await res.json()) as unknown;
  }

  async queryGraph(entityId?: string, maxDepth = 2): Promise<unknown> {
    const url = new URL(`${this.baseUrl}/graph`);
    if (entityId) url.searchParams.append('entityId', entityId);
    url.searchParams.append('maxDepth', maxDepth.toString());

    const res = await fetch(url.toString());

    if (!res.ok) {
      throw new Error(`Memory API graph query failed with status ${res.status}`);
    }

    return (await res.json()) as unknown;
  }

  async ingestDocument(_title?: string, _content?: string, _source?: string): Promise<unknown> {
    const res = await fetch(`${this.baseUrl}/ingest/docs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      throw new Error(`Memory API ingest failed with status ${res.status}`);
    }

    return (await res.json()) as unknown;
  }
}

export const memoryApiClient = new MemoryApiClient();
