<!-- H.svelte -->
<script lang="ts">
	import { getContext } from 'svelte';
	import { LEVEL_KEY } from './context';
	import type { HProps } from './types';

	let { children, ...restProps }: HProps & { children?: any } = $props();

	const level = getContext<number>(LEVEL_KEY) ?? 1;
	const ariaLevel = level > 6 ? level : undefined;
	const tag = `h${Math.min(level, 6)}`;
	if (level > 6) {
		console.warn(
			`Heading level ${level} is greater than 6. Using <${tag}> with aria-level="${ariaLevel}".
This is not supported in all screen readers.
Please restructure your content to use heading levels 1-6 for better accessibility.`
		);
	}
</script>

<svelte:element this={tag} aria-level={ariaLevel} {...restProps}>
	{@render children?.()}
</svelte:element>
