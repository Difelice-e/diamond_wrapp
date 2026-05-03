import type { Config } from 'tailwindcss';

// Tailwind theme is mapped to the brand tokens (defined in app/tokens.css).
// Components use idiomatic Tailwind class names (bg-bg-base, text-display, ...)
// while every value still traces back to a CSS custom property — palette
// changes happen in tokens.css, not in 40 components.

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': 'var(--color-background-base)',
        'bg-raised': 'var(--color-background-raised)',
        'bg-deep': 'var(--color-background-deep)',
        'bg-overlay': 'var(--color-background-overlay)',

        'text-display': 'var(--color-text-display)',
        'text-display-shadow': 'var(--color-text-display-shadow)',
        'text-default': 'var(--color-text-default)',
        'text-muted': 'var(--color-text-muted)',
        'text-subtle': 'var(--color-text-subtle)',
        'text-inverse': 'var(--color-text-inverse)',

        primary: 'var(--color-action-primary)',
        'primary-hover': 'var(--color-action-primary-hover)',
        'primary-pressed': 'var(--color-action-primary-pressed)',
        'primary-on': 'var(--color-action-primary-on)',

        'purple-deep': 'var(--color-secondary-purple)',
        'purple-bright': 'var(--color-secondary-purple-bright)',
        'purple-tint': 'var(--color-secondary-purple-tint)',

        'pink-tint': 'var(--color-accent-pink-tint)',
        'pink-glow': 'var(--color-accent-pink-glow)',

        'border-subtle': 'var(--color-border-subtle)',
        'border-emphasis': 'var(--color-border-emphasis)',
        'focus-ring': 'var(--color-focus-ring)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
        accent: 'var(--font-accent)',
      },
      fontSize: {
        'display-xl': 'var(--font-size-display-xl)',
        display: 'var(--font-size-display)',
        'display-s': 'var(--font-size-display-s)',
        heading: 'var(--font-size-heading)',
        subheading: 'var(--font-size-subheading)',
        body: 'var(--font-size-body)',
        caption: 'var(--font-size-caption)',
        eyebrow: 'var(--font-size-eyebrow)',
        micro: 'var(--font-size-micro)',
      },
      letterSpacing: {
        'display-xl': 'var(--tracking-display-xl)',
        display: 'var(--tracking-display)',
        'display-s': 'var(--tracking-display-s)',
        heading: 'var(--tracking-heading)',
        body: 'var(--tracking-body)',
        'body-lg': 'var(--tracking-body-large)',
        eyebrow: 'var(--tracking-eyebrow)',
        caption: 'var(--tracking-caption)',
        id: 'var(--tracking-id)',
      },
      lineHeight: {
        display: 'var(--line-height-display)',
        'display-h2': 'var(--line-height-display-h2)',
        heading: 'var(--line-height-heading)',
        pullquote: 'var(--line-height-pullquote)',
        body: 'var(--line-height-body)',
        caption: 'var(--line-height-caption)',
        eyebrow: 'var(--line-height-eyebrow)',
      },
      boxShadow: {
        raised: 'var(--shadow-raised)',
        floating: 'var(--shadow-floating)',
        brand: 'var(--shadow-brand)',
        deep: 'var(--shadow-deep)',
        'focus-ring': 'var(--shadow-focus-ring)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        pill: 'var(--radius-pill)',
      },
      maxWidth: {
        layout: 'var(--layout-max-width)',
        prose: 'var(--layout-max-prose)',
      },
      transitionTimingFunction: {
        house: 'var(--ease-house)',
        state: 'var(--ease-state)',
      },
      transitionDuration: {
        micro: '200ms',
        state: '400ms',
        reveal: '600ms',
        load: '1200ms',
      },
    },
  },
  plugins: [],
};

export default config;
