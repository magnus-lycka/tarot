<script lang="ts">
	import { getCardImageFilename } from '$lib/domain/card-images';

	let pcCount = $state<string>('');
	let personality = $state<string>('');
	let emotionalType = $state<string>('');
	let rationalType = $state<string>('');

	const isTeam = $derived(pcCount !== '' && pcCount !== '1');
	const isFeeling = $derived(personality === 'feeling');
	const isThinking = $derived(personality === 'thinking');

	// Clear selections when personality changes
	$effect(() => {
		if (personality === 'feeling') {
			rationalType = '';
		} else if (personality === 'thinking') {
			emotionalType = '';
		}
	});

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

	{#if pcCount === '1'}
		<p data-testid="single-pc-indicator">Single PC</p>
	{:else if isTeam}
		<p data-testid="team-indicator">PC team</p>

		<fieldset data-testid="personality-selection">
			<legend>Is the team more feeling or thinking?</legend>
			<label>
				<input type="radio" name="personality" value="feeling" bind:group={personality} />
				Big Hearts
			</label>
			<label>
				<input type="radio" name="personality" value="thinking" bind:group={personality} />
				Sharp Brains
			</label>
		</fieldset>

		{#if isFeeling}
			<fieldset data-testid="emotional-type-selection">
				<legend>Passionate and bold, or caring and loyal?</legend>
				<label>
					<input
						type="radio"
						name="emotional-type"
						value="passionate"
						bind:group={emotionalType}
					/>
					Passionate & Bold
				</label>
				<label>
					<input type="radio" name="emotional-type" value="caring" bind:group={emotionalType} />
					Caring & Loyal
				</label>
			</fieldset>
		{/if}

		{#if isThinking}
			<fieldset data-testid="rational-type-selection">
				<legend>Strategic and sharp, or practical and grounded?</legend>
				<label>
					<input
						type="radio"
						name="rational-type"
						value="strategic"
						bind:group={rationalType}
					/>
					Strategic & Sharp
				</label>
				<label>
					<input
						type="radio"
						name="rational-type"
						value="practical"
						bind:group={rationalType}
					/>
					Practical & Grounded
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
	{/if}
</div>