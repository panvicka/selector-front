<script>
	import { onMount } from 'svelte';
	import { createRole, deleteRole, getAllRoles, updateRole } from './../../api/roles';
	import Modal from '../../components/general/Modal.svelte';
	import RoleForm from '../../components/forms/roleForm.svelte';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import RoleCard from '../../components/roles/RoleCard.svelte';
	import DangerZoneConfirmDeleteAction from '../../components/general/DangerZoneConfirmDeleteAction.svelte';
	import Loader from '../../components/general/Loader.svelte';

	let roles = [];

	let isLoading = true;
	onMount(async () => {
		await fetchAllRoles();
		isLoading = false;
	});

	const fetchAllRoles = async () => {
		const res = await getAllRoles();
		roles = res;
		console.log(roles);
	};

	const handleCreateNewRole = async (event) => {
		const res = await createRole({
			name: event.detail.name,
			description: event.detail.description,
			icon: event.detail.icon
		});
		letShowCreateModal = false;
		fetchAllRoles();
	};

	const handleDeleteRole = async (roleId) => {
		const res = await deleteRole(roleId);
		fetchAllRoles();
		showDeleteModal = false;
	};

	const handleEditRole = async (event) => {
		const res = await updateRole(roleToBeEdited._id, event.detail);
		fetchAllRoles();
		letShowEditModal = false;
	};

	const triggeredDeleteRole = async (event) => {
		roleToBeDeleted = event.detail.role;
		showDeleteModal = true;
	};

	let roleToBeDeleted = {};
	let roleToBeEdited = {};

	let showDeleteModal = false;
	let letShowCreateModal = false;
	let letShowEditModal = false;
</script>

<div class="header prose">
	<h1>Roles</h1>

	<button
		class="btn btn-accent"
		on:click={(e) => {
			letShowCreateModal = true;
		}}><Fa size="lg" class="add-new-role-icon" icon={faPlus} /> Add Role</button
	>
</div>

{#if isLoading}
	<Loader />
{:else}
	<div class="grid grid-cols-3 gap-5">
		{#each roles as role}
			<div>
				<RoleCard
					{role}
					on:delete={triggeredDeleteRole}
					on:edit={(event) => {
						letShowEditModal = true;
						roleToBeEdited = event.detail.role;
						console.log(roleToBeEdited);
					}}
				/>
			</div>
		{/each}
	</div>
{/if}

{#if letShowCreateModal}
	<Modal>
		<RoleForm
			title={'create new role'}
			on:submit={handleCreateNewRole}
			on:close={() => {
				letShowCreateModal = false;
			}}
		/>
	</Modal>
{/if}

{#if letShowEditModal}
	<Modal>
		<RoleForm
			title={'create new role'}
			role={roleToBeEdited}
			on:submit={handleEditRole}
			on:close={() => {
				letShowEditModal = false;
			}}
		/>
	</Modal>
{/if}

{#if showDeleteModal}
	<Modal>
		<DangerZoneConfirmDeleteAction
			subject="role"
			expectedConfirmationText={roleToBeDeleted.name}
			on:cancel={() => {
				showDeleteModal = false;
			}}
			on:ok={() => {
				handleDeleteRole(roleToBeDeleted._id);
			}}
		>
			<svelte:fragment slot="title">Confirmation</svelte:fragment>
			<span slot="content"
				>Do you really want to delete {roleToBeDeleted.name}? You can not reverse this action.
			</span>
		</DangerZoneConfirmDeleteAction>
	</Modal>
{/if}

<style>
	.header {
		margin-top: 5em;
		margin-bottom: 2em;
	}
</style>
