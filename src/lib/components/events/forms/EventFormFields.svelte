<script lang="ts">
	import type { Event, EventRequestType } from '$lib/types/event';
	import type { Item } from '$lib/types/item';
	import type { Role } from '$lib/types/role';
	import type { SvelteSelectableItem } from '$lib/types/svelte-select/detail';
	import DateInput from 'components/forms/DateInput.svelte';
	import SelectDropdown from 'components/forms/SelectDropdown.svelte';
	import TextField from 'components/forms/TextField.svelte';
	import RoleParticipantNumber from 'components/roles/RoleParticipantNumber.svelte';
	import { onMount } from 'svelte';
	import { replaceKeyValueInToArrayIfKeyExistOrAdd } from 'utils/arrayUtils';

	export let formValidation = {
		startDateMissing: false,
		endDateMissing: false
	};

	export let peopleToSelectFrom: Array<SvelteSelectableItem> = [];

	export let event: Event = {
		_id: '',
		item: {
			_id: '',
			description: '',
			isLongerThenOneDay: false,
			longDescription: '',
			name: '',
			groupes: [],
			roles: []
		},
		startDate: '',
		endDate: '',
		eventNote: '',
		participants: []
	};

	export let formEvent: Event = {
		_id: event?._id || '',
		item: event?.item || {
			_id: '',
			description: '',
			isLongerThenOneDay: false,
			longDescription: '',
			name: '',
			groupes: [],
			roles: []
		},
		startDate: event?.startDate || '',
		endDate: event?.endDate || '',
		eventNote: event?.eventNote || '',
		participants: event?.participants || []
	};

	export let item: Item = {
		_id: '',
		roles: [],
		groupes: [],
		isLongerThenOneDay: false,
		name: '',
		description: '',
		longDescription: ''
	};

	console.log(peopleToSelectFrom);
	let selectedParticipantsIds: Array<{
		role: string;
		person: string;
	}> = [];

	onMount(async () => {
		event.participants.forEach((participant) => {
			selectedParticipantsIds.push({
				role: participant.role._id,
				person: participant.person._id
			});
		});
	});

	let startDate = event.startDate || new Date().toDateString();
	let endDate: EventRequestType['endDate'] = event.endDate ? event.endDate : '';

	$: if (item.isLongerThenOneDay === false) {
		endDate = startDate;
	}

	$: formEvent.startDate = startDate;
	$: formEvent.endDate = endDate;
	$: formEvent.participants = selectedParticipantsIds;

	formEvent.eventNote = event.eventNote || '';

	const getNamesForRole = (role: Role): string | string[] => {
		let person = '';
		let personNameArray: string[] = [];
		if (role.canHaveMultipleParticipants) {
			event.participants.forEach((participant) => {
				if (participant.role._id == role._id) {
					personNameArray.push(participant.person._id);
				}
			});
			return personNameArray;
		} else {
			event.participants.forEach((participant) => {
				if (participant.role._id == role._id) {
					person = participant.person.name;
					return person;
				}
			});
		}
		return person;
	};

	function handleSelect(
		event: CustomEvent<{ [key: number]: SvelteSelectableItem }>,
		roleId: Role['_id'],
		roleWithMultiplePeople: boolean
	) {
		if (!roleWithMultiplePeople) {
			replaceKeyValueInToArrayIfKeyExistOrAdd(selectedParticipantsIds, 'role', {
				role: roleId,
				person: event.detail[0].value
			});
		} else {
			selectedParticipantsIds = selectedParticipantsIds.filter((item) => item.role !== roleId);
			for (const [_key, participantItem] of Object.entries(event.detail)) {
				selectedParticipantsIds.push({
					role: roleId,
					person: participantItem.value
				});
			}
		}
	}
</script>

<div class="p-4">
	<form id="eventForm" class="mt-4">
		<DateInput
			isRequired={true}
			inputLabel="Start date"
			class={`${formValidation.startDateMissing ? 'input-error' : 'input-primary'}`}
			bind:date={startDate}
			on:onUserInteraction={() => {
				formValidation.startDateMissing = false;
			}}
		/>

		{#if item.isLongerThenOneDay}
			<DateInput
				isRequired={true}
				inputLabel="End date"
				class={`${formValidation.endDateMissing ? 'input-error' : 'input-primary'}`}
				bind:date={endDate}
				on:onUserInteraction={() => {
					formValidation.endDateMissing = false;
				}}
			/>
		{/if}

		{#if item.roles}
			{#each item.roles as role, i}
				<div class="m-1">
					<div class="flex flex-row justify-between">
						<span class="label-text"> {role.name}</span>
						<RoleParticipantNumber canHaveMultipleParticipants={role.canHaveMultipleParticipants} />
					</div>
					<SelectDropdown
						items={peopleToSelectFrom}
						placeholder={`Select ${role.name.toLowerCase()}`}
						multiSelect={role.canHaveMultipleParticipants}
						value={getNamesForRole(role)}
						on:dropdownSelect={(e) => handleSelect(e, role._id, role.canHaveMultipleParticipants)}
					/>
				</div>
			{/each}
		{/if}

		<TextField
			inputLabel={'Optional event notes'}
			class="textarea-primary leading-tight h-15"
			inputPlaceholder="Optional event note"
			bind:textValue={formEvent.eventNote}
		/>
	</form>
</div>
