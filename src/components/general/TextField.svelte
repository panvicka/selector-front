<script>
	export let inputLabel;
	export let inputPlaceholder;
	export let textValue;
</script>

<label class="label" for={`${inputLabel}-ID`}>
	<span class="label-text">{inputLabel}</span>
</label>

<textarea
	class="textarea textarea-accent w-full max-w-xs focus:ring-0 focus:ring-offset-0 focus:border-none"
	placeholder={inputPlaceholder || 'Type here'}
	id={`${inputLabel}-ID`}
	bind:value={textValue}
/>

<style>
</style>
