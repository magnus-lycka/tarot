<script lang="ts">
	import { getCardImageFilename } from '$lib/domain/card-images';
	import PCMultiSelection from './PCMultiSelection.svelte';

	let personality = $state<string>('');
	let emotionalType = $state<string>('');
	let rationalType = $state<string>('');
	let courtRank = $state<string>('');

	// Determine suite based on personality type (same logic as multi)
	const suite = $derived.by(() => {
		if (emotionalType === 'passionate') return 'Wands';
		if (emotionalType === 'caring') return 'Cups';
		if (rationalType === 'strategic') return 'Swords';
		if (rationalType === 'practical') return 'Pentacles';
		return '';
	});

	const hasSuite = $derived(suite !== '');

	// Clear court rank when suite type changes
	$effect(() => {
		// Watch emotional and rational types - clear courtRank when they change
		emotionalType;
		rationalType;
		courtRank = '';
	});

	// Map court rank to display name
	const rankDisplay: Record<string, string> = {
		ace: 'Ace',
		page: 'Page',
		knight: 'Knight',
		queen: 'Queen',
		king: 'King'
	};

	// Card display
	const card = $derived(
		suite && courtRank && rankDisplay[courtRank] ? `${rankDisplay[courtRank]} of ${suite}` : ''
	);

	// Card image path
	const cardImageSrc = $derived.by(() => {
		if (!card) return '';
		try {
			const filename = getCardImageFilename(card);
			return `/cards/${filename}`;
		} catch {
			return '';
		}
	});
</script>

<PCMultiSelection bind:personality bind:emotionalType bind:rationalType />

{#if hasSuite}
	<fieldset data-testid="court-rank-selection">
		<legend>Choose your role:</legend>
		<label>
			<input type="radio" name="court-rank" value="ace" bind:group={courtRank} />
			Ace - Essence / Solo Focus
		</label>
		<label>
			<input type="radio" name="court-rank" value="page" bind:group={courtRank} />
			Page - Initiate / Student
		</label>
		<label>
			<input type="radio" name="court-rank" value="knight" bind:group={courtRank} />
			Knight - Actor / Agent
		</label>
		<label>
			<input type="radio" name="court-rank" value="queen" bind:group={courtRank} />
			Queen - Integrator / Empath
		</label>
		<label>
			<input type="radio" name="court-rank" value="king" bind:group={courtRank} />
			King - Director / Master
		</label>
	</fieldset>
{/if}

{#if card}
	<div data-testid="card-display">
		<p>{card}</p>
		{#if cardImageSrc}
			<img src={cardImageSrc} alt={card} />
		{/if}
	</div>
{/if}
