<script>
	// @ts-nocheck

	export let person;
</script>

<a href={`${import.meta.env.VITE_ADMIN_PAGE_BASE_URL}/people/${person._id}`}>{person.name}</a>

<style>
</style>
