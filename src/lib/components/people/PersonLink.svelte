<script>
	// @ts-nocheck

	export let person;
	export let type;
</script>

<a
	class={`link link-${type}`}
	href={`/people/${person._id}`}>{person.name}</a
>

<style>
</style>
