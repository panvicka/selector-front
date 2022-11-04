<script>
	// @ts-nocheck
	import TextInput from '../general/textInput.svelte';
	import TextField from '../general/textField.svelte';

	import { createEventDispatcher } from 'svelte';

	import * as Icons from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Select from 'svelte-select';
	import SelectDropdown from '../general/SelectDropdown.svelte';

	const dispatch = createEventDispatcher();

	export let role = {
		name: '',
		description: '',
		icon: ''
	};

	console.log(role);

	function close() {
		dispatch('close');
	}

	function onSubmit() {
		dispatch('submit', {
			name: role.name,
			description: role.description,
			icon: selectedIcon
		});
	}

	export let title = '';

	let selectableIcons = [];

	let keys = Object.keys(Icons);
	for (const key of Object.entries(Icons)) {
		selectableIcons.push({
			value: key[0],
			label: key[1].iconName
		});
	}
	console.log(selectableIcons);

	let selectedIcon = role.icon || '';
	const handleSelect = (event) => {
		console.log('getting');
		console.log(event);
		selectedIcon = event.detail.selected.value;
	};
</script>

<h1>{title}</h1>
<TextInput inputLabel={'Name'} inputPlaceholder="Name" bind:textValue={role.name} />
<TextField
	inputLabel={'Description'}
	inputPlaceholder="Write the description here"
	bind:textValue={role.description}
/>

<div class="themed-select item">
	Icon (https://fontawesome.com/search?o=r&m=free)
	<Fa size="lg" class="role-icon" icon={Icons[selectedIcon]} />

	<SelectDropdown
		items={selectableIcons}
		placeholder={'Select..'}
		value={selectedIcon}
		on:dropdownSelect={handleSelect}
	/>
</div>

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
