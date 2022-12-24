import { afterEach, beforeEach, describe, expect, it, trigger, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';

import RoleBadge from './RoleBadge.svelte';

const testRole = {
	_id: '636b4baa01f350e3c2177978',
	name: 'Moderator',
	description: 'Should talk when everyone else is quiet. ',
	icon: 'faMicrophone'
};

describe('Test RoleBadge.svelte', async () => {
	it('Renders badge without delete button correctly', async () => {
		render(RoleBadge, { role: testRole });
		expect(screen.getByTestId('RoleBadge')).toBeInTheDocument();
		expect(screen.getByText('Moderator')).toBeInTheDocument();
		expect(screen.queryByTestId('DeleteIcon')).not.toBeInTheDocument();
	});

	it('Renders badge delete button correctly', async () => {
		render(RoleBadge, { role: testRole, deleteButton: true });
		expect(screen.getByTestId('RoleBadge')).toBeInTheDocument();
		expect(screen.getByText('Moderator')).toBeInTheDocument();
		expect(screen.queryByTestId('DeleteIcon')).toBeInTheDocument();
	});
});
