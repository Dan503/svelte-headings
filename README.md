# svelte-headings

Automatic heading level management for Svelte 5. Never worry about using the wrong heading level (`h1`, `h2`, etc.) in complex component hierarchies.

Inspired by [react-headings](https://github.com/alexnault/react-headings).

## Features

- Automatically manages heading hierarchy based on nesting depth
- Improves accessibility and SEO
- Zero runtime dependencies
- TypeScript support
- Works with Svelte 5

## Installation

```bash
npm install svelte-headings
```

## Usage

### Basic Example

```svelte
<script>
	import { Level, H } from 'svelte-headings';
</script>

<Level element="main">
	<!-- renders <h1> -->
	<H>Page Title</H>
	<p>Introduction text...</p>

	<Level element="section" class="container">
		<!-- renders <h2> -->
		<H>Section Title</H>
		<p>Section content...</p>

		<Level element="article">
			<!-- renders <h3> -->
			<H>Article Title</H>
			<!-- renders <h3> -->
			<p>Article content...</p>
		</Level>
	</Level>
</Level>
```

Output:

```html
<main>
	<h1>Page Title</h1>
	<p>Introduction text...</p>

	<section class="container">
		<h2>Section Title</h2>
		<p>Section content...</p>

		<article>
			<h3>Article Title</h3>
			<p>Article content...</p>
		</article>
	</section>
</main>
```

### Level Without Wrapper Element

When you need to increment the heading level without adding a wrapper element, omit the `element` prop:

```svelte
<Level element="section" class="container">
	<H>Main Heading</H>
	<p>Content under main heading</p>

	<!-- no wrapper element rendered -->
	<Level>
		<!-- renders <h2> -->
		<H>Sub Heading</H>
		<p>Content under sub heading</p>
	</Level>
</Level>
```

Output:

```html
<section class="container">
	<h1>Main Heading</h1>
	<p>Content under main heading</p>
	<h2>Sub Heading</h2>
	<p>Content under sub heading</p>
</section>
```

### Reusable Components

Create components that automatically use the correct heading level based on where they're used:

```svelte
<!-- Card.svelte -->
<script>
	import { Level, H } from 'svelte-headings';

	let { title, children } = $props();
</script>

<Level element="article" class="card">
	<H>{title}</H>
	{@render children?.()}
</Level>
```

```svelte
<!-- App.svelte -->
<script>
	import { Level, H } from 'svelte-headings';
	import Card from './Card.svelte';
</script>

<Level element="main">
	<!-- h1 -->
	<H>Dashboard</H>

	<Level element="section">
		<!-- h2 -->
		<H>Recent Activity</H>

		<!-- h3 -->
		<Card title="Project A">
			<p>Card content...</p>
		</Card>

		<Level element="section">
			<!-- h4 -->
			<Card title="Project B">
				<p>Card content...</p>
			</Card>
		</Level>
	</Level>
</Level>
```

## API

### `<Level>`

Creates a new heading level context. Each nested `Level` increments the heading depth by 1.

| Prop             | Type      | Default     | Description                                                                                                                     |
| ---------------- | --------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `element`        | `string`  | `undefined` | HTML element to render (`section`, `article`, `div`, etc.). If omitted, no wrapper is rendered.                                 |
| `infiniteLevels` | `boolean` | `false`     | When `true` on the root Level, enables `aria-level` attributes for heading levels > 6. Only effective on the top-level Level.  |
| `...rest`        |           |             | All other props are passed to the wrapper element                                                                               |

Supported elements: `div`, `section`, `article`, `aside`, `nav`, `header`, `footer`, `main`, `figure`, `figcaption`, `details`, `summary`

### `<H>`

Renders a heading element (`h1`-`h6`) based on the current nesting level.

| Prop      | Type | Default | Description                                 |
| --------- | ---- | ------- | ------------------------------------------- |
| `...rest` |      |         | All props are passed to the heading element |

When the nesting level exceeds 6, the behavior depends on the `infiniteLevels` setting (see below).

## Handling Deep Nesting (Level > 6)

By default, headings are capped at `<h6>` when nesting exceeds 6 levels:

```svelte
<!-- Default behavior: caps at h6 -->
<Level element="main">
	<!-- ... 6 levels deep ... -->
	<Level>
		<H>Level 7 Heading</H>
		<!-- renders: <h6>Level 7 Heading</h6> -->
	</Level>
</Level>
```

### Enabling `aria-level` for Deep Nesting

For documents that genuinely require more than 6 heading levels (e.g., legal or academic content), you can enable `aria-level` attributes by adding `infiniteLevels={true}` to your root `Level` component:

```svelte
<Level element="main" infiniteLevels={true}>
	<!-- ... 6 levels deep ... -->
	<Level>
		<H>Level 7 Heading</H>
		<!-- renders: <h6 aria-level="7">Level 7 Heading</h6> -->
	</Level>
</Level>
```

> **Note:** `aria-level` has inconsistent screen reader support. Consider restructuring your content to stay within 6 heading levels when possible.

## TypeScript

Type definitions are included:

```typescript
import type { LevelProps, HProps, LevelElement } from 'svelte-headings';
```

## License

APACHE 2.0
