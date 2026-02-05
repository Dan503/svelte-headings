import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import TestLevelNoElement from '../test-components/TestLevelNoElement.svelte';
import TestLevelWithElement from '../test-components/TestLevelWithElement.svelte';
import TestInfiniteLevels from '../test-components/TestInfiniteLevels.svelte';
import TestCappedLevels from '../test-components/TestCappedLevels.svelte';
import TestHWithoutLevel from '../test-components/TestHWithoutLevel.svelte';
import TestInfiniteLevelsNested from '../test-components/TestInfiniteLevelsNested.svelte';
import TestInfiniteLevelsOverride from '../test-components/TestInfiniteLevelsOverride.svelte';

describe('Level component', () => {
	it('should throw error when H is used without a parent Level', async () => {
		expect(() => render(TestHWithoutLevel)).toThrow(
			'[svelte-headings] <H> component must be used inside a <Level> component!'
		);
	});

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

	it('should allow infiniteLevels to be set on nested Level components', async () => {
		const { container } = render(TestInfiniteLevelsNested);

		// The capped heading should NOT have aria-level
		const cappedHeading = container.querySelector('h6.capped');
		expect(cappedHeading).not.toBeNull();
		expect(cappedHeading?.getAttribute('aria-level')).toBeNull();

		// The infinite heading SHOULD have aria-level="7"
		const infiniteHeading = container.querySelector('h6.infinite');
		expect(infiniteHeading).not.toBeNull();
		expect(infiniteHeading?.getAttribute('aria-level')).toBe('7');

		await expect.element(page.getByText('Level 7 Capped')).toBeInTheDocument();
		await expect.element(page.getByText('Level 7 Infinite')).toBeInTheDocument();
	});

	it('should allow infiniteLevels={false} to override parent infiniteLevels={true}', async () => {
		const { container } = render(TestInfiniteLevelsOverride);

		// Heading that inherits true from root SHOULD have aria-level
		const inheritedTrueHeading = container.querySelector('h6.inherited-true');
		expect(inheritedTrueHeading).not.toBeNull();
		expect(inheritedTrueHeading?.getAttribute('aria-level')).toBe('7');

		// Heading where parent explicitly set false should NOT have aria-level
		const overriddenFalseHeading = container.querySelector('h6.overridden-false');
		expect(overriddenFalseHeading).not.toBeNull();
		expect(overriddenFalseHeading?.getAttribute('aria-level')).toBeNull();

		// Heading nested below the false override should inherit false, NOT true from root
		const inheritedFalseHeading = container.querySelector('h6.inherited-false');
		expect(inheritedFalseHeading).not.toBeNull();
		expect(inheritedFalseHeading?.getAttribute('aria-level')).toBeNull();

		await expect.element(page.getByText('Level 7 Inherited True')).toBeInTheDocument();
		await expect.element(page.getByText('Level 7 Overridden False')).toBeInTheDocument();
		await expect.element(page.getByText('Level 9 Inherited False')).toBeInTheDocument();
	});
});
