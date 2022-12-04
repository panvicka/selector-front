<script>
	// @ts-nocheck

	import * as Icons from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	import { createEventDispatcher } from 'svelte';

	export let role;
	export let type = 'ghost';
</script>

<div class="tooltip tooltip-info" data-tip={role.description}>
 	<div class={`badge badge-${type}`}>
		<Fa size="s" class="role-icon" icon={Icons[role.icon]} />{role.name}
	</div>
</div>

<style>
</style>
