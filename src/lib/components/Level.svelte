<!-- Level.svelte -->
<script lang="ts">
	import { setContext, getContext } from 'svelte';
	import { LEVEL_KEY } from './context';
	import type { LevelProps } from './types';

	let { element, children, ...restProps }: LevelProps & { children?: any } = $props();

	const parentLevel = getContext<number>(LEVEL_KEY) ?? 0;
	const currentLevel = parentLevel + 1;

	setContext(LEVEL_KEY, currentLevel);
</script>

{#if element}
	<svelte:element this={element} {...restProps}>
		{@render children?.()}
	</svelte:element>
{:else}
	{@render children?.()}
{/if}
