<script>
	import { onMount } from 'svelte';
	import { createRole, getAllRoles, updateRole } from './../../api/roles';
	import Modal from '../../components/general/Modal.svelte';
	import RoleForm from '../../components/forms/roleForm.svelte';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import RoleCard from '../../components/roles/RoleCard.svelte';

	let roles = [];

	onMount(async () => {
		await fetchAllRoles();
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

	const handleEditRole = async (event) => {
		const res = await updateRole(roleToBeEdited._id, event.detail);
		fetchAllRoles();
		letShowEditModal = false;
	};

	const triggeredDeleteRole = async (event) => {
		console.log(event);
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

<style>
	.header {
		margin-top: 5em;
		margin-bottom: 2em;
	}
</style>
