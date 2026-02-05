<script lang="ts">
	import Level from '../components/Level.svelte';
	import H from '../components/H.svelte';
</script>

<!-- Root has infiniteLevels={true}, but a nested Level overrides with false -->
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
						<!-- This should have aria-level (inherits true from root) -->
						<Level>
							<H class="inherited-true">Level 7 Inherited True</H>
						</Level>
						<!-- This overrides to false -->
						<Level infiniteLevels={false}>
							<H class="overridden-false">Level 7 Overridden False</H>
							<!-- This nested Level should inherit false from parent, not true from root -->
							<Level>
								<Level>
									<H class="inherited-false">Level 9 Inherited False</H>
								</Level>
							</Level>
						</Level>
					</Level>
				</Level>
			</Level>
		</Level>
	</Level>
</Level>
