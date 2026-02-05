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
	element?: LevelElement;
}

export interface HProps extends HTMLAttributes<HTMLHeadingElement> {}
