<script>
	// @ts-nocheck

	import * as Icons from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	import { createEventDispatcher } from 'svelte';

	export let role;
</script>

<div class="tooltip tooltip-info" data-tip={role.description}>
	<div class="badge badge-ghost">
		<Fa size="s" class="role-icon" icon={Icons[role.icon]} />{role.name}
	</div>
</div>

<style>
</style>
