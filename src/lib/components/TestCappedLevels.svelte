<script lang="ts">
	import Level from './Level.svelte';
	import H from './H.svelte';
</script>

<Level element="section">
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
