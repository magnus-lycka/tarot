<script lang="ts">
	let { personality = $bindable(''), emotionalType = $bindable(''), rationalType = $bindable('') } = $props();

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
</script>

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
			<input type="radio" name="emotional-type" value="passionate" bind:group={emotionalType} />
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
			<input type="radio" name="rational-type" value="strategic" bind:group={rationalType} />
			Strategic & Sharp
		</label>
		<label>
			<input type="radio" name="rational-type" value="practical" bind:group={rationalType} />
			Practical & Grounded
		</label>
	</fieldset>
{/if}
