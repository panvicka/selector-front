<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Item } from '$lib/types/item';
	import Card from 'components/general/Card.svelte';
	import RoleBadge from 'components/roles/RoleBadge.svelte';
	import { ColorStyle } from '$lib/types/styles';

	export let item: Item;
	let colorStyle: ColorStyle = ColorStyle.primary;
</script>

<div>
	<h2 class="text-{colorStyle} card-title">
		{item.name}
	</h2>
	<div class="flex flex-col w-full lg:flex-row">
		<div class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">content</div>
		<div class="divider lg:divider-horizontal">OR</div>
		<div class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">content</div>
	</div>
</div>
