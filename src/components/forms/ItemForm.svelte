<script>
	// @ts-nocheck
	import TextInput from '../general/textInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import Select from 'svelte-select';
	import Fa from 'svelte-fa';
	import { faXmark } from '@fortawesome/free-solid-svg-icons';
	import {
		addToArrayIfKeyValueDoesntExist,
		findByKeyInArray,
		removeFromArrayBasedOnKey
	} from '../../utils/arrayUtils';
	import SelectDropdown from '../general/SelectDropdown.svelte';
	import TextField from '../general/textField.svelte';
	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}

	function onSubmit() {
		console.log(item);
		dispatch('submit', {
			item
		});
	}

	export let item = {
		name: '',
		description: '',
		roles: [],
		isLongerThenOneDay: false,
		groupes: []
	};

	export let allGroupes = [];
	export let allRoles = [];
	export let title = '';

	let rolesForSelect = allRoles.map((role) => {
		return {
			value: role._id,
			label: role.name
		};
	});

	let selectedRoles = item.roles || [];

	$: item.roles = selectedRoles;

	let groupesForSelect = allGroupes.map((group) => {
		return {
			value: group._id,
			label: group.name
		};
	});

	let selectedGroupes = item.groupes || [];

	$: item.groupes = [selectedRadioGroup];
	let selectedRadioGroup = item.groupes[0]?._id || null;
	console.log('selected radio group');
	console.log(selectedRadioGroup);

	const handleSelect = (event) => {
		console.log(event);
		let role = findByKeyInArray('_id', event.detail.selected.value, allRoles);
		selectedRoles = addToArrayIfKeyValueDoesntExist(selectedRoles, '_id', role);
	};

	const handleSelectGroup = (event) => {
		console.log(event);
		let group = findByKeyInArray('_id', event.detail.selected.value, allGroupes);
		selectedGroupes = addToArrayIfKeyValueDoesntExist(selectedGroupes, '_id', group);
	};

	const deleteTrigger = (roleId) => {
		selectedRoles = removeFromArrayBasedOnKey('_id', roleId, selectedRoles);
	};

	const deleteGroupTrigger = (groupId) => {
		selectedGroupes = removeFromArrayBasedOnKey('_id', groupId, selectedGroupes);
	};

	let radioGroup = 1;

	function onRadioChange(event) {
		selectedRadioGroup = event.currentTarget.value;
		console.log(selectedRadioGroup);
	}
</script>

<h1>{title}</h1>
<div class="flex w-full">
	<div class="bg-base-300 rounded-box w-80 p-4">
		<TextInput
			inputLabel={'Name'}
			styleClass={'input-info'}
			inputPlaceholder="Name of the item"
			bind:textValue={item.name}
		/>

		<TextField
			inputLabel={'Description'}
			inputPlaceholder="Write the description here"
			bind:textValue={item.description}
		/>

		<label class="cursor-pointer label">
			<span class="label-text">Interval tracking?</span>
			<input type="checkbox" class="toggle toggle-primary" bind:checked={item.isLongerThenOneDay} />
		</label>
	</div>
	<div class="divider divider-horizontal" />

	<div class="bg-base-300 rounded-box w-80 p-4">
		<div>
			<div class="item">
				Roles
				<SelectDropdown
					items={rolesForSelect}
					placeholder={'Select..'}
					value={null}
					on:dropdownSelect={(event) => handleSelect(event)}
				/>
			</div>

			Selected roles:
			<div>
				{#each selectedRoles || [] as role}
					<div class="badge badge-ghost">
						<Fa size="lg" class="role-icon" icon={role.icon} />
						{role.name}
						<button
							on:click={() => {
								deleteTrigger(role._id);
							}}><Fa size="xs" id="delete" icon={faXmark} /></button
						>
					</div>
				{/each}
			</div>
		</div>

		Choose Group:
		<div class="flex flex-col">
			{#each groupesForSelect || [] as group}
				<label>
					<input
						on:change={onRadioChange}
						type="radio"
						bind:group={selectedRadioGroup}
						name="groupes"
						class="radio radio-accent"
						value={group.value}
					/>
					{group.label}
				</label>
			{/each}
		</div>
	</div>
</div>

<div class="buttons">
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
	.buttons {
		margin-top: 3em;
		display: flex;
		justify-content: space-between;
	}
</style>
