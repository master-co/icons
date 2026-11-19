<svelte:options namespace="svg" />
<script lang="ts">
  import type { IconDefinition, ResolvedIcon, IconNode } from '@master/icons/runtime';
  import type { IconProps } from './types.js';
  import { iconPresentation, scopeNodes } from '@master/icons/presentation';

  let {
    master, directionPolicy, ref = $bindable(undefined), ...props
  }: IconProps & { master: ResolvedIcon; directionPolicy: IconDefinition['direction'] } = $props();
  const scope = $props.id();
  const presentation = $derived(iconPresentation(master, directionPolicy, props));
  const nodes = $derived(scopeNodes(master.nodes, scope));
</script>

{#snippet elements(items: readonly IconNode[])}
  {#each items as [tag, attrs, children]}
    <svelte:element this={tag} {...attrs}>
      {#if children}{@render elements(children)}{/if}
    </svelte:element>
  {/each}
{/snippet}
<svg {...presentation.attributes} bind:this={ref}>
  {#if presentation.transform}
    <g transform={presentation.transform}>{@render elements(nodes)}</g>
  {:else}
    {@render elements(nodes)}
  {/if}
</svg>
