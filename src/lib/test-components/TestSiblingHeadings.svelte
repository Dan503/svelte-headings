<script lang="ts">
	import Level from '../components/Level.svelte';
	import H from '../components/H.svelte';
</script>

<!-- Sibling H components at the same level should render as the same heading level -->
<Level element="section">
	<H class="level-1">Heading 1</H>
	<Level>
		<H class="level-2-first">First H2</H>
		<H class="level-2-second">Second H2</H>
		<p>Some content between headings</p>
		<H class="level-2-third">Third H2</H>
	</Level>
</Level>
