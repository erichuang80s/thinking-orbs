import { type FunctionalComponent, h } from 'vue';

// Icons as functional components — no state, just vnodes. Mirrors the
// original React icon set one-to-one.

export const GitHubIcon: FunctionalComponent = () =>
  h('svg', { 'aria-hidden': 'true', width: '16', height: '16', viewBox: '0 0 16 16' }, [
    h('path', {
      d: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'
    })
  ]);

export const XIcon: FunctionalComponent = () =>
  h('svg', { 'aria-hidden': 'true', width: '15', height: '16', viewBox: '0 0 1200 1227' }, [
    h('path', {
      d: 'M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z'
    })
  ]);

export const ArrowUpIcon: FunctionalComponent = () =>
  h(
    'svg',
    {
      width: '16',
      height: '16',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'aria-hidden': 'true'
    },
    [
      h('line', { x1: '12', y1: '19', x2: '12', y2: '5' }),
      h('polyline', { points: '5 12 12 5 19 12' })
    ]
  );

export const PlusIcon: FunctionalComponent = () =>
  h(
    'svg',
    {
      width: '16',
      height: '16',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'aria-hidden': 'true'
    },
    [
      h('line', { x1: '12', y1: '5', x2: '12', y2: '19' }),
      h('line', { x1: '5', y1: '12', x2: '19', y2: '12' })
    ]
  );

export const ChevronDownIcon: FunctionalComponent = () =>
  h(
    'svg',
    {
      viewBox: '0 0 16 16',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '1.5',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'aria-hidden': 'true'
    },
    [h('path', { d: 'M7 11L10 8L7 5' })]
  );

export const SearchIcon18: FunctionalComponent = () =>
  h(
    'svg',
    {
      viewBox: '0 0 18 18',
      'stroke-width': '1.5',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'aria-hidden': 'true'
    },
    [h('circle', { cx: '8', cy: '8', r: '6' }), h('path', { d: 'm16 16-3.5-3.5' })]
  );

export const DotsIcon: FunctionalComponent = () =>
  h('svg', { viewBox: '0 0 20 20', fill: 'currentColor', 'aria-hidden': 'true' }, [
    h('circle', { cx: '4.167', cy: '10', r: '1.667' }),
    h('circle', { cx: '10', cy: '10', r: '1.667' }),
    h('circle', { cx: '15.833', cy: '10', r: '1.667' })
  ]);

export const CopyIcon: FunctionalComponent = () =>
  h(
    'svg',
    {
      'aria-hidden': 'true',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    },
    [
      h('rect', { x: '9', y: '9', width: '13', height: '13', rx: '2', ry: '2' }),
      h('path', { d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' })
    ]
  );

export const CheckIcon: FunctionalComponent = () =>
  h(
    'svg',
    {
      'aria-hidden': 'true',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    },
    [h('polyline', { points: '20 6 9 17 4 12' })]
  );

export const PlayIcon: FunctionalComponent = () =>
  h('svg', { 'aria-hidden': 'true', viewBox: '0 0 16 16' }, [h('path', { d: 'M4.5 2.5v11l9-5.5z' })]);

export const PauseIcon: FunctionalComponent = () =>
  h('svg', { 'aria-hidden': 'true', viewBox: '0 0 16 16' }, [
    h('rect', { x: '4', y: '3', width: '3', height: '10', rx: '1' }),
    h('rect', { x: '9', y: '3', width: '3', height: '10', rx: '1' })
  ]);
