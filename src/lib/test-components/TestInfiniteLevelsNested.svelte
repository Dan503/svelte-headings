<script lang="ts">
	import Level from '../components/Level.svelte';
	import H from '../components/H.svelte';
</script>

<!-- Root does NOT have infiniteLevels, but a nested Level does -->
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
						<!-- Default behavior: no aria-level -->
						<Level>
							<H class="capped">Level 7 Capped</H>
						</Level>
						<!-- Nested infiniteLevels override -->
						<Level infiniteLevels={true}>
							<H class="infinite">Level 7 Infinite</H>
						</Level>
					</Level>
				</Level>
			</Level>
		</Level>
	</Level>
</Level>
