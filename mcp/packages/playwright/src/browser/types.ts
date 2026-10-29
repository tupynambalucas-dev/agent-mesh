import type { Page, Browser, BrowserContext } from 'playwright';

export type SessionMode = 'auto' | 'extension' | 'channel' | 'cdp' | 'headless';

export interface SessionOptions {
  mode?: SessionMode;
  channel?: 'chrome' | 'msedge' | 'chrome-beta' | 'chrome-canary' | 'chromium';
  cdpUrl?: string;
  headless?: boolean;
}

export interface ResolvedSession {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  mode: SessionMode;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}
