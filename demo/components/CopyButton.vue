<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import { CheckIcon, CopyIcon } from './icons';

const props = defineProps<{ getText: () => string }>();

function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => {});
  }
}

const state = ref<'a' | 'b'>('a');
let timer: ReturnType<typeof setTimeout> | undefined;

function handleClick() {
  copyToClipboard(props.getText());
  state.value = 'b';
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    state.value = 'a';
  }, 2000);
}

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <button
    class="copy-btn absolute top-0.5 right-0.5 shrink-0 inline-grid place-items-center size-9 border-none rounded-[10px] bg-transparent cursor-pointer p-0 text-inherit transition-[background-color] duration-150 hover:bg-(--copy-hover) focus-visible:outline-2 focus-visible:outline-[rgba(255,255,255,0.5)] focus-visible:outline-offset-[-2px] focus-visible:rounded-lg [&_svg]:size-4"
    type="button"
    :data-state="state"
    aria-label="Copy"
    @click="handleClick"
  >
    <span class="t-icon" data-icon="a"><CopyIcon /></span>
    <span class="t-icon" data-icon="b"><CheckIcon /></span>
  </button>
</template>
