<script lang="ts">
	import { onMount } from 'svelte';
	import Loader from 'components/general/Loader.svelte';
	import Error from 'components/general/Error.svelte';

	import type { Group, GroupWithItemDetails } from '$lib/types/group';
	import type { Item } from '$lib/types/item';
	import GroupDetail from 'components/groups/GroupDetail.svelte';

	export let data: GroupWithItemDetails;
	let isLoading = true;

	let allItems: Array<Item> = [];

	let invalidGroup = false;

	// console.log(data);

	onMount(async () => {
		if (data?.group?._id) {
			isLoading = false;
		} else {
			invalidGroup = true;
			isLoading = false;
		}
	});
</script>

{#if isLoading}
	<Loader />
{:else if invalidGroup}
	<Error
		>Uh no. This Group doesnt exist.
		<a class="link" href="/groupes">Check all groupes here.</a>
	</Error>
{:else}
	<GroupDetail groupWithItems={data} />
{/if}
