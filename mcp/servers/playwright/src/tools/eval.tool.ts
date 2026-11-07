import { sessionManager } from '../browser/session-manager.js';

export const browserEvaluateDefinition = {
  name: 'browser_evaluate',
  description: 'Evaluate JavaScript code in the browser page context',
  inputSchema: {
    type: 'object',
    properties: {
      expression: {
        type: 'string',
        description: 'JavaScript code/expression to evaluate',
      },
    },
    required: ['expression'],
    additionalProperties: false,
  },
};

export const browserWaitForDefinition = {
  name: 'browser_wait_for',
  description: 'Wait for text to appear, disappear, or a specified time to elapse',
  inputSchema: {
    type: 'object',
    properties: {
      text: {
        type: 'string',
        description: 'Text string to wait for',
      },
      textGone: {
        type: 'string',
        description: 'Text string to wait to disappear',
      },
      time: {
        type: 'number',
        description: 'Time in seconds to wait (maximum 30 seconds)',
      },
    },
    additionalProperties: false,
  },
};

export const browserResizeDefinition = {
  name: 'browser_resize',
  description: 'Resize the browser viewport dimensions',
  inputSchema: {
    type: 'object',
    properties: {
      width: {
        type: 'number',
        description: 'Viewport width in pixels',
      },
      height: {
        type: 'number',
        description: 'Viewport height in pixels',
      },
    },
    required: ['width', 'height'],
    additionalProperties: false,
  },
};

export const browserCloseDefinition = {
  name: 'browser_close',
  description: 'Close active browser session or tab',
  inputSchema: {
    type: 'object',
    properties: {},
    additionalProperties: false,
  },
};

export async function handleBrowserEvaluate(args: unknown) {
  const { expression } = args as { expression: string };
  const page = await sessionManager.getPage();
  const result = await page.evaluate(expression);

  return {
    content: [
      {
        type: 'text',
        text: `Evaluation result: ${JSON.stringify(result, null, 2)}`,
      },
    ],
  };
}

export async function handleBrowserWaitFor(args: unknown) {
  const { text, textGone, time } = (args || {}) as {
    text?: string;
    textGone?: string;
    time?: number;
  };
  const page = await sessionManager.getPage();

  if (time && time > 0) {
    const clampedTime = Math.min(time, 30);
    await page.waitForTimeout(clampedTime * 1000);
  }

  if (text) {
    await page.getByText(text).first().waitFor({ state: 'visible', timeout: 30000 });
  }

  if (textGone) {
    await page.getByText(textGone).first().waitFor({ state: 'hidden', timeout: 30000 });
  }

  return {
    content: [
      {
        type: 'text',
        text: 'Wait condition fulfilled successfully.',
      },
    ],
  };
}

export async function handleBrowserResize(args: unknown) {
  const { width, height } = args as { width: number; height: number };
  const page = await sessionManager.getPage();
  await page.setViewportSize({ width, height });
  return {
    content: [
      {
        type: 'text',
        text: `Viewport resized to ${width}x${height} pixels.`,
      },
    ],
  };
}

export async function handleBrowserClose() {
  await sessionManager.closeAll();
  return {
    content: [
      {
        type: 'text',
        text: 'Browser session closed/detached successfully.',
      },
    ],
  };
}
