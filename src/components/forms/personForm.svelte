<script>
	// @ts-nocheck
	import TextInput from '../general/textInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	let itemCheckStates = [];
	let stringItemArray = [];
	export let allItems = [];

	export let person = {
		name: '',
		itemsCanBeAttended: []
	};

	console.log(person);

	onMount(async () => {
		itemCheckStates = allItems.map((item) => {
			let itemSummary = {
				_id: item._id,
				name: item.name,
				checked: false
			};
			if (person.itemsCanBeAttended.includes(item._id)) {
				itemSummary.checked = true;
			}

			return itemSummary;
		});
	});

	function close() {
		dispatch('close');
	}

	function onSubmit() {
		dispatch('submit', {
			name: person.name,
			itemsCanBeAttended: stringItemArray
		});
	}

	function setItemsToUser() {
		stringItemArray = [];
		itemCheckStates.forEach((item) => {
			if (item.checked) {
				stringItemArray.push(item._id);
			}
		});
	}

	export let title = '';
</script>

<h1>{title}</h1>
<TextInput inputLabel={'Name'} inputPlaceholder="Name" bind:textValue={person.name} />

{#each itemCheckStates as item, index}
	<label class="label cursor-pointer">
		<span class="label-text">{item.name}</span>
		<input
			type="checkbox"
			bind:checked={itemCheckStates[index].checked}
			on:change={setItemsToUser}
			class="checkbox checkbox-primary"
		/>
	</label>
{/each}

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
