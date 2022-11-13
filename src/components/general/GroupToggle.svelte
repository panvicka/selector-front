<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let data = [];
	console.log(data);

	function onChange() {
		dispatch('change', {
			data
		});
	}
</script>

<form on:change={onChange}>
	<label class="cursor-pointer label">
		<span class="label-text">{data.name}</span>
		<input type="checkbox" class="toggle toggle-secondary" bind:checked={data.activeInGroup} />
	</label>

	<div class="flex flex-col	">
		{#each data.items || [] as item}
			<div>
				<label class="label cursor-pointer">
					<span class="label-text">{item.name}</span>
					<input
						type="checkbox"
						bind:checked={item.groupActive}
						disabled={data.activeInGroup ? true : false}
						class="checkbox checkbox-primary"
					/>
				</label>
			</div>
		{/each}
	</div>
</form>
