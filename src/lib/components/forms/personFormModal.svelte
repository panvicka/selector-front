<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Modal from 'components/general/Modal.svelte';
	import ActionButtons from './ActionButtons.svelte';
	import type { Group } from '$lib/types/group';
	import type { Person } from '$lib/types/person';
	import PersonFormFields from './personFormFields.svelte';

	const dispatch = createEventDispatcher<{ submit: Person; close: void }>();
	$: classesFromTheParent = $$props.class;

	let formValidation = {
		nameInputIsMissing: false
	};

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
