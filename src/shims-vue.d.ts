declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // biome-ignore lint/complexity/noBannedTypes: Vue's own SFC shim signature.
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
