<script>
	// @ts-nocheck
	import { createEventDispatcher } from 'svelte';
	import DateInput from '../general/DateInput.svelte';
	import { onMount } from 'svelte';
	import { replaceKeyValueInToArrayIfKeyExistOrAdd } from '../../utils/arrayUtils';
	import SelectDropdown from '../general/SelectDropdown.svelte';
	import Select from 'svelte-select';
	const dispatch = createEventDispatcher();

	export let peopleToSelectFrom = [];
	export let title = '';

	let selectedPeople = [];

	export let event = {
		startDate: '',
		endDate: '',
		people: [],
		participants: []
	};

	export let item = {
		_id: '',
		roles: {}
	};

	console.log(event);

	onMount(async () => {
		event.participants.forEach((participant) => {
			selectedParticipants.push({
				role: participant.role._id,
				person: participant.person._id
			});
		});
	});

	let selectedParticipants = [];

	let startDate = event.startDate;
	let endDate = event.endDate ? event.endDate : '';

	function close() {
		dispatch('close');
	}

	function submit() {
		event.people = selectedPeople;
		event.startDate = startDate;
		event.endDate = endDate;
		event.participants = selectedParticipants;
		dispatch('submit', {
			event
		});
	}

	const getNameForRoleId = (roleId) => {
		let person = null;
		event.participants.forEach((participant) => {
			if (participant.role._id == roleId) {
				person = participant.person.name;
				return;
			}
		});
		return person;
	};

	function handleSelect(event, roleId) {
		replaceKeyValueInToArrayIfKeyExistOrAdd(selectedParticipants, 'role', {
			role: roleId,
			person: event.detail.selected.value
		});
	}
</script>

<h1>{title}</h1>

<div class="item">
	Start Date
	<DateInput bind:date={startDate} />
</div>
<div class="item">
	End Date
	<DateInput bind:date={endDate} />
</div>

{#each item.roles as role, i}
	<div class="item">
		{role.name}
		<SelectDropdown
			items={peopleToSelectFrom}
			placeholder={'Select..'}
			value={getNameForRoleId(role._id)}
			on:dropdownSelect={(event) => handleSelect(event, role._id)}
		/>
	</div>
{/each}

<div class="button-group">
	<button
		class="btn btn-outline btn-error"
		type="button"
		on:click={() => {
			close();
		}}>Close</button
	>
	<button type="button" class="btn btn-outline btn-primary" on:click={submit}>Save</button>
</div>

<style>
	.item {
		padding: 0.3em;
	}

	.button-group {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 2em 0;
	}
</style>
