<script lang="ts">
	import PCMultiSelection from './PCMultiSelection.svelte';

	let {
		personality = $bindable(''),
		emotionalType = $bindable(''),
		rationalType = $bindable(''),
		courtRank = $bindable('')
	} = $props();

	// Determine if suite is selected (same logic as PCSelection will use)
	const hasSuite = $derived(
		emotionalType === 'passionate' ||
			emotionalType === 'caring' ||
			rationalType === 'strategic' ||
			rationalType === 'practical'
	);

	// Clear court rank when suite type changes
	$effect(() => {
		emotionalType;
		rationalType;
		courtRank = '';
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
