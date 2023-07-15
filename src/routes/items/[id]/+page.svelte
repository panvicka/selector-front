<script lang="ts">
	import type { Item } from '$lib/types/item';

	export let data: Item;
	import ItemDetail from 'components/items/itemDetail.svelte';
</script>

<ItemDetail item={data} />
