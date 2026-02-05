# svelte-headings

A Svelte 5 library for automatic heading level management, inspired by [react-headings](https://github.com/alexnault/react-headings).

## Project Overview

This library provides two components (`Level` and `H`) that automatically manage heading levels (h1-h6) based on nesting depth. This improves accessibility and SEO by ensuring proper heading hierarchy without manual tracking.

## Architecture

### Components

- **`Level`** (`src/lib/components/Level.svelte`): Creates a new heading level context.
  - When `element` prop is provided (e.g., `section`, `article`), renders that wrapper element
  - When no `element` prop, only increments the level context without rendering a wrapper (fragment-like behavior)

- **`H`** (`src/lib/components/H.svelte`): Renders the appropriate heading tag (h1-h6) based on current nesting level
  - For levels > 6, caps at h6 by default (no aria-level)
  - When `infiniteLevels={true}` is set on root Level, adds `aria-level` attribute for levels > 6

### Context

Uses Svelte's `setContext`/`getContext` with Symbol keys to track:
- `LEVEL_KEY` - Current heading depth through component hierarchy
- `INFINITE_LEVELS_KEY` - Whether to use aria-level for deep nesting (set on root Level, inherited by children)

## Usage Example

```svelte
<script>
  import { Level, H } from 'svelte-headings';
</script>

<Level element="section" class="container">
  <H>Heading text</H>           <!-- renders <h1> -->
  <p>content under the heading</p>

  <Level>                        <!-- no wrapper element rendered -->
    <H>Heading 2 text</H>        <!-- renders <h2> -->
    <p>content under heading 2</p>
  </Level>
</Level>
```

Output:
```html
<section class="container">
  <h1>Heading text</h1>
  <p>content under the heading</p>
  <h2>Heading 2 text</h2>
  <p>content under heading 2</p>
</section>
```

## Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm check` - Run svelte-check for type errors
- `pnpm test:unit` - Run unit tests with Vitest
- `pnpm test:e2e` - Run E2E tests with Playwright
- `pnpm test` - Run all tests
- `pnpm lint` - Check formatting and linting
- `pnpm format` - Auto-format code

## Testing

- Unit/component tests: `src/**/*.spec.ts` or `src/**/*.svelte.spec.ts`
- E2E tests: `e2e/` directory
- Component tests run in browser via `@vitest/browser-playwright`
- All tests require assertions (`expect.requireAssertions: true`)

## Tech Stack

- Svelte 5 (with runes: `$props()`, `$state()`)
- SvelteKit
- TypeScript
- Vitest + Playwright (testing)
- pnpm (package manager)

## Key Files

- `src/lib/components/Level.svelte` - Level context component
- `src/lib/components/H.svelte` - Heading component
- `src/lib/components/context.ts` - Context keys (LEVEL_KEY, INFINITE_LEVELS_KEY)
- `src/lib/components/types.ts` - TypeScript interfaces
- `src/lib/index.ts` - Public exports
- `src/routes/+page.svelte` - Demo page
