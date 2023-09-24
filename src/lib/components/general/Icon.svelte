<script lang="ts">
	import * as Icons from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let icon = '';
	export let size = 's';
	export let testId = `icon-${icon}`;

	$: classesFromTheParent = $$props.class;

	// Add a type annotation for the Icons object
	let iconsWithIndexSignature: { [key: string]: any } = Icons;
</script>

<!-- TODO fix this typing problem somehow -->
<span class={classesFromTheParent} id="icon-wrapper">
	<Fa {size} id={testId} icon={iconsWithIndexSignature[icon]} />
</span>
