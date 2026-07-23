<script setup lang="ts">
import { computed } from 'vue';
import { PauseIcon, PlayIcon } from './icons';

const props = defineProps<{ playing: boolean }>();
const emit = defineEmits<{ toggle: [] }>();

// An extra `class` from the parent falls through and merges with the base
// classes below (Vue's class fallthrough), so the responsive positioning
// passed by the Playground still lands on the button.
const state = computed(() => (props.playing ? 'b' : 'a'));
</script>

<template>
  <button
    class="playground-play-toggle z-[2] inline-grid place-items-center size-8 border-0 rounded-full bg-(--toggle-bg) text-(--toggle-color) cursor-pointer transition-[background-color,color] duration-200 [-webkit-tap-highlight-color:transparent] hover:bg-(--toggle-hover) hover:text-(--toggle-hover-color) focus-visible:outline-2 focus-visible:outline-[rgba(255,255,255,0.5)] focus-visible:outline-offset-2 [&_.t-icon_svg]:size-3.5 [&_.t-icon_svg]:fill-current [&_.t-icon_svg]:stroke-none"
    type="button"
    :data-state="state"
    :aria-pressed="playing"
    :aria-label="playing ? 'Pause shader animation' : 'Play shader animation'"
    @click="emit('toggle')"
  >
    <span class="t-icon" data-icon="a"><PlayIcon /></span>
    <span class="t-icon" data-icon="b"><PauseIcon /></span>
  </button>
</template>
