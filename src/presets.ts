// The shipped tunings: nine states × two sizes, baked from the inkform
// mini-page tuning session. `count`/`size` are multipliers over the base
// fine profiles; `speed` multiplies the shared clock. Resolved once per
// (state, size) pair and cached — the render loop sees plain numbers.

import type { ModeOpts } from './engine/profiles';
import { BASE_PROFILES, scaleCounts, scaleRadii } from './engine/profiles';
import type { OrbSize, OrbSizeInput, OrbState } from './types';

export type ModeKey =
  | 'orbits'
  | 'globe'
  | 'rubik'
  | 'wave'
  | 'web'
  | 'braid'
  | 'ribbon'
  | 'ring'
  | 'morph';

export const STATE_TO_MODE: Record<OrbState, ModeKey> = {
  working: 'orbits',
  searching: 'globe',
  solving: 'rubik',
  listening: 'wave',
  connecting: 'web',
  weaving: 'braid',
  composing: 'ribbon',
  breathing: 'ring',
  shaping: 'morph'
};

interface Preset {
  speed: number;
  count: number;
  size: number;
  /** Extra mode opts merged verbatim after scaling. */
  extra?: ModeOpts;
}

const PRESETS: Record<ModeKey, Record<OrbSize, Preset>> = {
  orbits: {
    64: { speed: 1.885, count: 1, size: 1 },
    20: { speed: 3.9, count: 0.238, size: 2.4 }
  },
  globe: {
    64: { speed: 2.015, count: 0.42, size: 1.15, extra: { scanMul: 4.08, dimBase: 0.45 } },
    20: { speed: 2.665, count: 0.105, size: 1.75, extra: { scanMul: 4.335, dimBase: 0.45 } }
  },
  rubik: {
    64: { speed: 1.82, count: 0.35, size: 1.05 },
    20: { speed: 1.95, count: 0.088, size: 1.9 }
  },
  wave: {
    64: { speed: 4.388, count: 0.341, size: 1 },
    20: { speed: 3.998, count: 0.105, size: 1.6 }
  },
  web: {
    64: { speed: 3.315, count: 1.35, size: 0.95 },
    20: { speed: 6.63, count: 0.25, size: 1.52 }
  },
  braid: {
    64: { speed: 1.625, count: 0.5, size: 1 },
    20: { speed: 2.75, count: 0.1125, size: 1.36 }
  },
  ribbon: {
    64: { speed: 2.34, count: 0.25, size: 0.85, extra: { spin: 0, bandMul: 3.9, wobMul: 1 } },
    20: { speed: 3.12, count: 0.051, size: 1.073, extra: { spin: 0, bandMul: 4.94, wobMul: 1 } }
  },
  ring: {
    64: { speed: 3.24, count: 0.25, size: 0.956, extra: { spin: 0, bandMul: 3.627, wobMul: 0.368 } },
    20: { speed: 3.78, count: 0.028, size: 1.622, extra: { spin: 0, bandMul: 3.968, wobMul: 0.565 } }
  },
  morph: {
    64: { speed: 2.405, count: 0.702, size: 0.395, extra: { spread: 1.45 } },
    20: { speed: 2.08, count: 0.53, size: 1.011, extra: { spread: 1.45 } }
  }
};

export interface Resolved {
  mode: ModeKey;
  speed: number;
  opts: ModeOpts;
}

const cache = new Map<string, Resolved>();

const ANCHOR_SMALL: OrbSize = 20;
const ANCHOR_LARGE: OrbSize = 64;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// Log-space interpolation: the two shipped presets are hand-tuned, not a
// scale factor of one another, so a size between/outside 20 and 64 blends
// their count/size/speed rather than picking either verbatim. Log-space
// keeps the blend visually even, since dot count and radius both read on
// a roughly multiplicative scale.
function interpolatePreset(small: Preset, large: Preset, size: number): Preset {
  const t =
    (Math.log(size) - Math.log(ANCHOR_SMALL)) / (Math.log(ANCHOR_LARGE) - Math.log(ANCHOR_SMALL));

  let extra: ModeOpts | undefined;
  if (small.extra || large.extra) {
    extra = {};
    const keys = new Set([...Object.keys(small.extra ?? {}), ...Object.keys(large.extra ?? {})]);
    for (const k of keys) {
      const a = small.extra?.[k];
      const b = large.extra?.[k];
      extra[k] = a != null && b != null ? lerp(a, b, t) : (b ?? a);
    }
  }

  return {
    speed: lerp(small.speed, large.speed, t),
    count: lerp(small.count, large.count, t),
    size: lerp(small.size, large.size, t),
    extra
  };
}

/** Resolve a (state, size) pair to its mode + fully-scaled draw options. */
export function resolvePreset(state: OrbState, size: OrbSizeInput): Resolved {
  const key = `${state}-${size}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const mode = STATE_TO_MODE[state];
  const table = PRESETS[mode];
  const preset =
    size === ANCHOR_SMALL || size === ANCHOR_LARGE
      ? table[size]
      : interpolatePreset(table[ANCHOR_SMALL], table[ANCHOR_LARGE], size);

  let opts: ModeOpts = { ...BASE_PROFILES[mode] };
  if (preset.count !== 1) opts = scaleCounts(opts, preset.count);
  if (preset.size !== 1) opts = scaleRadii(opts, preset.size);
  if (preset.extra) opts = { ...opts, ...preset.extra };

  const resolved: Resolved = { mode, speed: preset.speed, opts };
  cache.set(key, resolved);
  return resolved;
}
