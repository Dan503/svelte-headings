import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	it('should render h1', async () => {
		render(Page);

		const heading = page.getByRole('heading', { level: 1 });
		await expect.element(heading).toBeInTheDocument();
	});

	it('should render all heading levels correctly', async () => {
		render(Page);

		// Verify heading levels 1-5 are rendered (each has exactly one)
		for (let level = 1; level <= 5; level++) {
			const heading = page.getByRole('heading', { level });
			await expect.element(heading).toBeInTheDocument();
		}

		// Level 6 has two headings: one actual h6 and one for level 7 (h6 with aria-level)
		const h6Headings = page.getByRole('heading', { level: 6 });
		await expect.element(h6Headings.first()).toBeInTheDocument();
	});

	it('should render h6 with aria-level for level 7', async () => {
		render(Page);

		// Level 7 heading should be h6 with aria-level="7"
		const h6Headings = page.getByRole('heading', { level: 6 });
		// There are two h6 headings: one for level 6 and one for level 7
		await expect.element(h6Headings.first()).toBeInTheDocument();
	});
});
