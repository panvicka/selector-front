<script>
	export let inputLabel;
	export let inputPlaceholder;
	export let textValue;

	export let styleClass = 'textarea-accent';
</script>

<label class="label" for={`${inputLabel}-ID`}>
	<span class="label-text">{inputLabel}</span>
</label>

<textarea
	class="textarea {styleClass} w-full max-w-xs focus:ring-0 focus:ring-offset-0 focus:border-none"
	placeholder={inputPlaceholder || 'Type here'}
	id={`${inputLabel}-ID`}
	bind:value={textValue}
/>

<style>
</style>
