import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import TestLevelNoElement from './TestLevelNoElement.svelte';
import TestLevelWithElement from './TestLevelWithElement.svelte';
import TestInfiniteLevels from './TestInfiniteLevels.svelte';
import TestCappedLevels from './TestCappedLevels.svelte';

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

	it('should add aria-level when infiniteLevels is true and level > 6', async () => {
		const { container } = render(TestInfiniteLevels);

		// Level 7 heading should have aria-level="7"
		const h6WithAriaLevel = container.querySelector('h6[aria-level="7"]');
		expect(h6WithAriaLevel).not.toBeNull();
		await expect.element(page.getByText('Level 7')).toBeInTheDocument();
	});

	it('should NOT add aria-level when infiniteLevels is false (default) and level > 6', async () => {
		const { container } = render(TestCappedLevels);

		// Level 7 heading should NOT have aria-level attribute
		const h6Elements = container.querySelectorAll('h6');
		expect(h6Elements.length).toBeGreaterThan(0);

		// Find the h6 with "Level 7" text and verify it has no aria-level
		const level7Heading = Array.from(h6Elements).find((el) => el.textContent === 'Level 7');
		expect(level7Heading).not.toBeNull();
		expect(level7Heading?.getAttribute('aria-level')).toBeNull();
		await expect.element(page.getByText('Level 7')).toBeInTheDocument();
	});
});
