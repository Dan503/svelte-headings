<!-- Level.svelte -->
<script lang="ts">
	import { setContext, getContext, untrack, type Snippet } from 'svelte';
	import { LEVEL_KEY, INFINITE_LEVELS_KEY } from './context';
	import type { LevelElement, LevelProps } from './types';

	const { element, infiniteLevels, children, ...restProps }: LevelProps & { children?: Snippet } =
		$props();

	const parentLevel = getContext<number>(LEVEL_KEY) ?? 0;
	const currentLevel = parentLevel + 1;

	// Check if infiniteLevels was set by a parent Level
	const parentInfiniteLevels = getContext<boolean>(INFINITE_LEVELS_KEY);

	// If infiniteLevels is explicitly set on this Level, use it
	// Otherwise, inherit from parent
	// Using untrack() since we intentionally only want the initial value for context setup
	untrack(() => {
		if (infiniteLevels !== undefined) {
			// Explicit value on this Level takes precedence
			setContext(INFINITE_LEVELS_KEY, infiniteLevels);
		} else if (parentInfiniteLevels !== undefined) {
			// Propagate parent setting
			setContext(INFINITE_LEVELS_KEY, parentInfiniteLevels);
		}
	});

	setContext(LEVEL_KEY, currentLevel);

	const restPropsCount = $derived(Object.keys(restProps).length);

	const finalElement: LevelElement | undefined = $derived(
		element ?? (restPropsCount > 0 ? 'div' : undefined)
	);
</script>

{#if finalElement}
	<svelte:element this={finalElement} {...restProps}>
		{@render children?.()}
	</svelte:element>
{:else}
	{@render children?.()}
{/if}
