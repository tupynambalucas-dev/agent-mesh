import { sessionManager } from '../browser/session-manager.js';

export const browserClickDefinition = {
  name: 'browser_click',
  description: 'Perform click on a web page',
  inputSchema: {
    type: 'object',
    properties: {
      target: {
        type: 'string',
        description: 'Exact target element reference from the page snapshot, or a unique element selector',
      },
      button: {
        type: 'string',
        enum: ['left', 'right', 'middle'],
        description: 'Button to click, defaults to left',
      },
      doubleClick: {
        type: 'boolean',
        description: 'Whether to perform a double click instead of a single click',
      },
      element: {
        type: 'string',
        description: 'Human-readable element description',
      },
    },
    required: ['target'],
    additionalProperties: false,
  },
};

export const browserTypeDefinition = {
  name: 'browser_type',
  description: 'Type text into an input field or active element',
  inputSchema: {
    type: 'object',
    properties: {
      text: {
        type: 'string',
        description: 'The text to type',
      },
      target: {
        type: 'string',
        description: 'Optional target element selector. If omitted, types into active element.',
      },
      clear: {
        type: 'boolean',
        description: 'Whether to clear existing text before typing',
      },
      pressEnter: {
        type: 'boolean',
        description: 'Whether to press Enter after typing',
      },
    },
    required: ['text'],
    additionalProperties: false,
  },
};

export const browserFillFormDefinition = {
  name: 'browser_fill_form',
  description: 'Fill multiple form fields',
  inputSchema: {
    type: 'object',
    properties: {
      fields: {
        type: 'array',
        description: 'Fields to fill in',
        items: {
          type: 'object',
          properties: {
            target: { type: 'string', description: 'Target element selector' },
            name: { type: 'string', description: 'Field name' },
            type: { type: 'string', enum: ['textbox', 'checkbox', 'radio', 'combobox', 'slider'] },
            value: { type: 'string', description: 'Value to fill' },
          },
          required: ['target', 'name', 'type', 'value'],
          additionalProperties: false,
        },
      },
    },
    required: ['fields'],
    additionalProperties: false,
  },
};

export const browserHoverDefinition = {
  name: 'browser_hover',
  description: 'Hover over an element on the page',
  inputSchema: {
    type: 'object',
    properties: {
      target: {
        type: 'string',
        description: 'Target element selector',
      },
    },
    required: ['target'],
    additionalProperties: false,
  },
};

export const browserSelectOptionDefinition = {
  name: 'browser_select_option',
  description: 'Select an option in a dropdown combobox/select element',
  inputSchema: {
    type: 'object',
    properties: {
      target: {
        type: 'string',
        description: 'Target select element selector',
      },
      value: {
        type: 'string',
        description: 'Option value or label to select',
      },
    },
    required: ['target', 'value'],
    additionalProperties: false,
  },
};

export const browserPressKeyDefinition = {
  name: 'browser_press_key',
  description: 'Press a keyboard key (e.g. Enter, Tab, Escape, ArrowDown)',
  inputSchema: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        description: 'Key name (e.g. Enter, Tab, Escape, Backspace)',
      },
    },
    required: ['key'],
    additionalProperties: false,
  },
};

export async function handleBrowserClick(args: unknown) {
  const { target, button, doubleClick } = args as {
    target: string;
    button?: 'left' | 'right' | 'middle';
    doubleClick?: boolean;
  };
  const page = await sessionManager.getPage();
  const locator = page.locator(target).first();

  if (doubleClick) {
    await locator.dblclick({ button: button || 'left' });
  } else {
    await locator.click({ button: button || 'left' });
  }

  return {
    content: [{ type: 'text', text: `Clicked element successfully: ${target}` }],
  };
}

export async function handleBrowserType(args: unknown) {
  const { text, target, clear, pressEnter } = args as {
    text: string;
    target?: string;
    clear?: boolean;
    pressEnter?: boolean;
  };
  const page = await sessionManager.getPage();

  if (target) {
    const locator = page.locator(target).first();
    if (clear) {
      await locator.fill('');
    }
    await locator.fill(text);
  } else {
    await page.keyboard.type(text);
  }

  if (pressEnter) {
    await page.keyboard.press('Enter');
  }

  return {
    content: [{ type: 'text', text: `Typed text successfully into ${target || 'active element'}` }],
  };
}

export async function handleBrowserFillForm(args: unknown) {
  const { fields } = args as {
    fields: Array<{ target: string; name: string; type: string; value: string }>;
  };
  const page = await sessionManager.getPage();

  for (const field of fields) {
    const locator = page.locator(field.target).first();
    switch (field.type) {
      case 'checkbox':
        if (field.value === 'true') {
          await locator.check();
        } else {
          await locator.uncheck();
        }
        break;
      case 'radio':
        await locator.check();
        break;
      case 'combobox':
        await locator.selectOption({ label: field.value }).catch(() => locator.selectOption(field.value));
        break;
      default:
        await locator.fill(field.value);
    }
  }

  return {
    content: [{ type: 'text', text: `Filled ${fields.length} form field(s) successfully.` }],
  };
}

export async function handleBrowserHover(args: unknown) {
  const { target } = args as { target: string };
  const page = await sessionManager.getPage();
  await page.locator(target).first().hover();
  return {
    content: [{ type: 'text', text: `Hovered over element: ${target}` }],
  };
}

export async function handleBrowserSelectOption(args: unknown) {
  const { target, value } = args as { target: string; value: string };
  const page = await sessionManager.getPage();
  await page.locator(target).first().selectOption({ label: value }).catch(() => page.locator(target).first().selectOption(value));
  return {
    content: [{ type: 'text', text: `Selected option "${value}" on ${target}` }],
  };
}

export async function handleBrowserPressKey(args: unknown) {
  const { key } = args as { key: string };
  const page = await sessionManager.getPage();
  await page.keyboard.press(key);
  return {
    content: [{ type: 'text', text: `Pressed key: ${key}` }],
  };
}
