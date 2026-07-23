<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import type { OrbState } from 'thinking-orbs';
import { ThinkingOrb } from 'thinking-orbs';

const STATES: Array<{ state: OrbState; blurb: string }> = [
  { state: 'working', blurb: 'particles on tilted orbits' },
  { state: 'searching', blurb: 'a scan meridian sweeps the field' },
  { state: 'solving', blurb: 'bands scramble, then click back' },
  { state: 'listening', blurb: 'a waveform rolls through the rings' },
  { state: 'composing', blurb: 'an undulating sash of bands' },
  { state: 'shaping', blurb: 'circle → triangle → square' }
];

const dark = ref(true);

// Drive the ancestor `data-theme` attribute — the same signal the
// library's auto detection reads in a host project.
watchEffect(() => {
  document.documentElement.setAttribute('data-theme', dark.value ? 'dark' : 'light');
});
</script>

<template>
  <div class="page">
    <header>
      <span class="mono">THINKING-ORBS · SIX STATES · TWO SIZES · AUTO THEME</span>
      <button class="mono theme-btn" type="button" @click="dark = !dark">
        {{ dark ? 'LIGHT' : 'DARK' }}
      </button>
    </header>

    <section class="grid">
      <div v-for="{ state, blurb } in STATES" :key="state" class="card">
        <div class="pair">
          <ThinkingOrb :state="state" :size="64" />
          <ThinkingOrb :state="state" :size="20" />
        </div>
        <div class="text">
          <span class="title">{{ state }}</span>
          <span class="sub">{{ blurb }}</span>
        </div>
      </div>
    </section>

    <footer class="mono faint">
      SIZE 64 / 20 · THEME AUTO (data-theme · .dark · prefers-color-scheme) · REDUCED-MOTION SAFE
    </footer>
  </div>
</template>
