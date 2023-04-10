<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Role } from '$lib/types/role';
	import Modal from 'components/general/Modal.svelte';
	import RoleFormFields from './roleFormFields.svelte';
	import ActionButtons from './ActionButtons.svelte';

	const dispatch = createEventDispatcher<{ submit: Role; close: void }>();
	$: classesFromTheParent = $$props.class;

	let formValidation = {
		nameInputIsMissing: false,
		descriptionInputIsMissing: false
	};

	export let role: Role = {
		_id: '',
		name: '',
		description: '',
		canHaveMultipleParticipants: false,
		icon: ''
	};

	let formRoleSubmitted: Role = {
		_id: role?._id || '',
		name: role?.name || '',
		description: role?.description || '',
		canHaveMultipleParticipants: role?.canHaveMultipleParticipants || false,
		icon: role?.description || ''
	};

	function close() {
		dispatch('close');
	}

	function submit() {
		if (!formRoleSubmitted.name) {
			formValidation.nameInputIsMissing = true;
		}
		if (!formRoleSubmitted.description) {
			formValidation.descriptionInputIsMissing = true;
		}
		if (formValidation.nameInputIsMissing || formValidation.descriptionInputIsMissing) return;
		dispatch('submit', {
			...formRoleSubmitted
		});
	}
</script>

<Modal class={classesFromTheParent} on:clickOutside={() => close()}>
	<slot name="title" slot="modal-title" />

	<svelte:fragment slot="modal-content">
		<RoleFormFields bind:formRole={formRoleSubmitted} {role} {formValidation} />
	</svelte:fragment>

	<svelte:fragment slot="modal-buttons">
		<ActionButtons on:save={() => submit()} on:close={() => close()} />
	</svelte:fragment>
</Modal>
