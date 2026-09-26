/** Shared capability checks so every effect makes the same decision. */

export const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Mouse / trackpad present — hover-driven effects are pointless on touch. */
export const hasFinePointer = () =>
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

export const effectsEnabled = () => hasFinePointer() && !prefersReducedMotion();
