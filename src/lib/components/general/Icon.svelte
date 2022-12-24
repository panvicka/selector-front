<script lang="ts">
	// @ts-nocheck
	import * as Icons from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let icon = '';
	export let size = 's';
	export let testId = 'icon';
</script>

<Fa {size} id={testId} icon={Icons[icon]} />
