<script lang="ts">
  import { SearchIcon } from '@master/icons-svelte';
  import { SearchIcon as Fixed } from '@master/icons-svelte/16/soft';
  let element = $state<SVGSVGElement>();
</script>

<SearchIcon strokeWidth={1.5} size={20} opticalSize={16} corner="rounded" label="Search" bind:ref={element} onclick={event => event.currentTarget.focus()} />
<Fixed strokeWidth={1} size={32} class="icon" aria-label="Search" />
