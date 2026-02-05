<script lang="ts">
	import Level from './Level.svelte';
	import H from './H.svelte';
</script>

<Level element="section">
	<H>Heading 1</H>
	<Level element="article">
		<H>Heading 2</H>
	</Level>
</Level>
