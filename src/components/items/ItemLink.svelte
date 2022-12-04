<script>
	// @ts-nocheck

	export let item;
	export let type;
</script>

<a class={`link link-${type}`} href={`${import.meta.env.VITE_ADMIN_PAGE_BASE_URL}/items/${item._id}`}
	>{item.name}</a
>

<style>
</style>
