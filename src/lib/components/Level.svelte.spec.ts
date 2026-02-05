import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import TestLevelNoElement from './TestLevelNoElement.svelte';
import TestLevelWithElement from './TestLevelWithElement.svelte';

describe('Level component', () => {
	it('should not render wrapper when no element prop is provided', async () => {
		const { container } = render(TestLevelNoElement);

		// The outer Level has element="section", inner Level has no element
		// So we should have: section > h1 + h2 (h2 is direct child of section, no div wrapper)
		const section = container.querySelector('section');
		expect(section).not.toBeNull();

		// Check that h2 is a direct child of section (no wrapper div)
		const h2 = section?.querySelector(':scope > h2');
		await expect.element(page.getByRole('heading', { level: 2 })).toBeInTheDocument();
		expect(h2).not.toBeNull();
	});

	it('should render wrapper element when element prop is provided', async () => {
		const { container } = render(TestLevelWithElement);

		// The outer Level has element="section", inner Level has element="article"
		// So we should have: section > h1 + article > h2
		const section = container.querySelector('section');
		expect(section).not.toBeNull();

		const article = section?.querySelector(':scope > article');
		expect(article).not.toBeNull();

		const h2InArticle = article?.querySelector(':scope > h2');
		await expect.element(page.getByRole('heading', { level: 2 })).toBeInTheDocument();
		expect(h2InArticle).not.toBeNull();
	});
});
