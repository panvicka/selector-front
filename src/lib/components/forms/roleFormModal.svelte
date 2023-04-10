<script lang="ts">
	import TextInput from 'components/general/TextInput.svelte';
	import TextField from 'components/general/TextField.svelte';

	import { createEventDispatcher } from 'svelte';

	import * as Icons from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import SelectDropdown from 'components/general/SelectDropdown.svelte';
	import Link from 'components/general/Link.svelte';

	import type { Role } from '$lib/types/role';
	import type { SvelteSelectableItem } from '$lib/types/svelte-select/detail';
	import Icon from 'components/general/Icon.svelte';
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
			nameInputIsMissing = true;
		}
		if (!formRoleSubmitted.description) {
			descriptionInputIsMissing = true;
		}
		if (nameInputIsMissing || descriptionInputIsMissing) return;
		dispatch('submit', {
			...formRoleSubmitted
		});
	}

	let nameInputIsMissing = false;
	let descriptionInputIsMissing = false;

	let selectableIcons: Array<SvelteSelectableItem> = [];

	for (const key of Object.entries(Icons)) {
		const anyKey = key as any; // TODO fix this type somehow
		selectableIcons.push({
			value: anyKey[0],
			label: anyKey[1].iconName
		});
	}

	let selectedIcon = role.icon || 'faQuestion';
	const handleSelect = (event: CustomEvent<{ [key: number]: SvelteSelectableItem }>) => {
		selectedIcon = event.detail[0].value;
	};
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
