import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';

import RoleBadge from './RoleBadge.svelte';

describe('Test RoleBadge.svelte', async () => {
	it('Renders correctly', async () => {
		const testRole = {
			_id: '636b4baa01f350e3c2177978',
			name: 'Moderator',
			description: 'Should talk when everyone else is quiet. ',
			icon: 'faMicrophone'
		};
		render(RoleBadge, { role: testRole });
 		expect(screen.getByText('Moderator')).toBeInTheDocument();
	});
});
