<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Group } from '$lib/types/group';
	import Card from 'components/general/Card.svelte';
	import Link from 'components/general/Link.svelte';

	export let group: Group;
	const dispatch = createEventDispatcher<{ delete: Group; edit: Group }>();
</script>

<Card
	width={400}
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
	<a slot="title" href={`groups/${group._id}`}>{group.name}</a>

	<div slot="content">
		<div>{group.description}</div>
		<br />
		<h3>Items tagged with this groups:</h3>
		<ul>
			{#each group.items as item}
				<div>
					<li><a class="link link-accent" href={`items/${item._id}`}>{item.name}</a></li>
				</div>
			{/each}
		</ul>
	</div>
</Card>

<style>
</style>
