<script lang="ts">
	import Load from 'components/general/Load.svelte';
	import type { GroupWithItemDetails } from '$lib/types/group';
	import GroupDetail from 'components/groups/GroupDetail.svelte';

	export let data: GroupWithItemDetails;
</script>

<GroupDetail groupWithItems={data} />
