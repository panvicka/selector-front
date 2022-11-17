<script>
	import { onMount } from 'svelte';
	import { createGroup, deleteGroup, getAllGroups, updateGroups } from './../../api/groups';
	import Modal from '../../components/general/Modal.svelte';
	import RoleForm from '../../components/forms/roleForm.svelte';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import RoleCard from '../../components/roles/RoleCard.svelte';
	import GroupCard from '../../components/groups/GroupCard.svelte';
	import GroupForm from '../../components/forms/groupForm.svelte';
	import ConfirmAction from '../../components/general/ConfirmAction.svelte';
	import Loader from '../../components/general/Loader.svelte';

	let groups = [];
	let isLoading = true;

	onMount(async () => {
		await fetchAllGroups();
		isLoading = false;
	});

	const fetchAllGroups = async () => {
		const res = await getAllGroups();
		groups = res;
	};

	const handleDeleteGroup = async (groupId) => {
		const res = await deleteGroup(groupId);
		fetchAllGroups();
		showDeleteModal = false;
	};

	const handleCreateNewGroup = async (event) => {
		const res = await createGroup({
			name: event.detail.name,
			description: event.detail.description
		});
		letShowCreateModal = false;
		fetchAllGroups();
	};

	const handleEditGroup = async (event) => {
		const res = await updateGroups(groupToBeEdited._id, event.detail);
		fetchAllGroups();
		letShowEditModal = false;
	};

	const triggeredDeleteGroup = async (event) => {
		groupToBeDeleted = event.detail.group;
		showDeleteModal = true;
	};

	let groupToBeDeleted = {};
	let groupToBeEdited = {};

	let showDeleteModal = false;
	let letShowCreateModal = false;
	let letShowEditModal = false;
</script>

<div class="header prose">
	<h1>Groups</h1>

	<button
		class="btn btn-accent"
		on:click={(e) => {
			letShowCreateModal = true;
		}}><Fa size="lg" class="add-new-role-icon" icon={faPlus} /> Add Group</button
	>
</div>

{#if isLoading}
	<Loader />
{:else}
	<div class="flex flex-wrap gap-9 ">
		{#each groups as group}
			<div>
				<GroupCard
					{group}
					on:delete={triggeredDeleteGroup}
					on:edit={(event) => {
						letShowEditModal = true;
						groupToBeEdited = event.detail.group;
					}}
				/>
			</div>
		{/each}
	</div>
{/if}

{#if letShowCreateModal}
	<Modal>
		<GroupForm
			title={'create new role'}
			on:submit={handleCreateNewGroup}
			on:close={() => {
				letShowCreateModal = false;
			}}
		/>
	</Modal>
{/if}

{#if letShowEditModal}
	<Modal>
		<GroupForm
			title={'create new role'}
			group={groupToBeEdited}
			on:submit={handleEditGroup}
			on:close={() => {
				letShowEditModal = false;
			}}
		/>
	</Modal>
{/if}

{#if showDeleteModal}
	<Modal>
		<ConfirmAction
			on:cancel={() => {
				showDeleteModal = false;
			}}
			on:ok={() => {
				handleDeleteGroup(groupToBeDeleted._id);
			}}
		>
			<svelte:fragment slot="title">Confirmation</svelte:fragment>
			<span slot="content"
				>Do you really want to delete {groupToBeDeleted.name}? You can not reverse this action.
			</span>
		</ConfirmAction>
	</Modal>
{/if}

<style>
	.header {
		margin-top: 5em;
		margin-bottom: 2em;
	}
</style>
