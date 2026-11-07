import { sessionManager } from '../browser/session-manager.js';
import fs from 'node:fs/promises';

export const browserSnapshotDefinition = {
  name: 'browser_snapshot',
  description: 'Capture accessibility snapshot of the current page, this is better than screenshot',
  inputSchema: {
    type: 'object',
    properties: {
      boxes: {
        type: 'boolean',
        description: "Include each element's bounding box as [box=x,y,width,height] in the snapshot. Coordinates are viewport-relative, in CSS pixels.",
      },
      depth: {
        type: 'number',
        description: 'Limit the depth of the snapshot tree',
      },
      filename: {
        type: 'string',
        description: 'Save snapshot to a file instead of returning it in the response. Relative file names are resolved against workspace root.',
      },
      target: {
        type: 'string',
        description: 'Exact target element reference from the page snapshot, or a unique element selector',
      },
    },
    additionalProperties: false,
  },
};

export const browserTakeScreenshotDefinition = {
  name: 'browser_take_screenshot',
  description: 'Capture screenshot of the current page',
  inputSchema: {
    type: 'object',
    properties: {
      fullPage: {
        type: 'boolean',
        description: 'Whether to take a screenshot of the full scrollable page, defaults to false',
      },
      filename: {
        type: 'string',
        description: 'File path to save the screenshot',
      },
      target: {
        type: 'string',
        description: 'Optional element target reference or selector to capture specifically',
      },
    },
    additionalProperties: false,
  },
};

export const browserFindDefinition = {
  name: 'browser_find',
  description: 'Find elements on the page matching text or selector',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Text string or CSS selector to search for',
      },
    },
    required: ['query'],
    additionalProperties: false,
  },
};

export const browserInspectActiveTabDefinition = {
  name: 'browser_inspect_active_tab',
  description: 'Inspect the currently active tab on the developer desktop browser, returning title, URL, mode, and accessibility hierarchy.',
  inputSchema: {
    type: 'object',
    properties: {},
    additionalProperties: false,
  },
};

export async function handleBrowserSnapshot(args: unknown) {
  const { depth, filename, target } = (args || {}) as {
    boxes?: boolean;
    depth?: number;
    filename?: string;
    target?: string;
  };
  const page = await sessionManager.getPage();

  let snapshotText = '';

  if (target) {
    const locator = page.locator(target);
    const count = await locator.count();
    if (count === 0) {
      throw new Error(`Target element not found: ${target}`);
    }
    const innerText = await locator.first().innerText();
    snapshotText = `Target: ${target}\nContent:\n${innerText}`;
  } else {
    // ARIA snapshot of the full page (modern Playwright official accessibility snapshot)
    snapshotText = await page.locator(':root').ariaSnapshot();
  }

  if (filename) {
    await fs.writeFile(filename, snapshotText, 'utf-8');
    return {
      content: [
        {
          type: 'text',
          text: `Snapshot saved successfully to: ${filename}`,
        },
      ],
    };
  }

  return {
    content: [
      {
        type: 'text',
        text: snapshotText,
      },
    ],
  };
}

export async function handleBrowserTakeScreenshot(args: unknown) {
  const { fullPage, filename, target } = (args || {}) as {
    fullPage?: boolean;
    filename?: string;
    target?: string;
  };
  const page = await sessionManager.getPage();

  let buffer: Buffer;

  if (target) {
    const locator = page.locator(target).first();
    buffer = await locator.screenshot();
  } else {
    buffer = await page.screenshot({ fullPage: fullPage ?? false });
  }

  if (filename) {
    await fs.writeFile(filename, buffer);
    return {
      content: [
        {
          type: 'text',
          text: `Screenshot saved successfully to: ${filename}`,
        },
      ],
    };
  }

  const base64 = buffer.toString('base64');
  return {
    content: [
      {
        type: 'image',
        data: base64,
        mimeType: 'image/png',
      },
    ],
  };
}

export async function handleBrowserFind(args: unknown) {
  const { query } = args as { query: string };
  if (!query) {
    throw new Error('Query string is required.');
  }
  const page = await sessionManager.getPage();

  // Try text locator first, then CSS selector
  let locator = page.getByText(query);
  let count = await locator.count();

  if (count === 0) {
    locator = page.locator(query);
    count = await locator.count();
  }

  if (count === 0) {
    return {
      content: [
        {
          type: 'text',
          text: `No matching elements found for query: "${query}"`,
        },
      ],
    };
  }

  const results: string[] = [];
  for (let i = 0; i < Math.min(count, 5); i++) {
    const el = locator.nth(i);
    const text = await el.innerText().catch(() => '');
    const tag = await el.evaluate((node) => node.tagName.toLowerCase()).catch(() => 'unknown');
    results.push(`[${i}] <${tag}>: ${text.slice(0, 100).replace(/\n/g, ' ')}`);
  }

  return {
    content: [
      {
        type: 'text',
        text: `Found ${count} element(s) matching "${query}":\n${results.join('\n')}`,
      },
    ],
  };
}

export async function handleBrowserInspectActiveTab() {
  const page = await sessionManager.getPage();
  const title = await page.title();
  const url = page.url();
  const mode = sessionManager.getActiveMode();
  const pages = await sessionManager.getAllPages();
  const a11y = await page.locator(':root').ariaSnapshot();

  const summary = [
    `Mode: ${mode}`,
    `Active Page Title: ${title}`,
    `URL: ${url}`,
    `Total Open Tabs: ${pages.length}`,
    '',
    'ARIA Accessibility Hierarchy:',
    a11y,
  ].join('\n');

  return {
    content: [
      {
        type: 'text',
        text: summary,
      },
    ],
  };
}
