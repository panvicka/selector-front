<script lang="ts">
	export let inputLabel: string;
	export let inputPlaceholder: string = 'Type here';
	export let textValue: string = '';

	const classesFromTheParent = $$props.class;
</script>

<label class="label" for={`${inputLabel}-ID`}>
	<span class="label-text">{inputLabel}</span>
</label>

<textarea
	class={`textarea w-full max-w-xs focus:ring-0 focus:ring-offset-0 focus:border-none ${classesFromTheParent}`}
	placeholder={inputPlaceholder}
	id={`${inputLabel}-ID`}
	bind:value={textValue}
/>

<style>
</style>
