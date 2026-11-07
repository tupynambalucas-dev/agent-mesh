import type { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import {
  browserNavigateDefinition,
  browserNavigateBackDefinition,
  browserTabsDefinition,
  handleBrowserNavigate,
  handleBrowserNavigateBack,
  handleBrowserTabs,
} from './navigation.tool.js';
import {
  browserSnapshotDefinition,
  browserTakeScreenshotDefinition,
  browserFindDefinition,
  browserInspectActiveTabDefinition,
  handleBrowserSnapshot,
  handleBrowserTakeScreenshot,
  handleBrowserFind,
  handleBrowserInspectActiveTab,
} from './inspect.tool.js';
import {
  browserClickDefinition,
  browserTypeDefinition,
  browserFillFormDefinition,
  browserHoverDefinition,
  browserSelectOptionDefinition,
  browserPressKeyDefinition,
  handleBrowserClick,
  handleBrowserType,
  handleBrowserFillForm,
  handleBrowserHover,
  handleBrowserSelectOption,
  handleBrowserPressKey,
} from './interaction.tool.js';
import {
  browserEvaluateDefinition,
  browserWaitForDefinition,
  browserResizeDefinition,
  browserCloseDefinition,
  handleBrowserEvaluate,
  handleBrowserWaitFor,
  handleBrowserResize,
  handleBrowserClose,
} from './eval.tool.js';

export const allTools = [
  browserNavigateDefinition,
  browserNavigateBackDefinition,
  browserTabsDefinition,
  browserSnapshotDefinition,
  browserTakeScreenshotDefinition,
  browserFindDefinition,
  browserInspectActiveTabDefinition,
  browserClickDefinition,
  browserTypeDefinition,
  browserFillFormDefinition,
  browserHoverDefinition,
  browserSelectOptionDefinition,
  browserPressKeyDefinition,
  browserEvaluateDefinition,
  browserWaitForDefinition,
  browserResizeDefinition,
  browserCloseDefinition,
];

export function registerToolHandlers(server: Server) {
  server.setRequestHandler(ListToolsRequestSchema, () => {
    return Promise.resolve({ tools: allTools });
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        case 'browser_navigate':
          return await handleBrowserNavigate(args);
        case 'browser_navigate_back':
          return await handleBrowserNavigateBack();
        case 'browser_tabs':
          return await handleBrowserTabs(args);
        case 'browser_snapshot':
          return await handleBrowserSnapshot(args);
        case 'browser_take_screenshot':
          return await handleBrowserTakeScreenshot(args);
        case 'browser_find':
          return await handleBrowserFind(args);
        case 'browser_inspect_active_tab':
          return await handleBrowserInspectActiveTab();
        case 'browser_click':
          return await handleBrowserClick(args);
        case 'browser_type':
          return await handleBrowserType(args);
        case 'browser_fill_form':
          return await handleBrowserFillForm(args);
        case 'browser_hover':
          return await handleBrowserHover(args);
        case 'browser_select_option':
          return await handleBrowserSelectOption(args);
        case 'browser_press_key':
          return await handleBrowserPressKey(args);
        case 'browser_evaluate':
          return await handleBrowserEvaluate(args);
        case 'browser_wait_for':
          return await handleBrowserWaitFor(args);
        case 'browser_resize':
          return await handleBrowserResize(args);
        case 'browser_close':
          return await handleBrowserClose();
        default:
          throw new Error(`Unknown tool requested: ${name}`);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      return {
        isError: true,
        content: [{ type: 'text', text: `Error executing Playwright tool '${name}': ${errorMessage}` }],
      };
    }
  });
}
