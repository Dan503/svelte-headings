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
import TestMultipleH1 from '../test-components/TestMultipleH1.svelte';
import TestSiblingHeadings from '../test-components/TestSiblingHeadings.svelte';
import TestClassOnLevelWithNoElementProp from '../test-components/TestClassOnLevelWithNoElementProp.svelte';

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

	it('should throw error when multiple h1 elements are detected', async () => {
		await expect(async () => {
			render(TestMultipleH1);
			// Need to wait for onMount to run
			await new Promise((resolve) => setTimeout(resolve, 0));
		}).rejects.toThrow('[svelte-headings] Multiple <h1> elements detected on the page!');
	});

	it('should render a div if Level has props other than `element` applied to it', async () => {
		const { container } = render(TestClassOnLevelWithNoElementProp);

		// We should have a div with class "level-1" wrapping the h1
		const wrapperDiv = container.querySelector('div.level-1');
		expect(wrapperDiv).not.toBeNull();

		const h1 = wrapperDiv?.querySelector(':scope > h1');
		expect(h1).not.toBeNull();
		await expect.element(page.getByText('First H1')).toBeInTheDocument();
	});

	it('should render sibling H components at the same heading level', async () => {
		const { container } = render(TestSiblingHeadings);

		// The single h1
		const h1 = container.querySelector('h1.level-1');
		expect(h1).not.toBeNull();
		expect(h1?.tagName).toBe('H1');

		// All three sibling headings should be h2
		const firstH2 = container.querySelector('h2.level-2-first');
		const secondH2 = container.querySelector('h2.level-2-second');
		const thirdH2 = container.querySelector('h2.level-2-third');

		expect(firstH2).not.toBeNull();
		expect(secondH2).not.toBeNull();
		expect(thirdH2).not.toBeNull();

		expect(firstH2?.tagName).toBe('H2');
		expect(secondH2?.tagName).toBe('H2');
		expect(thirdH2?.tagName).toBe('H2');

		await expect.element(page.getByText('First H2')).toBeInTheDocument();
		await expect.element(page.getByText('Second H2')).toBeInTheDocument();
		await expect.element(page.getByText('Third H2')).toBeInTheDocument();
	});
});
