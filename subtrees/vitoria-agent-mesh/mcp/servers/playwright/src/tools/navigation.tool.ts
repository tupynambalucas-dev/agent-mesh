import { sessionManager } from '../browser/session-manager.js';

export const browserNavigateDefinition = {
  name: 'browser_navigate',
  description: 'Navigate to a URL',
  inputSchema: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'The URL to navigate to',
      },
    },
    required: ['url'],
    additionalProperties: false,
  },
};

export const browserNavigateBackDefinition = {
  name: 'browser_navigate_back',
  description: 'Navigate back in browser history',
  inputSchema: {
    type: 'object',
    properties: {},
    additionalProperties: false,
  },
};

export const browserTabsDefinition = {
  name: 'browser_tabs',
  description: 'List, create, close, or select a browser tab.',
  inputSchema: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        enum: ['list', 'new', 'close', 'select'],
        description: 'Operation to perform',
      },
      index: {
        type: 'number',
        description: 'Tab index, used for close/select. If omitted for close, current tab is closed.',
      },
      url: {
        type: 'string',
        description: 'URL to navigate to in the new tab, used for new.',
      },
    },
    required: ['action'],
    additionalProperties: false,
  },
};

export async function handleBrowserNavigate(args: unknown) {
  const { url } = args as { url: string };
  if (!url) {
    throw new Error('URL parameter is required.');
  }
  const page = await sessionManager.getPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  const title = await page.title();
  return {
    content: [
      {
        type: 'text',
        text: `Navigated successfully to: ${url}\nPage title: ${title}`,
      },
    ],
  };
}

export async function handleBrowserNavigateBack() {
  const page = await sessionManager.getPage();
  await page.goBack({ waitUntil: 'domcontentloaded' });
  const url = page.url();
  const title = await page.title();
  return {
    content: [
      {
        type: 'text',
        text: `Navigated back to: ${url}\nPage title: ${title}`,
      },
    ],
  };
}

export async function handleBrowserTabs(args: unknown) {
  const { action, index, url } = args as { action: 'list' | 'new' | 'close' | 'select'; index?: number; url?: string };
  switch (action) {
    case 'list': {
      const pages = await sessionManager.getAllPages();
      const tabInfos = await Promise.all(
        pages.map(async (p, i) => {
          const t = await p.title();
          const u = p.url();
          return `[${i}] ${t} (${u})`;
        })
      );
      return {
        content: [
          {
            type: 'text',
            text: tabInfos.length > 0 ? `Open Tabs (${tabInfos.length}):\n${tabInfos.join('\n')}` : 'No open tabs found.',
          },
        ],
      };
    }
    case 'new': {
      const newPage = await sessionManager.newPage(url);
      const title = await newPage.title();
      return {
        content: [
          {
            type: 'text',
            text: `Opened new tab: ${title} (${newPage.url()})`,
          },
        ],
      };
    }
    case 'select': {
      if (typeof index !== 'number') {
        throw new Error('Index parameter is required for tab selection.');
      }
      const selected = await sessionManager.selectPage(index);
      return {
        content: [
          {
            type: 'text',
            text: `Selected tab [${index}]: ${await selected.title()} (${selected.url()})`,
          },
        ],
      };
    }
    case 'close': {
      if (typeof index === 'number') {
        const pages = await sessionManager.getAllPages();
        if (index >= 0 && index < pages.length) {
          await pages[index].close();
        }
      } else {
        await sessionManager.closeCurrentPage();
      }
      return {
        content: [
          {
            type: 'text',
            text: 'Tab closed successfully.',
          },
        ],
      };
    }
    default:
      throw new Error(`Unsupported tab action: ${action}`);
  }
}
