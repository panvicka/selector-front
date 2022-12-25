<script lang="ts">
	import type { Person } from '$lib/types/person';

	export let person: Person;
	export let type: string;
</script>

<a class={`link link-${type}`} href={`/people/${person._id}`}>{person.name}</a>

<style>
</style>
