/**
 * project.local - Canonical Logo System
 * Managed by @studio.
 *
 * This file provides named exports for all brand identity variations.
 * Consumption in Vite/React apps:
 *
 * 1. As a React Component (Dynamic styling):
 *    import { LogoHorizontalPositive } from '@tupynambalucas/studio-assets/logos';
 *    <LogoHorizontalPositive className="w-32" />
 *
 * 2. As a static URL (Standard <img> tag):
 *    import { logoUrls } from '@tupynambalucas/studio-assets/logos';
 *    <img src={logoUrls.horizontalPositive} />
 */

// --- React Component Exports (using ?react query for SVGR) ---

// Horizontal Lockups
export { default as LogoHorizontalPositive } from './logo-horizontal-positive.svg?react';
export { default as LogoHorizontalNegative } from './logo-horizontal-negative.svg?react';

// Marks (Symbols only)
export { default as LogoMarkPositive } from './logo-mark-positive.svg?react';
export { default as LogoMarkNegative } from './logo-mark-negative.svg?react';

// --- Static Asset URL Exports ---

import horizontalPositiveUrl from './logo-horizontal-positive.svg';
import horizontalNegativeUrl from './logo-horizontal-negative.svg';
import markPositiveUrl from './logo-mark-positive.svg';
import markNegativeUrl from './logo-mark-negative.svg';

/**
 * Object containing all logo asset URLs for use in standard <img> tags
 * or CSS background-image.
 */
export const logoUrls = {
  horizontalPositive: horizontalPositiveUrl,
  horizontalNegative: horizontalNegativeUrl,
  markPositive: markPositiveUrl,
  markNegative: markNegativeUrl,
} as const;
