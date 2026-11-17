<script lang="ts">
  import type { IconDefinition, ResolvedIcon } from '../runtime.js';
  import type { IconProps } from './types.js';
  import { iconPresentation } from '../presentation.js';

  let {
    master, directionPolicy, ref = $bindable(undefined), ...props
  }: IconProps & { master: ResolvedIcon; directionPolicy: IconDefinition['direction'] } = $props();
  const presentation = $derived(iconPresentation(master, directionPolicy, props));
</script>

<svg {...presentation.attributes} bind:this={ref}>
  {#if presentation.transform}
    <g transform={presentation.transform}>
      {#each master.nodes as [tag, attrs]}
        <svelte:element this={tag} {...attrs} />
      {/each}
    </g>
  {:else}
    {#each master.nodes as [tag, attrs]}
      <svelte:element this={tag} {...attrs} />
    {/each}
  {/if}
</svg>
