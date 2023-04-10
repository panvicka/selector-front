<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Group } from '$lib/types/group';
	import Modal from 'components/general/Modal.svelte';
	import ActionButtons from './ActionButtons.svelte';
	import GroupFormFields from './groupFormFields.svelte';

	const dispatch = createEventDispatcher<{ submit: Group; close: void }>();
	$: classesFromTheParent = $$props.class;

	let formValidation = {
		nameInputIsMissing: false,
		descriptionInputIsMissing: false
	};

	export let group: Group = {
		_id: '',
		name: '',
		description: '',
		items: []
	};

	let formGroupSubmitted: Group = {
		_id: group?._id || '',
		name: group?.name || '',
		description: group?.description || '',
		items: group?.items || []
	};

	function close() {
		dispatch('close');
	}

	function submit() {
		if (!formGroupSubmitted.name) {
			formValidation.nameInputIsMissing = true;
		}
		if (!formGroupSubmitted.description) {
			formValidation.descriptionInputIsMissing = true;
		}
		if (formValidation.nameInputIsMissing || formValidation.descriptionInputIsMissing) {
			return;
		}

		dispatch('submit', {
			...formGroupSubmitted
		});
	}
</script>

<Modal class={classesFromTheParent} on:clickOutside={() => close()}>
	<slot name="title" slot="modal-title" />

	<svelte:fragment slot="modal-content">
		<GroupFormFields bind:formGroup={formGroupSubmitted} {group} {formValidation} />
	</svelte:fragment>

	<svelte:fragment slot="modal-buttons">
		<ActionButtons on:save={() => submit()} on:close={() => close()} />
	</svelte:fragment>
</Modal>
