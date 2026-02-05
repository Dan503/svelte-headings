<script lang="ts">
	import Level from '../components/Level.svelte';
	import H from '../components/H.svelte';
</script>

<!-- This should throw an error - two h1 elements -->
<Level element="section">
	<H>First H1</H>
</Level>

<Level element="section">
	<H>Second H1</H>
</Level>
