<script lang="ts">
	import TextInput from 'components/general/TextInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';

	import {
		addItemToArrayIfNotAlreadyThere,
		findByKeyInArray,
		findIndexByKeyInArray,
		removeItemFromArray
	} from 'utils/arrayUtils';
	import Modal from 'components/general/Modal.svelte';
	import ActionButtons from './ActionButtons.svelte';


	import GroupToggle, { type mappedDataType } from 'components/general/GroupToggle.svelte';
	import type { Item } from '$lib/types/item';
	import type { Group } from '$lib/types/group';
	import type { Person } from '$lib/types/person';
	import PersonFormFields from './personFormFields.svelte';

	const dispatch = createEventDispatcher<{ submit: Person; close: void }>();
	$: classesFromTheParent = $$props.class;

	let formValidation = {
		nameInputIsMissing: false
	};

	let itemCheckStates = [];
	export let allItems: Array<Item> = [];

	export let title = '';

	export let person: Person = {
		_id: '',
		name: '',
		itemsCanBeAttended: [],
		groupes: [],
		active: true
	};

	let formPersonSubmitted: Person = {
		_id: person?._id || '',
		name: person?.name || '',
		itemsCanBeAttended: person?.itemsCanBeAttended || [],
		groupes: person?.groupes || [],
		active: person?.active || false
	};

	function close() {
		dispatch('close');
	}

	function submit() {
		if (!formPersonSubmitted.name) {
			formValidation.nameInputIsMissing = true;
			return;
		}

		dispatch('submit', {
			...formPersonSubmitted
		});
	}

	export let allGroupes: Array<Group> = [];
</script>

<Modal class={classesFromTheParent} on:clickOutside={() => close()}>
	<slot name="title" slot="modal-title" />

	<svelte:fragment slot="modal-content">
		<PersonFormFields
			bind:formPerson={formPersonSubmitted}
			{allGroupes}
			{formValidation}
			{person}
		/>
	</svelte:fragment>

	<svelte:fragment slot="modal-buttons">
		<ActionButtons on:save={() => submit()} on:close={() => close()} />
	</svelte:fragment>
</Modal>
