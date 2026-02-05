<!-- H.svelte -->
<script lang="ts">
	import { getContext, hasContext, onMount } from 'svelte';
	import { LEVEL_KEY, INFINITE_LEVELS_KEY } from './context';
	import type { HProps } from './types';

	let { children, ...restProps }: HProps & { children?: any } = $props();

	// Check if H is used without a parent Level component
	const hasLevelContext = hasContext(LEVEL_KEY);

	if (!hasLevelContext) {
		throw new Error(
			`[svelte-headings] <H> component must be used inside a <Level> component!

Without a parent <Level>, heading levels cannot be managed automatically.
This can result in multiple <h1> elements on the page, which is an accessibility violation.

Fix: Wrap your content in a <Level> component:

  <Level>
    <H>Your heading</H>
    ...
  </Level>

See: https://github.com/Dan503/svelte-headings#readme`
		);
	}

	const level = getContext<number>(LEVEL_KEY);
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

	// Check for multiple h1 elements after mount (catches both <H> components and hardcoded <h1> tags)
	onMount(() => {
		if (level === 1) {
			const h1Elements = document.querySelectorAll('h1');
			if (h1Elements.length > 1) {
				throw new Error(
					`[svelte-headings] Multiple <h1> elements detected on the page!

Found ${h1Elements.length} <h1> elements. A page should only have one <h1> for proper accessibility and SEO.

This usually happens when:
- Multiple top-level <Level> components each contain an <H> component
- An <H> is used at level 1 in multiple places
- A hardcoded <h1> tag exists alongside an <H> component

Fix:
- Have a <Level> component wrap the whole site.
- Do not hardcode any <h1> tags, instead rely on the <H> component.
- Only have 1 <H> component as a direct child of the first <Level> component.

See: https://github.com/Dan503/svelte-headings#readme`
				);
			}
		}
	});
</script>

<svelte:element this={tag} aria-level={ariaLevel} {...restProps}>
	{@render children?.()}
</svelte:element>
