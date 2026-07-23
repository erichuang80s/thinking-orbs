// Theme resolution: explicit prop → ancestor data-theme/.dark|.light
// class (watched live) → prefers-color-scheme (subscribed live).
// SSR-safe: `usePreferredDark` / `usePreferredReducedMotion` resolve on
// the client only, and the pre-mount fallback is dark.

import { usePreferredDark, usePreferredReducedMotion, useMutationObserver } from '@vueuse/core';
import { type ComputedRef, type MaybeRefOrGetter, type Ref, computed, ref, toValue, watchEffect } from 'vue';
import type { OrbTheme } from './types';

function ancestorTheme(el: Element | null): boolean | null {
  let node: Element | null = el;
  while (node) {
    const attr = node.getAttribute('data-theme');
    if (attr === 'dark') return true;
    if (attr === 'light') return false;
    if (node.classList.contains('dark')) return true;
    if (node.classList.contains('light')) return false;
    node = node.parentElement;
  }
  return null;
}

/** Resolve the effective dark/light substrate for a mounted element. */
export function useResolvedDark(
  theme: MaybeRefOrGetter<OrbTheme>,
  hostRef: Ref<Element | null>
): Ref<boolean> {
  const systemDark = usePreferredDark();
  const dark = ref(true);

  // Re-resolves whenever the theme prop, the system preference or the
  // host element (once mounted) changes.
  watchEffect(() => {
    const t = toValue(theme);
    if (t === 'dark') {
      dark.value = true;
      return;
    }
    if (t === 'light') {
      dark.value = false;
      return;
    }
    const fromTree = ancestorTheme(hostRef.value);
    dark.value = fromTree ?? systemDark.value;
  });

  // Live app-level toggles: watch class/data-theme flips anywhere in the
  // tree and re-walk the ancestor chain from the host element.
  useMutationObserver(
    () => (typeof document !== 'undefined' ? document.documentElement : null),
    () => {
      const t = toValue(theme);
      if (t === 'dark' || t === 'light') return;
      const fromTree = ancestorTheme(hostRef.value);
      dark.value = fromTree ?? systemDark.value;
    },
    { attributes: true, attributeFilter: ['class', 'data-theme'], subtree: true }
  );

  return dark;
}

/** Live `prefers-reduced-motion` — reduced users get a static frame. */
export function useReducedMotion(): ComputedRef<boolean> {
  const motion = usePreferredReducedMotion();
  return computed(() => motion.value === 'reduce');
}
