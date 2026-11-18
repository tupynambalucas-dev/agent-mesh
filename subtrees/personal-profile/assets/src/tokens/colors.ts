/**
 * project.local - Canonical Design Tokens
 * Source: @docs/handbook/studio.mdx
 */

export const brandColors = {
  identity: {
    brandPurple: '#4C4D9A', // Primary
    brandBlue: '#2E55A3', // Secondary
    brandViolet: '#AA77A7', // Tertiary
  },
  surface: {
    baseLight: '#F6F6F7', // Base Light Background
    baseDark: '#0F0F0F', // Base Dark Background
    tintLight: '#FFFFFF', // Tint Light (Cards/Containers on light bg)
    shadeDark: '#1C1C21', // Shade Dark (Cards/Containers on dark bg)
  },
  neutral: {
    borderLight: '#E2E2E9', // Border Light
    borderDark: '#2A2A30', // Border Dark
    disabledGray: '#7E7E86',
  },
  typography: {
    titles: {
      light: '#0F0F0F', // Used on light background
      dark: '#F6F6F7', // Used on dark background
    },
    subtitles: {
      light: '#4C4D9A', // Used on light background
      dark: '#AA77A7', // Used on dark background
    },
    paragraphs: {
      light: '#2B2B30', // Used on light background
      dark: '#E2E2E9', // Used on dark background
    },
    captions: {
      light: '#7E7E86', // Used on light background
      dark: '#9A9AB0', // Used on dark background
    },
  },
  feedback: {
    accent: '#AA77A7', // CTA accent
    highlight: '#E2A53C',
    success: '#10B981', // Emerald success
    error: '#EF4444', // Rose error
    warning: '#F59E0B',
    info: '#2E55A3',
  },
} as const;

export type BrandColors = typeof brandColors;
