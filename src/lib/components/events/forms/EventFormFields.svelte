<script lang="ts">
	import type { Event, EventRequestType } from '$lib/types/event';
	import type { Item } from '$lib/types/item';
	import type { Role } from '$lib/types/role';
	import type { SvelteSelectableItem } from '$lib/types/svelte-select/detail';
	import DateInput from 'components/forms/DateInput.svelte';
	import SelectDropdown from 'components/forms/SelectDropdown.svelte';
	import TextField from 'components/forms/TextField.svelte';
	import RoleParticipantNumber from 'components/roles/RoleParticipantNumber.svelte';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	import { replaceKeyValueInToArrayIfKeyExistOrAdd } from 'utils/arrayUtils';
	import RandomSelectionModal from './random/RandomSelectionModal.svelte';
	import Icon from 'components/general/Icon.svelte';

	export let formValidation = {
		startDateMissing: false,
		endDateMissing: false
	};

	export let peopleToSelectFrom: Array<SvelteSelectableItem> = [];

	export let lastItemEvent: Event | undefined = undefined;
	export let event: Event = {
		_id: '',
		item: {
			_id: '',
			description: '',
			isLongerThenOneDay: false,
			longDescription: '',
			hasAutomaticStartDate: false,
			usualLenght: 0,
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
			usualLenght: 0,
			longDescription: '',
			hasAutomaticStartDate: false,
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
		hasAutomaticStartDate: false,
		usualLenght: 0,
		name: '',
		description: '',
		longDescription: ''
	};

	let selectedParticipantsIds: Array<{
		role: string;
		person: string;
	}> = [];

	let selectedRole: Role;

	let startDateModified: boolean | undefined = false;
	let endDateModified: boolean | undefined = undefined;

	// there is some kind of weird bug, when binding directly to formEvent.eventNote there is some weird rerender, calling getNamesForRole...
	// but this looks to work ok :)
	let auxEventNote: string;
	$: formEvent.eventNote = auxEventNote;
	// end of weird bug

	// to feed to dropdown as currectly selected values
	let roleParticipants: { [key: string]: Array<string> } = {};

	const mapParticipants = () => {
		event.participants.forEach((participant) => {
			if (roleParticipants[participant.role._id]) {
				roleParticipants[participant.role._id].push(participant.person._id);
			} else {
				roleParticipants[participant.role._id] = [participant.person._id];
			}
		});
	};

	onMount(async () => {
		event.participants.forEach((participant) => {
			selectedParticipantsIds.push({
				role: participant.role._id,
				person: participant.person._id
			});
		});
		auxEventNote = event.eventNote || '';
		mapParticipants();
	});

	let startDate = '';
	let endDate: EventRequestType['endDate'] = event.endDate ? event.endDate : '';

	$: if (item.isLongerThenOneDay === false) {
		endDate = startDate;
	}

	$: if (
		item.isLongerThenOneDay === true &&
		item.usualLenght &&
		item.usualLenght > 0 &&
		endDateModified !== undefined &&
		endDateModified === false
	) {
		if (startDateModified === false) {
			startDate = event.startDate || new Date().toDateString();
		}
		endDate = dayjs(startDate)
			.add(item.usualLenght - 1, 'day')
			.toString();
	}

	// creating new event, automatically fill in end date
	$: if (item.isLongerThenOneDay === true && endDateModified === undefined && endDate === '') {
		// adding a new event with item with usual length > 0
		if (item.hasAutomaticStartDate === true && lastItemEvent?.endDate) {
			startDate = dayjs(lastItemEvent?.endDate).add(1, 'day').toString();
			startDateModified = true;
		} else {
			startDate = event.startDate || new Date().toDateString();
		}

		if (item.usualLenght && item.usualLenght > 0) {
			endDate = dayjs(startDate)
				.add(item.usualLenght - 1, 'day')
				.toString();
		}
	} else {
		// editing an event with existing date and item with usual length > 0
		if (startDateModified === false) {
			startDate = event.startDate || new Date().toDateString();
		}
	}

	$: formEvent.startDate = startDate;
	$: formEvent.endDate = endDate;
	$: formEvent.participants = selectedParticipantsIds;

	let showRandomSelectionModal = false;

	const mapToFormFormat = (selectedRole: Role, selectedPerson: string | string[]) => {
		if (!selectedRole.canHaveMultipleParticipants) {
			replaceKeyValueInToArrayIfKeyExistOrAdd(selectedParticipantsIds, 'role', {
				role: selectedRole._id,
				person: selectedPerson
			});
		} else {
			selectedParticipantsIds = selectedParticipantsIds.filter(
				(item) => item.role !== selectedRole._id
			);
			if (selectedPerson?.length > 0) {
				selectedPerson.forEach((selectedPersonName) => {
					selectedParticipantsIds.push({
						role: selectedRole._id,
						person: selectedPersonName
					});
				});
			}
		}
	};

	function handleSelect(event: CustomEvent<{ [key: number]: SvelteSelectableItem }>, role: Role) {
		if (!role.canHaveMultipleParticipants) {
			replaceKeyValueInToArrayIfKeyExistOrAdd(selectedParticipantsIds, 'role', {
				role: role._id,
				person: event.detail[0].value
			});
			roleParticipants[role._id] = [event.detail[0].value];
		} else {
			selectedParticipantsIds = selectedParticipantsIds.filter((item) => item.role !== role._id);
			for (const [_key, participantItem] of Object.entries(event.detail)) {
				selectedParticipantsIds.push({
					role: role._id,
					person: participantItem.value
				});
			}
			selectedParticipantsIds.forEach((participant) => {
				if (roleParticipants[role._id]) {
					// push it if it does not exist
					if (!roleParticipants[role._id].includes(participant.person)) {
						roleParticipants[role._id].push(participant.person);
					}
					// roleParticipants[role._id].push(participant.person);
				} else {
					roleParticipants[role._id] = [participant.person];
				}
			});
		}
	}
</script>

<div class="p-4">
	<form id="eventForm" class="mt-4">
		<DateInput
			isRequired={true}
			inputLabel="Start date"
			class={`${formValidation.startDateMissing ? 'input-error' : 'input-primary'}`}
			date={startDate}
			on:onUserInteraction={(event) => {
				formValidation.startDateMissing = false;
				endDateModified = false;
				startDateModified = true;
				startDate = event.detail.toString();
			}}
		/>

		{#if item.isLongerThenOneDay}
			<DateInput
				isRequired={true}
				inputLabel={`${
					item.usualLenght && item.usualLenght > 0
						? `End date (predefined length ${item.usualLenght} days)`
						: 'End date'
				}`}
				class={`${formValidation.endDateMissing ? 'input-error' : 'input-primary'}`}
				date={endDate}
				on:onUserInteraction={(event) => {
					if (event.detail.toString() !== 'Invalid Date') {
						formValidation.endDateMissing = false;
						endDate = event.detail.toString();
					} else {
						formValidation.endDateMissing = true;
					}
					endDateModified = true;
				}}
			/>
		{/if}

		{#if item.roles}
			{#each item.roles as role, i}
				<div class="m-1">
					<div class="flex flex-row items-center">
						<RoleParticipantNumber canHaveMultipleParticipants={role.canHaveMultipleParticipants} />
						<span class="label-text"> {role.name}</span>
					</div>
					<div class="flex flex-row">
						<SelectDropdown
							class="w-full"
							items={peopleToSelectFrom}
							placeholder={`Select ${role.name.toLowerCase()}`}
							multiSelect={role.canHaveMultipleParticipants}
							bind:values={roleParticipants[role._id]}
							on:dropdownSelect={(e) => handleSelect(e, role)}
						/>
						<button
							class="ml-2"
							on:click={() => {
								showRandomSelectionModal = true;
								selectedRole = role;
							}}><Icon size="lg" id="random" icon={'faDice'} /></button
						>
					</div>
				</div>
			{/each}
		{/if}

		<TextField
			inputLabel={'Optional event notes'}
			class="textarea-primary leading-tight h-15 w-full"
			inputPlaceholder="Optional event note"
			bind:textValue={auxEventNote}
		/>

		{#if showRandomSelectionModal}
			<RandomSelectionModal
				alreadySelectedParticipants={selectedParticipantsIds}
				{event}
				{item}
				role={selectedRole}
				class="lg:w-fit w-full"
				on:close={() => {
					showRandomSelectionModal = false;
				}}
				on:submit={({ detail }) => {
					showRandomSelectionModal = false;
					if (selectedRole.canHaveMultipleParticipants) {
						if (roleParticipants[selectedRole._id]) {
							roleParticipants[selectedRole._id].push(detail.person._id);
						} else {
							roleParticipants[selectedRole._id] = [detail.person._id];
						}
						// trick for svelte to rerender
						roleParticipants = roleParticipants;

						mapToFormFormat(selectedRole, roleParticipants[selectedRole._id]);
					} else {
						roleParticipants[selectedRole._id] = [detail.person._id];
						mapToFormFormat(selectedRole, detail.person._id);
					}
				}}
			>
				<h1 slot="title">{`Randomize for ${selectedRole.name}`}</h1>
			</RandomSelectionModal>
		{/if}
	</form>
</div>
