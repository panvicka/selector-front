<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import type { Item, RandomOptions, RandomResultResponse } from '$lib/types/item';
	import Modal from 'components/general/Modal.svelte';
	import type { Role } from '$lib/types/role';
	import RandomSelectionFields from './RandomSelectionFields.svelte';
	import { LocalApiItems } from '$lib/apiClient/items';

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

	export let role: Role;

	function close() {
		dispatch('close');
	}

	let randomOptions: RandomOptions = {
		hasDoneTheRole: undefined,
		lessThenAverage: true,
		daysSince: 0,
		notAlreadyPlanned: true,
		numberOfResults: 5,
		excludePeople: []
	};

	let randomResult: RandomResultResponse;
	let listOfResults: Array<any> = [];
	let isLoading = true;

	const fetchRandomResults = async (randomOptions: any) => {
		isLoading = true;

		randomOptions.excludePeople = alreadySelectedParticipants.map(
			(participant) => participant.person
		);

		randomResult = await LocalApiItems.getRandomizedPeopleForAttendance(
			item._id,
			role._id,
			randomOptions
		);
		listOfResults = randomResult.possibleMatches;
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
			averageAttendace={randomResult?.averageAttendance}
			{isLoading}
			on:change={async ({ detail }) => {
				fetchRandomResults(detail);
			}}
			on:personSelect={({ detail }) => {
				dispatch('submit', {
					...detail
				});
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
