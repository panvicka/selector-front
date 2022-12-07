<script>
	// @ts-nocheck
	export let days = null;
	export let hours = null;
	export let minutes = null;
</script>

<div class="grid grid-flow-col gap-5 text-center auto-cols-max">
	{#if days && days > 0}
		<div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
			<span class="countdown font-mono text-5xl">
				<span style={`--value:${days}`} />
			</span>
			days
		</div>
	{/if}
	{#if hours && hours > 0}
		<div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
			<span class="countdown font-mono text-5xl">
				<span style={`--value:${hours}`} />
			</span>
			hours
		</div>
	{/if}
	{#if minutes && minutes > 0}
		<div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
			<span class="countdown font-mono text-5xl">
				<span style={`--value:${minutes}`} />
			</span>
			min
		</div>
	{/if}
</div>
