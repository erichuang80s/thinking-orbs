import { type Ref, ref, watchEffect } from 'vue';

export type Theme = 'dark' | 'light';

export function useTheme(): { theme: Ref<Theme>; toggle: () => void } {
  const theme = ref<Theme>('dark');
  watchEffect(() => {
    document.documentElement.dataset.theme = theme.value;
  });
  const toggle = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
  };
  return { theme, toggle };
}
