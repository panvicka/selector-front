<script>
	// @ts-nocheck

	export let person;
	export let type;
</script>

<a
	class={`link link-${type}`}
	href={`${import.meta.env.VITE_ADMIN_PAGE_BASE_URL}/people/${person._id}`}>{person.name}</a
>

<style>
</style>
