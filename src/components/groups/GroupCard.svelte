<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Group } from 'types/group';
	import Card from '../general/Card.svelte';

	export let group: Group;
	const dispatch = createEventDispatcher<{ delete: Group; edit: Group }>();
</script>

<Card
	width={400}
	height={500}
	on:deleteTrigger={() => {
		dispatch('delete', {
			...group
		});
	}}
	on:settingsTrigger={() => {
		dispatch('edit', {
			...group
		});
	}}
>
	<svelte:fragment slot="title"><span>{group.name}</span></svelte:fragment>

	<div slot="content">
		<div>{group.description}</div>
		<br />
		<h3>Items tagged with this groups:</h3>
		<ul>
			{#each group.items as item}
				<div>
					<li><a class="link link-primary" href={`items/${item._id}`}>{item.name}</a></li>
				</div>
			{/each}
		</ul>
	</div>
</Card>

<style>
</style>
