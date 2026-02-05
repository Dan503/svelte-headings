<script lang="ts">
	import H from '../lib/components/H.svelte';
	import Level from '../lib/components/Level.svelte';
</script>

<Level element="main">
	<H>Heading Level 1</H>
	<Level>
		<H>Heading Level 2</H>
		<Level>
			<H>Heading Level 3</H>
			<Level>
				<H>Heading Level 4</H>
				<Level>
					<H>Heading Level 5</H>
					<Level>
						<H>Heading Level 6</H>
						<Level>
							<!-- This will render as <h6> (capped, no aria-level by default) -->
							<H>Heading Level 7 (renders as h6, capped)</H>
						</Level>
						<Level infiniteLevels={true}>
							<!-- This will render as <h6> (capped, no aria-level by default) -->
							<H>Heading Level 7 (renders as h6, capped)</H>
						</Level>
					</Level>
				</Level>
			</Level>
		</Level>
	</Level>
</Level>
