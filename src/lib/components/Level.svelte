<!-- Level.svelte -->
<script lang="ts">
	import { setContext, getContext, untrack } from 'svelte';
	import { LEVEL_KEY, INFINITE_LEVELS_KEY } from './context';
	import type { LevelProps } from './types';

	const {
		element,
		infiniteLevels,
		children,
		...restProps
	}: LevelProps & { children?: any } = $props();

	const parentLevel = getContext<number>(LEVEL_KEY) ?? 0;
	const currentLevel = parentLevel + 1;

	// Check if infiniteLevels was set by a parent Level
	const parentInfiniteLevels = getContext<boolean>(INFINITE_LEVELS_KEY);

	// Only set the context if this is the top level (no parent) and infiniteLevels is explicitly set
	// Otherwise, inherit from parent
	// Using untrack() since we intentionally only want the initial value for context setup
	untrack(() => {
		if (parentLevel === 0 && infiniteLevels !== undefined) {
			setContext(INFINITE_LEVELS_KEY, infiniteLevels);
		} else if (parentInfiniteLevels !== undefined) {
			// Propagate parent setting
			setContext(INFINITE_LEVELS_KEY, parentInfiniteLevels);
		}
	});

	setContext(LEVEL_KEY, currentLevel);
</script>

{#if element}
	<svelte:element this={element} {...restProps}>
		{@render children?.()}
	</svelte:element>
{:else}
	{@render children?.()}
{/if}
