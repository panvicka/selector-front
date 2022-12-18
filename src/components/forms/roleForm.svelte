<script lang="ts">
	import TextInput from '../general/TextInput.svelte';
	import TextField from '../general/TextField.svelte';

	import { createEventDispatcher } from 'svelte';

	import * as Icons from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import SelectDropdown from '../general/SelectDropdown.svelte';
	import type { Role } from 'types/role';
	import type { Icon } from 'types/icon';

	const dispatch = createEventDispatcher<{ submit: Role; close: void }>();

	export let role: Role = {
		_id: '',
		name: '',
		description: '',
		icon: ''
	};

	function close() {
		dispatch('close');
	}

	function onSubmit() {
		dispatch('submit', {
			_id: role._id || '',
			name: role.name,
			description: role.description,
			icon: selectedIcon
		});
	}

	export let title = '';

	let selectableIcons: Array<Icon> = [];

	for (const key of Object.entries(Icons)) {
		console.log(key)
		selectableIcons.push({
			value: key[0],
			label: key[1].iconName
		});
	}
	console.log(selectableIcons);

	let selectedIcon = role.icon || '';
	const handleSelect = (event) => {
		selectedIcon = event.detail.selected.value;
	};
</script>

<h1>{title}</h1>
<TextInput
	inputLabel={'Name'}
	inputPlaceholder="Name"
	bind:textValue={role.name}
	class="input-accent"
/>
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
