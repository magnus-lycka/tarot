<script lang="ts">
	import { getCardImageFilename } from '$lib/domain/card-images';
	import PCMultiSelection from './PCMultiSelection.svelte';
	import PCSingleSelection from './PCSingleSelection.svelte';

	let pcCount = $state<string>('');
	let personality = $state<string>('');
	let emotionalType = $state<string>('');
	let rationalType = $state<string>('');

	const isSingle = $derived(pcCount === '1');
	const isTeam = $derived(pcCount !== '' && pcCount !== '1');

	// Convert pcCount to rank number (10+ becomes 10)
	const rankNumber = $derived(pcCount === '10+' ? '10' : pcCount);

	// Determine suite based on personality type
	const suite = $derived.by(() => {
		if (emotionalType === 'passionate') return 'Wands';
		if (emotionalType === 'caring') return 'Cups';
		if (rationalType === 'strategic') return 'Swords';
		if (rationalType === 'practical') return 'Pentacles';
		return '';
	});

	// Card display
	const card = $derived(suite ? `${rankNumber} of ${suite}` : '');

	// Card image path
	const cardImageSrc = $derived.by(() => {
		if (!card) return '';
		try {
			const filename = getCardImageFilename(card);
			return `/src/lib/assets/cards/${filename}`;
		} catch {
			return '';
		}
	});
</script>

<div>
	<label for="pc-count">How many Player Characters (PCs)?</label>
	<select id="pc-count" bind:value={pcCount}>
		<option value="">Select...</option>
		<option value="1">1</option>
		<option value="2">2</option>
		<option value="3">3</option>
		<option value="4">4</option>
		<option value="5">5</option>
		<option value="6">6</option>
		<option value="7">7</option>
		<option value="8">8</option>
		<option value="9">9</option>
		<option value="10+">10+</option>
	</select>

	{#if isSingle}
		<p data-testid="single-pc-indicator">Single PC</p>
		<PCSingleSelection />
	{:else if isTeam}
		<p data-testid="team-indicator">PC team</p>

		<PCMultiSelection bind:personality bind:emotionalType bind:rationalType />

		{#if card}
			<div data-testid="card-display">
				<p>{card}</p>
				{#if cardImageSrc}
					<img src={cardImageSrc} alt={card} />
				{/if}
			</div>
		{/if}
	{/if}
</div>