<script>
	// @ts-nocheck

	import { createEventDispatcher } from 'svelte';
	import Card from '../general/Card.svelte';

	export let item;

	import * as Icons from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const dispatch = createEventDispatcher();
</script>

<Card
	width={400}
	height={200}
	on:deleteTrigger={() => {
		dispatch('onDelete', {
			item
		});
	}}
	on:settingsTrigger={() => {
		dispatch('onEdit', {
			item
		});
	}}
>
	<a slot="title" href={`items/${item._id}`}>{item.name}</a>

	<div slot="content">
		<p>{item.description}</p>

		<br />

		{#each item.roles || [] as role}
			<div class="tooltip tooltip-info" data-tip={role.description}>
				<div class="badge badge-ghost">
					<Fa size="s" class="role-icon" icon={Icons[role.icon]} />{role.name}
				</div>
			</div>
		{/each}
	</div>
</Card>

<style>
	.badge {
		margin: 0 1em 0 0;
	}
</style>
