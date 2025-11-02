<script lang="ts">
	let pcCount = $state<string>('');
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
		<p>Single PC</p>
	{:else if pcCount && pcCount !== ''}
		<p>PC team</p>
	{/if}
</div>