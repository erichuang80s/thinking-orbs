<script setup lang="ts">
import { GitHubIcon, XIcon } from './icons';

defineProps<{
  debug: boolean;
  bigChips: boolean;
  smallAll: boolean;
}>();

const emit = defineEmits<{
  toggleDebug: [];
  toggleBigChips: [];
  toggleSmallAll: [];
}>();

const iconBtnClass =
  'flex items-center justify-center size-9 border-none rounded-full bg-(--icon-btn-bg) text-inherit cursor-pointer no-underline transition-[background-color] duration-200 [-webkit-tap-highlight-color:transparent] hover:bg-(--icon-btn-hover) focus-visible:outline-2 focus-visible:outline-(--icon-btn-outline) focus-visible:outline-offset-2 [&_svg]:block [&_svg]:shrink-0 [&_svg]:fill-(--icon-btn-fill) [&_svg]:opacity-60 [&_svg]:transition-opacity [&_svg]:duration-200 hover:[&_svg]:opacity-100';

const isDev = import.meta.env.DEV;
const headerImageSrc = `${import.meta.env.BASE_URL}header.png`;
</script>

<template>
  <header
    class="relative w-full h-[218px] text-center flex flex-col items-center justify-end pb-[53px] max-sm:h-auto max-sm:min-h-[180px] max-sm:pt-[60px] max-sm:pb-8"
  >
    <nav
      class="absolute top-4 right-0 flex items-center gap-4 max-sm:top-3"
      aria-label="External links"
    >
      <!-- Dev-only: hide the hero surface fill to inspect the orbs.
           Stripped from production builds via import.meta.env.DEV. -->
      <button
        v-if="isDev"
        type="button"
        :aria-pressed="debug"
        :class="[
          iconBtnClass,
          'font-[Roboto_Mono,monospace] text-[11px]',
          debug ? 'bg-(--icon-btn-hover) text-(--title-color)' : 'text-(--footer-muted)'
        ]"
        title="Toggle hero surface fill (dev only)"
        @click="emit('toggleDebug')"
      >
        BG
      </button>
      <button
        v-if="isDev"
        type="button"
        :aria-pressed="bigChips"
        :class="[
          iconBtnClass,
          'font-[Roboto_Mono,monospace] text-[11px]',
          bigChips ? 'bg-(--icon-btn-hover) text-(--title-color)' : 'text-(--footer-muted)'
        ]"
        title="Render the small chips as large pills (dev only)"
        @click="emit('toggleBigChips')"
      >
        LG
      </button>
      <button
        v-if="isDev"
        type="button"
        :aria-pressed="smallAll"
        :class="[
          iconBtnClass,
          'font-[Roboto_Mono,monospace] text-[11px]',
          smallAll ? 'bg-(--icon-btn-hover) text-(--title-color)' : 'text-(--footer-muted)'
        ]"
        title="Force every pill to the small chip style (dev only)"
        @click="emit('toggleSmallAll')"
      >
        SM
      </button>
      <a
        :class="iconBtnClass"
        href="https://github.com/Jakubantalik/thinking-orbs"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub repository"
      >
        <GitHubIcon />
      </a>
      <a
        :class="iconBtnClass"
        href="https://x.com/jakubantalik"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow on X (Twitter)"
      >
        <XIcon />
      </a>
    </nav>
    <div class="relative -mt-[190px] -mb-5 cursor-pointer group" aria-hidden="true">
      <img
        class="block relative transition-[filter,transform] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[filter,transform] motion-reduce:!transition-none group-hover:[filter:brightness(1.1)] group-hover:[transform:rotate(8deg)_scale(1.06)]"
        :src="headerImageSrc"
        alt=""
        width="146"
        height="117"
        decoding="async"
      />
    </div>
    <h1 class="text-[22px] font-medium leading-[30px] text-(--title-color)">Thinking orbs</h1>
    <p class="text-sm font-normal leading-[21px] text-(--subtitle-color) opacity-50">
      Animated thinking orb component
    </p>
  </header>
</template>
