import { afterEach, beforeEach, describe, expect, it, trigger, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';

import ItemForm from './ItemForm.svelte';
import { mockedGroups } from 'tests/mocks/mockedGroups.js';
import { mockedRoles } from 'tests/mocks/mockedRoles.js';
import userEvent from '@testing-library/user-event';

describe('Test ItemForm.svelte', async () => {
	it('Renders empty form correctly and sends collected data', async () => {
		const { component } = render(ItemForm, {
			props: { title: 'Create new item', allGroupes: mockedGroups, allRoles: mockedRoles }
		});
		const user = userEvent.setup();
		let calledWith = {};

		const nameInput = screen.getByRole('textbox', { name: 'Name' });
		await user.type(nameInput, 'Test Item');

		const descriptionInput = screen.getByRole('textbox', { name: 'Description' });
		await user.type(descriptionInput, 'Test Description');

		const intervalToggle = screen.getByRole('checkbox', { name: 'Interval tracking?' });
		intervalToggle.click();

		expect(screen.getByRole('radio', { name: 'KSB' })).toBeInTheDocument();
		expect(screen.getByRole('radio', { name: 'Bitgrip' })).toBeInTheDocument();

		const dropdown = document.getElementById('dropdown');
		console.log(dropdown);
		dropdown?.click();
		// await expect(screen.getByText('Moderator')).toBeInTheDocument();

		expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
		expect(document.getElementById('dropdown')).toBeInTheDocument();

		component.$on('submit', (e) => {
			calledWith = e.detail;
		});

		screen.getByRole('button', { name: 'Save' }).click();

		expect(calledWith).toMatchObject({
			_id: '',
			isLongerThenOneDay: true,
			description: 'Test Description',
			name: 'Test Item',
			groupes: [],
			roles: []
		});

		// render(RoleBadge, { role: testRole });
		// expect(screen.getByTestId('RoleBadge')).toBeInTheDocument();
		// expect(screen.getByText('Moderator')).toBeInTheDocument();
		// expect(screen.queryByTestId('DeleteIcon')).not.toBeInTheDocument();

		// const { getByTestId, component } = render(ItemForm, {
		//     props: { id: 'khjb23' },
		// });

		// const link = getByTestId('khjb23');

		// component.$on('navigation', e => {
		//     console.log(e.detail); // Dispatched value
		// });
	});
});
