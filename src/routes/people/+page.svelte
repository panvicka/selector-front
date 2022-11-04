<script>
	import { createPerson, deletePerson, getAllPeople, updatePerson } from '../../api/people';
	import { onMount } from 'svelte';
	import PersonCard from '../../components/personCard.svelte';
	import { PlusCircleIcon } from 'svelte-feather-icons';
	import { getAllItems } from '../../api/item';
	import Modal from '../../components/general/Modal.svelte';
	import PersonForm from '../../components/forms/personForm.svelte';
	import ConfirmAction from '../../components/general/ConfirmAction.svelte';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	let people = [];

	let allItems = [];
	let itemCheckStates = [];

	onMount(async () => {
		await fetchAllPeople();
		allItems = await getAllItems();
	});

	const fetchAllPeople = async () => {
		const res = await getAllPeople();
		people = res;
	};

	const handleCreateNewPerson = async (event) => {
		const res = await createPerson({
			name: event.detail.name,
			itemsCanBeAttended: event.detail.itemsCanBeAttended
		});
		letShowCreateModal = false;
		fetchAllPeople();
	};

	const handleDeletePerson = async (personId) => {
		const res = await deletePerson(personId);
		fetchAllPeople();
		showDeleteModal = false;
	};

	const handleEditPerson = async (event) => {
		const res = await updatePerson(personToBeEdited._id, event.detail);
		fetchAllPeople();
		letShowEditModal = false;
	};

	const triggeredDeletePerson = (event) => {
		personToBeDeleted = event.detail.person;
		showDeleteModal = true;
	};

	let personToBeDeleted = {};
	let personToBeEdited = {};

	let showDeleteModal = false;
	let letShowCreateModal = false;
	let letShowEditModal = false;
</script>

{#if showDeleteModal}
	<Modal>
		<ConfirmAction
			on:cancel={() => {
				showDeleteModal = false;
			}}
			on:ok={() => {
				handleDeletePerson(personToBeDeleted._id);
			}}
		>
			<svelte:fragment slot="title">Confirmation</svelte:fragment>
			<span slot="content"
				>Do you really want to delete {personToBeDeleted.name}? You can not reverse this action.
			</span>
		</ConfirmAction>
	</Modal>
{/if}

<div class="header prose">
	<h1>People</h1>

	<button
		class="btn btn-accent"
		on:click={(e) => {
			letShowCreateModal = true;
		}}><Fa size="lg" class="add-new-person-icon" icon={faPlus} /> Add person</button
	>
</div>
<div class="grid grid-cols-4 gap-5">
	{#each people as person}
		<div>
			<PersonCard
				{person}
				on:onDelete={triggeredDeletePerson}
				on:onEdit={(event) => {
					letShowEditModal = true;
					personToBeEdited = event.detail.person;
				}}
			/>
		</div>
	{/each}
</div>

{#if letShowCreateModal}
	<Modal>
		<PersonForm
			title={'create new person'}
			{allItems}
			on:submit={handleCreateNewPerson}
			on:close={() => {
				letShowCreateModal = false;
			}}
		/>
	</Modal>
{/if}

{#if letShowEditModal}
	<Modal>
		<PersonForm
			title={'edit person'}
			person={personToBeEdited}
			{allItems}
			on:submit={handleEditPerson}
			on:close={() => {
				letShowEditModal = false;
			}}
		/>
	</Modal>
{/if}

<style>
	.header {
		margin-top: 5em;
		margin-bottom: 2em;
	}
</style>
