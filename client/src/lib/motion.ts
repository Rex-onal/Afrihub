import type { Variants } from 'motion/react';

/**
 * Standard cubic-bezier easing curves
 */
export const EASINGS = {
  // Editorial smooth deceleration
  smooth: [0.16, 1, 0.3, 1] as const,
  // Snappy for interactive elements & buttons
  snappy: [0.34, 1.56, 0.64, 1] as const,
  // Standard ease-out
  easeOut: [0.25, 1, 0.5, 1] as const,
};

/**
 * Standard transition duration tokens
 */
export const DURATIONS = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  reveal: 0.55,
  heroEntrance: 0.7,
  slowZoom: 6.0,
};

/* ==========================================================================
   HERO ENTRANCE VARIANTS
   Rule: Hero headline maintains visible opacity on first frame for LCP!
   ========================================================================== */

export const heroContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const heroEyebrowVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.smooth,
    },
  },
};

/**
 * Headline strictly uses transform to preserve LCP visibility from frame 0
 */
export const heroHeadlineVariants: Variants = {
  hidden: { y: 20 },
  visible: {
    y: 0,
    transition: {
      duration: DURATIONS.heroEntrance,
      ease: EASINGS.smooth,
    },
  },
};

export const heroSubtitleVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.reveal,
      ease: EASINGS.smooth,
    },
  },
};

export const heroCtaVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.smooth,
    },
  },
};

export const heroStatsRibbonVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.reveal,
      ease: EASINGS.smooth,
    },
  },
};

export const heroCollageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: EASINGS.smooth,
    },
  },
};

/* ==========================================================================
   INTERACTIVE BUTTON & CARD MICRO-INTERACTIONS
   ========================================================================== */

export const buttonHoverVariants: Variants = {
  initial: { y: 0 },
  hover: {
    y: -2,
    transition: { duration: 0.18, ease: EASINGS.easeOut },
  },
  tap: { scale: 0.97 },
};

export const arrowGlideVariants: Variants = {
  initial: { x: 0 },
  hover: {
    x: 4,
    transition: { duration: 0.2, ease: EASINGS.easeOut },
  },
};

export const cardHoverVariants: Variants = {
  initial: { y: 0 },
  hover: {
    y: -4,
    transition: { duration: 0.25, ease: EASINGS.smooth },
  },
};

export const plusRotateVariants: Variants = {
  initial: { rotate: 0 },
  hover: {
    rotate: 90,
    transition: { duration: 0.25, ease: EASINGS.snappy },
  },
};

/* ==========================================================================
   SITE-WIDE SCROLL REVEAL VARIANTS
   ========================================================================== */

export const sectionRevealVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.reveal,
      ease: EASINGS.smooth,
      staggerChildren: 0.1,
    },
  },
};

export const childStaggerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.smooth,
    },
  },
};

export const fadeInUp: Variants = childStaggerVariants;
export const staggerContainer: Variants = sectionRevealVariants;
export const staggerItem: Variants = childStaggerVariants;

export const routeTransitionVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: DURATIONS.fast, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
};

export const formFeedbackVariants: Variants = {
  hidden: { opacity: 0, y: -4, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DURATIONS.fast, ease: EASINGS.smooth },
  },
  exit: {
    opacity: 0,
    y: -4,
    scale: 0.98,
    transition: { duration: 0.15 },
  },
};

/* ==========================================================================
   COUNT-UP UTILITY FOR STATS
   Parses prefixes (e.g. "$"), numbers ("120", "2.4"), and suffixes ("k+", "M+")
   ========================================================================== */

export interface ParsedStatValue {
  prefix: string;
  numericValue: number;
  decimals: number;
  suffix: string;
  hasCommas: boolean;
}

export function parseStatValue(raw: string): ParsedStatValue {
  const match = raw.match(/^([^0-9.]*)([0-9,]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) {
    return { prefix: '', numericValue: 0, decimals: 0, suffix: raw, hasCommas: false };
  }

  const prefix = match[1] || '';
  const numStrWithCommas = match[2] || '0';
  const suffix = match[3] || '';
  const hasCommas = numStrWithCommas.includes(',');
  const cleanNumStr = numStrWithCommas.replace(/,/g, '');
  const decimals = cleanNumStr.includes('.') ? cleanNumStr.split('.')[1].length : 0;
  const numericValue = parseFloat(cleanNumStr);

  return { prefix, numericValue, decimals, suffix, hasCommas };
}
