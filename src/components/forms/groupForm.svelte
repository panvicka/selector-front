<script>
	// @ts-nocheck
	import TextInput from '../general/TextInput.svelte';
	import TextField from '../general/TextField.svelte';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let group = {
		name: '',
		description: ''
	};

	function close() {
		dispatch('close');
	}

	function onSubmit() {
		dispatch('submit', {
			name: group.name,
			description: group.description
		});
	}

	export let title = '';
</script>

<h1>{title}</h1>
<TextInput
	inputLabel={'Name'}
	inputPlaceholder="Name"
	bind:textValue={group.name}
	class="input-accent"
/>
<TextField
	inputLabel={'Description'}
	inputPlaceholder="Write the description here"
	bind:textValue={group.description}
/>

<div>
	<button
		class="btn btn-outline btn-error"
		type="button"
		on:click={() => {
			close();
		}}>Close</button
	>
	<button type="button" class="btn btn-outline btn-info" on:click={onSubmit}>Save</button>
</div>

<style>
</style>
