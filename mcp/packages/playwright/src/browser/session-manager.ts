import { chromium, type Browser, type BrowserContext, type Page } from 'playwright';
import http from 'node:http';
import { config } from '../config.js';
import type { SessionOptions, SessionMode } from './types.js';

export class UniversalSessionManager {
  private static instance: UniversalSessionManager | null = null;
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private currentPage: Page | null = null;
  private activeMode: SessionMode = 'headless';

  private constructor() {}

  public static getInstance(): UniversalSessionManager {
    if (!UniversalSessionManager.instance) {
      UniversalSessionManager.instance = new UniversalSessionManager();
    }
    return UniversalSessionManager.instance;
  }

  /**
   * Fast probe to verify if a local CDP socket is actively listening on port 9222
   */
  public async isCdpListening(cdpUrl = config.PLAYWRIGHT_CDP_URL): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        const url = new URL(cdpUrl);
        const req = http.get(
          {
            hostname: url.hostname,
            port: url.port || (url.protocol === 'https:' ? 443 : 80),
            path: '/json/version',
            timeout: 200,
          },
          (res) => {
            resolve(res.statusCode === 200);
          }
        );
        req.on('error', () => resolve(false));
        req.on('timeout', () => {
          req.destroy();
          resolve(false);
        });
      } catch {
        resolve(false);
      }
    });
  }

  /**
   * Resolves the primary active Page object based on requested session parameters
   */
  public async getPage(options: SessionOptions = {}): Promise<Page> {
    if (this.currentPage && !this.currentPage.isClosed()) {
      return this.currentPage;
    }

    const requestedMode = options.mode || config.PLAYWRIGHT_MODE;

    // 1. CDP / Extension Mode (Attach to already-open browser)
    if (requestedMode === 'cdp' || requestedMode === 'extension' || (requestedMode === 'auto' && (await this.isCdpListening(options.cdpUrl)))) {
      const endpoint = options.cdpUrl || config.PLAYWRIGHT_CDP_URL;
      const headers = config.PLAYWRIGHT_MCP_EXTENSION_TOKEN
        ? {
            'x-playwright-mcp-token': config.PLAYWRIGHT_MCP_EXTENSION_TOKEN,
            Authorization: `Bearer ${config.PLAYWRIGHT_MCP_EXTENSION_TOKEN}`,
          }
        : undefined;

      if (!this.browser) {
        this.browser = await chromium.connectOverCDP(endpoint, {
          noDefaults: true,
          headers,
        });
      }
      this.context = this.browser.contexts()[0] || (await this.browser.newContext());
      const pages = this.context.pages();
      this.currentPage = pages[pages.length - 1] || (await this.context.newPage());
      this.activeMode = requestedMode === 'extension' ? 'extension' : 'cdp';
      return this.currentPage;
    }

    // 2. Channel Resolution Mode (Zero hardcoded paths via OS registry)
    if (requestedMode === 'channel') {
      const channel = options.channel || config.PLAYWRIGHT_CHANNEL;
      const headless = options.headless ?? config.PLAYWRIGHT_HEADLESS;
      this.browser = await chromium.launch({
        channel: channel === 'chromium' ? undefined : channel,
        headless,
      });
      this.context = await this.browser.newContext();
      this.currentPage = await this.context.newPage();
      this.activeMode = 'channel';
      return this.currentPage;
    }

    // 3. Headless Standalone Sandbox Mode
    if (!this.browser) {
      this.browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      });
    }
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
    });
    this.currentPage = await this.context.newPage();
    this.activeMode = 'headless';
    return this.currentPage;
  }

  public async getAllPages(): Promise<Page[]> {
    if (!this.context) {
      await this.getPage();
    }
    return this.context ? this.context.pages() : [];
  }

  public async newPage(url?: string): Promise<Page> {
    if (!this.context) {
      await this.getPage();
    }
    if (!this.context) {
      throw new Error('Failed to initialize browser context.');
    }
    const page = await this.context.newPage();
    if (url) {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
    }
    this.currentPage = page;
    return page;
  }

  public async selectPage(index: number): Promise<Page> {
    const pages = await this.getAllPages();
    if (index < 0 || index >= pages.length) {
      throw new Error(`Tab index ${index} out of range (total open tabs: ${pages.length}).`);
    }
    this.currentPage = pages[index];
    await this.currentPage.bringToFront();
    return this.currentPage;
  }

  public async closeCurrentPage(): Promise<void> {
    if (this.currentPage && !this.currentPage.isClosed()) {
      await this.currentPage.close();
      const pages = await this.getAllPages();
      this.currentPage = pages.length > 0 ? pages[pages.length - 1] : null;
    }
  }

  public getActiveMode(): SessionMode {
    return this.activeMode;
  }

  /**
   * Graceful cleanup: drops CDP connection without terminating developer's browser process
   */
  public async closeAll(): Promise<void> {
    if (this.activeMode === 'cdp') {
      if (this.browser) {
        await this.browser.close(); // In CDP connect, close() detaches the client connection
        this.browser = null;
      }
    } else {
      if (this.context) {
        await this.context.close();
        this.context = null;
      }
      if (this.browser) {
        await this.browser.close();
        this.browser = null;
      }
    }
    this.currentPage = null;
  }
}

export const sessionManager = UniversalSessionManager.getInstance();
