<!--
  The ThinkingOrb component. One shared clock (performance.now) keeps
  every mounted orb in phase; each instance runs its own rAF loop but
  pauses automatically while offscreen (IntersectionObserver) or when the
  tab is hidden (useDocumentVisibility). Reduced-motion users get a static
  representative frame that still follows the live theme.
-->
<script setup lang="ts">
import {
  useDevicePixelRatio,
  useDocumentVisibility,
  useIntersectionObserver,
  useRafFn
} from '@vueuse/core';
import { computed, ref, watchEffect } from 'vue';
import { MODE_DRAWS } from './engine/registry';
import { resolvePreset } from './presets';
import { useReducedMotion, useResolvedDark } from './theme';
import type { OrbState, ThinkingOrbProps } from './types';

defineOptions({ name: 'ThinkingOrb' });

const LABELS: Record<OrbState, string> = {
  working: 'Working…',
  searching: 'Searching…',
  solving: 'Solving…',
  listening: 'Listening…',
  connecting: 'Connecting…',
  weaving: 'Weaving…',
  composing: 'Composing…',
  breathing: 'Thinking…',
  shaping: 'Shaping…'
};

const props = withDefaults(defineProps<ThinkingOrbProps>(), {
  state: 'working',
  size: 64,
  theme: 'auto',
  speed: 1,
  paused: false
});

const canvas = ref<HTMLCanvasElement | null>(null);
const dark = useResolvedDark(() => props.theme, canvas);
const reduced = useReducedMotion();
const { pixelRatio } = useDevicePixelRatio();
const visibility = useDocumentVisibility();
const onscreen = ref(true);

useIntersectionObserver(canvas, ([entry]) => {
  onscreen.value = entry?.isIntersecting ?? false;
});

let ctx: CanvasRenderingContext2D | null = null;

const resolved = computed(() => resolvePreset(props.state, props.size));
const effSpeed = computed(() => resolved.value.speed * props.speed);

/** Paint one deterministic frame at time `tSec` (seconds on the shared clock). */
function frame(tSec: number) {
  if (!ctx) return;
  const dpr = Math.min(2, pixelRatio.value || 1);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, props.size, props.size);
  MODE_DRAWS[resolved.value.mode](ctx, props.size, tSec, dark.value, resolved.value.opts);
}

// The rAF loop reads `performance.now()` directly (not the callback's
// timestamp) so every instance stays locked to one shared clock.
const { pause, resume } = useRafFn(
  () => frame((performance.now() / 1000) * effSpeed.value),
  { immediate: false }
);

// Should the loop run right now?
const animating = computed(
  () => !props.paused && !reduced.value && onscreen.value && visibility.value !== 'hidden'
);

// Re-runs on any change to size / dpr / state / theme / speed / paused /
// reduced / visibility / onscreen: resize the backing store, draw at least
// one current frame, then start or stop the loop accordingly.
watchEffect(() => {
  const el = canvas.value;
  if (!el) return;

  const dpr = Math.min(2, pixelRatio.value || 1);
  el.width = Math.round(props.size * dpr);
  el.height = Math.round(props.size * dpr);
  ctx = el.getContext('2d');
  if (!ctx) return;

  // reduced motion → one static, deterministic frame, no loop
  if (reduced.value) {
    pause();
    frame(0.6);
    return;
  }

  // draw at least one frame even when paused/offscreen
  frame((performance.now() / 1000) * effSpeed.value);

  if (animating.value) resume();
  else pause();
});

const label = computed(() => LABELS[props.state]);
const rootStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  display: 'block'
}));
</script>

<template>
  <canvas
    ref="canvas"
    role="img"
    :aria-label="label"
    :style="rootStyle"
  />
</template>
