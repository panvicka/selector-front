<script>
    // @ts-nocheck
 
        import * as Icons  from '@fortawesome/free-solid-svg-icons';
	    import Fa from 'svelte-fa';

        import { createEventDispatcher } from 'svelte';
        import Card from '../general/Card.svelte';
    
        export let role;
    
        const dispatch = createEventDispatcher();
    </script>
    
    <Card width={400} height={200}
        on:deleteTrigger={() => {
            dispatch('delete', {
                role
            });
        }}
        on:settingsTrigger={() => {
            console.log("edit", role._id) 
            dispatch('edit', {
                role
            });
        }}
    >
       <svelte:fragment slot="title"><Fa size="lg" class="role-icon" icon={Icons[role.icon]} /> <span>{role.name}</span></svelte:fragment>
    
        <div slot="content">
            <div>{role.description}</div>
            <div>{role.icon}</div>
        </div>
    </Card>
    
    <style> 
 
    </style>