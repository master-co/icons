<svelte:options namespace="svg" />
<script lang="ts">
  import {resolveStroke, type IconDefinition, type ResolvedIcon, type IconNode} from '@master/icons/runtime';
  import type { IconProps } from './types.js';
  import { iconPresentation, scopeNodes } from '@master/icons/presentation';

  let {
    master, directionPolicy, ref = $bindable(undefined), ...props
  }: IconProps & { master: ResolvedIcon; directionPolicy: IconDefinition['direction'] } = $props();
  const scope = $props.id();
  const selected = $derived(resolveStroke(master, props.strokeWidth ?? props['stroke-width'] as number | undefined));
  const presentation = $derived(iconPresentation(selected, directionPolicy, props));
  const nodes = $derived(scopeNodes(selected.nodes, scope));
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
