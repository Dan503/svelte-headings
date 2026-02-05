<!-- H.svelte -->
<script lang="ts">
	import { getContext } from 'svelte';
	import { LEVEL_KEY, INFINITE_LEVELS_KEY } from './context';
	import type { HProps } from './types';

	let { children, ...restProps }: HProps & { children?: any } = $props();

	const level = getContext<number>(LEVEL_KEY) ?? 1;
	const infiniteLevels = getContext<boolean>(INFINITE_LEVELS_KEY) ?? false;

	const tag = `h${Math.min(level, 6)}`;

	// Only use aria-level if infiniteLevels is enabled
	const ariaLevel = infiniteLevels && level > 6 ? level : undefined;

	if (level > 6) {
		if (infiniteLevels) {
			console.warn(
				`Heading level ${level} is greater than 6. Using <${tag}> with aria-level="${level}".
Note: aria-level is not supported by all screen readers.
Consider restructuring your content to use heading levels 1-6 for better accessibility.`
			);
		} else {
			console.warn(
				`Heading level ${level} is greater than 6. Capping at <${tag}>.
Consider restructuring your content to use heading levels 1-6.
To enable aria-level for deeper nesting, add infiniteLevels={true} to your root <Level> component.
Note: aria-level > 6 is not supported by all screen readers.`
			);
		}
	}
</script>

<svelte:element this={tag} aria-level={ariaLevel} {...restProps}>
	{@render children?.()}
</svelte:element>
