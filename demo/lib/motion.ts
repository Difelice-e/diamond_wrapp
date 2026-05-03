// Shared motion vocabulary. Per brand/site-plan.md §2.0.f, durations and
// easing curves are bound to a small fixed set — values beyond these are
// flagged in the Step 2.5 review.

export const ease = {
  house: [0.16, 1, 0.3, 1] as const,
  state: [0.6, 0, 0.4, 1] as const,
} as const;

export const duration = {
  micro: 0.2,
  state: 0.4,
  reveal: 0.6,
  load: 1.2,
} as const;

export const stagger = 0.08;

// Reveal-on-view default. amount: 0.15 = trigger as soon as 15% of element
// enters viewport (was 0.4, which left content invisible until you'd scrolled
// past most of it on mobile / short viewports).
export const viewportOnce = { once: true, amount: 0.15 } as const;
