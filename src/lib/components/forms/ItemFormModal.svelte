<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Item, ItemRequestType } from '$lib/types/item';
	import type { Group } from '$lib/types/group';
	import type { Role } from '$lib/types/role';
	import Modal from 'components/general/Modal.svelte';
	import ItemFormFields from './ItemFormFields.svelte';
	import ActionButtons from './ActionButtons.svelte';

	const dispatch = createEventDispatcher<{ submit: ItemRequestType; close: void }>();
	$: classesFromTheParent = $$props.class;

	let formValidation = {
		nameInputIsMissing: false
	};

	export let item: Item = {
		_id: '',
		name: '',
		description: '',
		longDescription: '',
		roles: [],
		isLongerThenOneDay: false,
		groupes: []
	};

	let formItemSubmitted: ItemRequestType = {
		_id: item?._id || '',
		isLongerThenOneDay: item?.isLongerThenOneDay || false,
		description: item?.description || '',
		longDescription: item?.longDescription || '',
		name: item?.name || '',
		groupes: [],
		roles: []
	};

	function close() {
		dispatch('close');
	}

	function submit() {
		if (!formItemSubmitted.name) {
			formValidation.nameInputIsMissing = true;
			return;
		}

		dispatch('submit', {
			...formItemSubmitted
		});
	}

	export let allGroupes: Array<Group> = [];
	export let allRoles: Array<Role> = [];
</script>

<Modal class={classesFromTheParent} on:clickOutside={() => close()}>
	<slot name="title" slot="modal-title" />

	<svelte:fragment slot="modal-content">
		<ItemFormFields
			bind:formItem={formItemSubmitted}
			{allRoles}
			{allGroupes}
			{formValidation}
			{item}
		/>
	</svelte:fragment>

	<svelte:fragment slot="modal-buttons">
		<ActionButtons on:save={() => submit()} on:close={() => close()} />
	</svelte:fragment>
</Modal>
