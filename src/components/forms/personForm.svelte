<script>
	// @ts-nocheck
	import TextInput from '../general/textInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import SelectDropdown from '../general/SelectDropdown.svelte';
	import Fa from 'svelte-fa';
	import {
		addItemToArrayIfNotAlreadyThere,
		addToArrayIfKeyValueDoesntExist,
		findByKeyInArray,
		findIndexByKeyInArray,
		removeFromArrayBasedOnKey,
		removeItemFromArray
	} from '../../utils/arrayUtils';
	import { faXmark } from '@fortawesome/free-solid-svg-icons';
	import GroupToggle from '../general/GroupToggle.svelte';

	const dispatch = createEventDispatcher();

	let itemCheckStates = [];
 	export let allItems = [];

	export let title = '';

	export let person = {
		name: '',
		itemsCanBeAttended: [],
		groupes: [],
		active: true
	};

	export let allGroupes = [];

	let newSelectedGroupes = [];
	let newSelectedItems = [];

	let mappedData = [];
	const mapGroups = (groupId) => {
		let active = false;

		const index = findIndexByKeyInArray('_id', groupId, person.groupes);
		if (index != -1) {
			active = true;
		}

		if (person.groupes.includes(groupId)) {
			active = true;
		}
		let group = findByKeyInArray('_id', groupId, allGroupes);
 
		const mappedGroupData = group.items.map((item) => {
			if (person.itemsCanBeAttended.includes(item._id)) {
				return {
					_id: item._id,
					name: item.name,
					description: item.description,
					groupActive: true
				};
			} else {
				return {
					_id: item._id,
					name: item.name,
					description: item.description,
					groupActive: false
				};
			}
		});

		mappedData.push({
			_id: group._id,
			name: group.name,
			descriptions: group.description,
			activeInGroup: active,
			items: [...mappedGroupData]
		});
	};

	const setSelectedGroupsAndItems = (mappedData) => {
		mappedData.forEach((mappedDataItem) => {
			if (mappedDataItem.activeInGroup === true) {
				newSelectedGroupes = addItemToArrayIfNotAlreadyThere(
					newSelectedGroupes,
					mappedDataItem._id
				);
			} else {
				newSelectedGroupes = removeItemFromArray(newSelectedGroupes, mappedDataItem._id);
			}

			mappedDataItem.items.forEach((item) => {
				if (item.groupActive == true) {
					newSelectedItems = addItemToArrayIfNotAlreadyThere(newSelectedItems, item._id);
				} else {
					newSelectedItems = removeItemFromArray(newSelectedItems, item._id);
				}
			});
		});
	};

	allGroupes.forEach((group) => {
		mapGroups(group._id);
	});
	setSelectedGroupsAndItems(mappedData);

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
			itemsCanBeAttended: newSelectedItems,
			groupes: newSelectedGroupes,
			active: true
		});
	}

	const handleToggleChange = (event, id) => {
		const index = findIndexByKeyInArray('_id', id, mappedData);

		mappedData[index].activeInGroup = event.detail.data.activeInGroup;
		if (mappedData[index].activeInGroup == true) {
			mappedData[index].items = mappedData[index].items.map((item) => {
				return {
					...item,
					groupActive: true
				};
			});
		}

		setSelectedGroupsAndItems(mappedData);
	};
</script>

<h1>{title}</h1>

<div class="flex w-full">
	<div class="bg-base-300 rounded-box w-80 p-4">
		<TextInput inputLabel={'Name'} inputPlaceholder="Name" bind:textValue={person.name} />
	</div>
	<div class="divider divider-horizontal" />

	<div class="bg-base-300 rounded-box w-80 p-4">
		{#each mappedData as groupData}
			<GroupToggle
				data={groupData}
				on:change={(event) => handleToggleChange(event, groupData._id)}
			/>
		{/each}
	</div>
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
