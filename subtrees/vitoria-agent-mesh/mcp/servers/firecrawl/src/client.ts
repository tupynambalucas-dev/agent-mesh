import Firecrawl from 'firecrawl';
import { config } from './config.js';

let _client: Firecrawl | null = null;

function getClient(): Firecrawl {
  if (!_client) {
    const key = config.FIRECRAWL_API_KEY || process.env.FIRECRAWL_API_KEY || 'fc-placeholder-key';
    _client = new Firecrawl({
      apiKey: key,
      apiUrl: config.FIRECRAWL_API_URL || undefined,
    });
  }
  return _client;
}

export const firecrawlClient = new Proxy({} as Firecrawl, {
  get(_target, prop) {
    const client = getClient();
    const val = (client as unknown as Record<string | symbol, unknown>)[prop];
    if (typeof val === 'function') {
      return (val as (...args: unknown[]) => unknown).bind(client);
    }
    return val;
  },
});
