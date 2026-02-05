<script lang="ts">
	import Level from '../components/Level.svelte';
	import H from '../components/H.svelte';
</script>

<Level element="section" infiniteLevels={true}>
	<H>Level 1</H>
	<Level>
		<H>Level 2</H>
		<Level>
			<H>Level 3</H>
			<Level>
				<H>Level 4</H>
				<Level>
					<H>Level 5</H>
					<Level>
						<H>Level 6</H>
						<Level>
							<H>Level 7</H>
						</Level>
					</Level>
				</Level>
			</Level>
		</Level>
	</Level>
</Level>
