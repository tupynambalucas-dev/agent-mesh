# Playwright MCP Tool Catalog Reference

The `@tupynambalucas-dev/mcp-playwright` server provides specialized universal browser automation and inspection tools, with native dual-mode desktop inspection capabilities.

---

## 1. Navigation & Lifecycle

| Tool | Parameters | Description |
| :--- | :--- | :--- |
| `browser_navigate` | `url` (string, required) | Navigates the current browser tab to a specified URL. |
| `browser_navigate_back` | *(none)* | Navigates back in browser history. |
| `browser_close` | *(none)* | Closes the current browser session. |
| `browser_tabs` | `action`, `index`, `url` | Lists, creates, closes, or selects browser tabs. |
| `browser_resize` | `width`, `height` | Sets the browser viewport dimensions. |

---

## 2. Page Inspection & Snapshots

| Tool | Parameters | Description |
| :--- | :--- | :--- |
| `browser_inspect_active_tab` | *(none)* | Inspects the active tab on the developer desktop browser, returning title, URL, mode, and ARIA hierarchy. |
| `browser_snapshot` | `target`, `depth`, `boxes`, `filename` | Captures ARIA accessibility tree snapshot of the page with element refs. |
| `browser_take_screenshot` | `fullPage`, `filename`, `target` | Captures high-resolution image of the page or target element. |
| `browser_find` | `query` | Searches DOM tree for elements matching text or accessibility patterns. |
| `browser_console_messages` | *(none)* | Retrieves captured browser console logs (errors, warnings). |
| `browser_network_requests` | *(none)* | Lists captured HTTP/network requests and status codes. |
| `browser_network_request` | `requestId` | Inspects full request headers, payload, and response body. |

---

## 3. Element Interaction

| Tool | Parameters | Description |
| :--- | :--- | :--- |
| `browser_click` | `selector`, `button`, `clickCount` | Clicks an element identified by selector or ref. |
| `browser_type` | `selector`, `text`, `delay` | Types text into an input element character by character. |
| `browser_fill_form` | `selector`, `values` | Fills multiple form fields in a single atomic invocation. |
| `browser_press_key` | `key` (e.g. `Enter`, `Escape`) | Dispatches keyboard key press event. |
| `browser_hover` | `selector` | Moves mouse pointer over target element to trigger tooltips. |
| `browser_select_option` | `selector`, `values` | Selects one or more options in a `<select>` dropdown. |
| `browser_drag` | `source`, `target` | Performs drag-and-drop gesture between elements. |
| `browser_drop` | `target`, `files` | Drops files into a drop zone element. |
| `browser_file_upload` | `selector`, `paths` | Sets file paths for a file input element. |

---

## 4. Execution & Flow Control

| Tool | Parameters | Description |
| :--- | :--- | :--- |
| `browser_wait_for` | `selector`, `state`, `timeout` | Waits for selector to reach state (`visible`, `hidden`, `attached`). |
| `browser_handle_dialog` | `action` (`accept`, `dismiss`) | Configures handler for upcoming browser dialogs (`alert`, `confirm`). |
| `browser_evaluate` | `expression` (string) | Evaluates arbitrary JavaScript inside the page context. |
| `browser_run_code_unsafe` | `code` (string) | Executes multi-line Node.js Playwright script snippet. |
| `browser_emulate_media` | `media`, `colorScheme` | Emulates CSS media types (`print`, `screen`) or color scheme (`dark`, `light`). |
