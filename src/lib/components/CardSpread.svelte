<script lang="ts">
	import type { EncounterSpread } from '$lib/domain/encounters';
	import Card from './Card.svelte';

	interface Props {
		spread: EncounterSpread;
	}

	let { spread }: Props = $props();
</script>

<div class="spread">
	<div class="spread-column">
		<h3>PC(s)</h3>
		<Card card={spread.pcCard} />
	</div>

	<div class="spread-column">
		<h3>Reaction</h3>
		<Card card={spread.reactionCard} />
	</div>

	<div class="spread-column">
		<h3>NPC</h3>
		<Card card={spread.npcCard} />
	</div>

	<div class="spread-column">
		<h3>Context</h3>
		<Card card={spread.contextCard} />
	</div>
</div>

<style>
	.spread {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2rem;
		padding: 2rem;
	}

	.spread-column {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h3 {
		font-size: 1.125rem;
		font-weight: 600;
		margin: 0;
	}
</style>
