<script>
	// @ts-nocheck

	export let item;
	export let type;
</script>

<a class={`link link-${type}`} href={`/items/${item._id}`}
	>{item.name}</a
>

<style>
</style>
