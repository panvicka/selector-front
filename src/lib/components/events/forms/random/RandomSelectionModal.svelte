<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';
	import type { Event, EventRequestType } from '$lib/types/event';
	import type { Item, RandomOptions } from '$lib/types/item';
	import type { SvelteSelectableItem } from '$lib/types/svelte-select/detail';
	import Modal from 'components/general/Modal.svelte';
	import EventFormFields from './RandomSelectionFields.svelte';
	import ActionButtons from 'components/forms/ActionButtons.svelte';
	import type { Role } from '$lib/types/role';
	import RandomSelectionFields from './RandomSelectionFields.svelte';
	import { LocalApiItems } from '$lib/apiClient/items';
	import Alert from 'components/general/Alert.svelte';

	const dispatch = createEventDispatcher<{
		submit: {
			person: {
				_id: string;
				name: string;
			};
		};
		close: void;
	}>();
	$: classesFromTheParent = $$props.class;

	export let alreadySelectedParticipants: Array<{
		role: string;
		person: string;
	}> = [];

	export let event: Event = {
		_id: '',
		item: {
			_id: '',
			description: '',
			isLongerThenOneDay: false,
			longDescription: '',
			hasAutomaticStartDate: false,
			usualLenght: null,
			name: '',
			groupes: [],
			roles: []
		},
		startDate: '',
		endDate: '',
		eventNote: '',
		participants: []
	};

	export let item: Item = {
		_id: '',
		roles: [],
		groupes: [],
		isLongerThenOneDay: false,
		usualLenght: null,
		hasAutomaticStartDate: false,
		name: '',
		description: '',
		longDescription: ''
	};

	export let role: Role = {
		_id: '',
		name: '',
		participantNumber: 0
	};

	function close() {
		dispatch('close');
	}

	let randomOptions: RandomOptions = {
		hasDoneTheRole: false,
		lessThenAverage: true,
		daysSince: 40,
		notAlreadyPlanned: true,
		numberOfResults: 5,
		excludePeople: []
	};

	let listOfResults = [];
	let isLoading = true;

	const fetchRandomResults = async (randomOptions: any) => {
		// @ts-ignore
		isLoading = true;

		console.log(alreadySelectedParticipants);

		// filter out the people that are already selected
		randomOptions.excludePeople = alreadySelectedParticipants
			.filter((participant) => participant.role === role._id)
			.map((participant) => participant.person);

		console.log(randomOptions.excludePeople);

		listOfResults = await LocalApiItems.getRandomizedPeopleForAttendance(
			item._id,
			role._id,
			randomOptions
		);
		isLoading = false;
	};

	onMount(async () => {
		fetchRandomResults(randomOptions);
	});
</script>

<Modal class={classesFromTheParent}>
	<slot name="title" slot="modal-title" />

	<svelte:fragment slot="modal-content">
		<RandomSelectionFields
			{randomOptions}
			{listOfResults}
			{isLoading}
			on:change={async ({ detail }) => {
				fetchRandomResults(detail);
			}}
			on:personSelect={({ detail }) => {
				dispatch('submit', {
					...detail
				});
				console.log(detail);
			}}
		/>
	</svelte:fragment>

	<svelte:fragment slot="modal-buttons">
		<button
			class="btn btn-outline btn-error"
			type="button"
			aria-label="Close"
			on:click={() => {
				close();
			}}>Close</button
		>
	</svelte:fragment>
</Modal>
