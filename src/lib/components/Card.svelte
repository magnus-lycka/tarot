<script lang="ts">
	import type { Card } from '$lib/domain/cards';
	import { formatCardName } from '$lib/domain/interpretations';

	interface Props {
		card: Card;
		showOrientation?: boolean;
	}

	let { card, showOrientation = true }: Props = $props();
</script>

<div class="card" class:reversed={card.orientation === 'reversed'}>
	<div class="card-name">{formatCardName(card)}</div>
	{#if showOrientation}
		<div class="card-orientation">{card.orientation}</div>
	{/if}
</div>

<style>
	.card {
		border: 1px solid #ccc;
		padding: 1rem;
		border-radius: 0.5rem;
		background: white;
	}

	.reversed {
		transform: rotate(180deg);
	}

	.card-name {
		font-weight: bold;
	}

	.card-orientation {
		font-size: 0.875rem;
		color: #666;
		margin-top: 0.5rem;
	}
</style>
