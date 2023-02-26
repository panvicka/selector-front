<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ save: void; close: void }>();

	function close() {
		dispatch('close');
	}

	function save() {
		dispatch('save');
	}
</script>

<div class="mt-4 flex justify-between w-full">
	<button
		class="btn btn-outline btn-error"
		type="button"
		on:click={() => {
			close();
		}}>Close</button
	>
	<button
		type="button"
		class="btn btn-outline btn-info"
		on:click={() => {
			save();
		}}>Save</button
	>
</div>
