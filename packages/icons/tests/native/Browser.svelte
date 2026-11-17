<script lang="ts">
  import { ArrowRightIcon } from '@master/icons-svelte';
  import { SearchIcon as Fixed } from '@master/icons-svelte/16/soft';
  import type { IconProps } from '@master/icons-svelte';
  let { onclick }: { onclick?: (event: MouseEvent) => void } = $props();
  let options = $state<IconProps>({ size: 16, label: 'Next', class: 'icon' });
  let element = $state<SVGSVGElement>();
  export function update(next: IconProps) { options = next; }
  export function getElement() { return element; }
</script>

<div><ArrowRightIcon {...options} {onclick} bind:ref={element} /><Fixed size={40} /></div>
