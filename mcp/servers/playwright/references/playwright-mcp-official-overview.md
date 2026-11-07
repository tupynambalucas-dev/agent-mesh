# Playwright MCP Official Architecture & Overview

This reference synthesizes the official Microsoft Playwright documentation from [https://playwright.dev/mcp/](https://playwright.dev/mcp/) and the official [`microsoft/playwright-mcp`](https://github.com/microsoft/playwright-mcp) repository.

---

## 1. Executive Summary

The **Playwright Model Context Protocol (MCP)** server provides automated browser execution primitives for Large Language Models (LLMs) and autonomous AI coding agents (such as Antigravity, Claude Code, Cursor, Windsurf, and VS Code).

Rather than forcing AI models to interpret noisy, pixel-heavy screenshots via computationally expensive multi-modal vision models, Playwright MCP interacts with web applications using structured **Accessibility Snapshots**.

---

## 2. Accessibility Snapshots vs. Vision Models

Traditional agentic browser frameworks capture full-page PNG screenshots and transmit them to multi-modal vision models. This introduces critical failure modes:
1. **High Token Consumption**: A single high-resolution screenshot can consume 1,500 to 3,000 tokens per action. A 10-step form workflow rapidly exhausts context windows.
2. **Spatial Hallucinations**: Vision models frequently miscalculate button click coordinates `(x, y)` due to CSS scaling, device pixel ratios, and scroll offsets.
3. **Flakiness with Dynamic UI**: Animations, transitions, and loading skeletons cause visual recognition failures.

### The Playwright MCP Solution:
Playwright queries the browser's native **Accessibility Tree (ARIA)** and returns a deterministic, text-based semantic hierarchy:
- Each interactive element is assigned a role and semantic identifier (e.g., `- button "Submit" [ref=4]`, `- textbox "Username" [ref=2]`).
- LLMs reason over semantic roles and accessible names (`getByRole('button', { name: 'Submit' })`).
- Reduces token footprint by **over 80%** while achieving 100% deterministic interaction precision.

---

## 3. Core Capabilities

- **Cross-Browser Engine Parity**: Operates on real Chromium (Blink), Firefox (Gecko), and WebKit (Safari).
- **Auto-Waiting Guarantee**: Actions like clicks and typing automatically wait for elements to become visible, stable, enabled, and interactable before dispatching DOM events.
- **Persistent Authenticated Contexts**: Retains user authentication, session cookies, and local storage across turns.
- **Trace Viewer & Diagnostics**: Generates millisecond-accurate execution traces, network request logs, and console error records for post-execution auditing.
