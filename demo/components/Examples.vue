<script setup lang="ts">
import { computed } from 'vue';
import type { OrbState } from '../../src';
import { ThinkingOrb } from '../../src';

const props = withDefaults(
  defineProps<{
    /** Forwarded to every <ThinkingOrb :speed="..."/> so the Playground's
     *  speed slider drives these hero examples too. */
    speed?: number;
    /** Dev-only: strip the gray surface fill behind the hero boxes. */
    debug?: boolean;
    /** Dev-only: render the small chips as large pills. */
    bigChips?: boolean;
    /** Dev-only: force every pill (hero + chips) to the small chip style. */
    smallAll?: boolean;
  }>(),
  { speed: 1, debug: false, bigChips: false, smallAll: false }
);

const listeningPillClass =
  'inline-flex items-center gap-3 w-[270px] h-[74px] pl-[9px] pr-8 rounded-full bg-(--pill-fill) shadow-(--pill-stroke) text-(--pill-fg) text-lg leading-6 font-inherit cursor-default';
const chipClass =
  'inline-flex items-center gap-2 h-9 pl-2 pr-3.5 rounded-full bg-(--pill-fill) shadow-(--pill-stroke) text-(--pill-fg) text-xs leading-[14px] font-inherit cursor-default';

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Chip states that render as full large pills (the rest stay compact).
const LARGE_CHIPS = new Set<OrbState>(['working', 'searching']);

const HERO_PILLS: Array<{ state: OrbState; label: string }> = [
  { state: 'solving', label: 'Solving….' },
  { state: 'composing', label: 'Thinking….' }
];

const CHIP_STATES: OrbState[] = ['listening', 'working', 'searching', 'shaping'];

const surface = computed(() => (props.debug ? 'bg-transparent' : 'bg-(--hero-surface)'));

const chips = computed(() =>
  CHIP_STATES.map((state) => {
    const large = !props.smallAll && (props.bigChips || LARGE_CHIPS.has(state));
    const label = large ? `${cap(state)}….` : `Agent ${state}…`;
    return { state, large, label };
  })
);
</script>

<template>
  <section class="w-full flex flex-col gap-3 mb-12" aria-label="Component demonstrations">
    <!-- Two hero pill mocks, side by side -->
    <div class="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
      <div
        v-for="pill in HERO_PILLS"
        :key="pill.state"
        :class="`relative w-full h-[314px] rounded-[30px] ${surface} flex items-center justify-center px-10 py-12 overflow-hidden max-sm:h-auto max-sm:min-h-[200px] max-sm:px-5 max-sm:py-8 max-sm:rounded-[20px]`"
      >
        <div :class="smallAll ? chipClass : listeningPillClass">
          <ThinkingOrb v-if="smallAll" :state="pill.state" :size="20" :speed="speed" />
          <ThinkingOrb
            v-else
            :state="pill.state"
            :size="64"
            :speed="speed"
            :style="{ width: '56px', height: '56px' }"
          />
          <span class="t-shimmer" :data-text="pill.label">{{ pill.label }}</span>
        </div>
      </div>
    </div>

    <!-- Grid with row-spans (not CSS multi-column) so the mixed-height boxes
         tile with no gaps AND render correctly in Safari, which mishandles
         `break-inside: avoid` on fixed-height multicol items. Auto-rows of
         151px → a 2-row span is 314px (large), a 1-row span is 151px. -->
    <div
      class="grid grid-cols-2 gap-3 [grid-auto-rows:151px] max-sm:grid-cols-1 max-sm:auto-rows-auto"
    >
      <div
        v-for="chip in chips"
        :key="chip.state"
        :class="`relative w-full ${chip.large ? 'row-span-2' : 'row-span-1'} rounded-[30px] ${surface} flex items-center justify-center px-8 py-8 overflow-hidden max-sm:row-auto max-sm:h-auto max-sm:min-h-[200px] max-sm:rounded-[20px]`"
      >
        <div :class="chip.large ? listeningPillClass : chipClass">
          <ThinkingOrb
            v-if="chip.large"
            :state="chip.state"
            :size="64"
            :speed="speed"
            :style="{ width: '56px', height: '56px' }"
          />
          <ThinkingOrb v-else :state="chip.state" :size="20" :speed="speed" />
          <span class="t-shimmer" :data-text="chip.label">{{ chip.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
