import type { HTMLAttributes } from 'svelte/elements';

export type LevelElement =
	| 'div'
	| 'section'
	| 'article'
	| 'aside'
	| 'nav'
	| 'header'
	| 'footer'
	| 'main'
	| 'figure'
	| 'figcaption'
	| 'details'
	| 'summary';

export interface LevelProps extends HTMLAttributes<HTMLElement> {
	/**
	 * Renders a wrapper element in place of the `<Level>` component.
	 *
	 * If not provided, no wrapper will be rendered and the heading will be a direct child of the parent element.
	 */
	element?: LevelElement;
	/**
	 * When true, enables aria-level attributes for heading levels > 6.
	 *
	 * Can be set on any Level component. The setting is inherited by all
	 * nested Level components unless explicitly overridden.
	 *
	 * @default false // (caps at h6 without aria-level)
	 */
	infiniteLevels?: boolean;
}

export type HProps = HTMLAttributes<HTMLHeadingElement>;
