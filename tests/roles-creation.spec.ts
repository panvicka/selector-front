import { expect, test, type Page } from '@playwright/test';
import * as dotenv from 'dotenv';
import { getApiContext, getAuthBasePageContext } from './helpers';

dotenv.config();

const getIdsWithE2ETestIncluded = (data: any) => {
	const matchingIds = [];

	for (const item of data) {
		if (item.name.includes('E2E test')) {
			matchingIds.push(item._id);
		}
	}

	return matchingIds;
};

let page: Page;

export const createRoleWithSingleParticipant = async () => {
	const requestContext = await getApiContext();
	const response = await requestContext.post('/api/roles', {
		data: {
			_id: '',
			name: 'E2E test role',
			description: 'E2E test role description with single participant',
			canHaveMultipleParticipants: false,
			icon: 'faPuzzlePiece'
		}
	});
	expect(response.ok()).toBeTruthy();
};

test.beforeEach(async ({ browser }) => {
	const context = await getAuthBasePageContext(browser);
	page = await context.newPage();
	// Go to the starting url before each test.
	await page.goto('http://localhost:5173/roles');
});

test.afterEach(async () => {
	const requestContext = await getApiContext();
	const response = await requestContext.get('/api/roles');
	const idsToDelete = getIdsWithE2ETestIncluded(await response.json());

	idsToDelete.forEach(async (id) => {
		const response = await requestContext.delete(`/api/roles/${id}`);
		expect(response.ok()).toBeTruthy();
	});
});

test('Should create a new role with one participant', async () => {
	await page.getByRole('heading', { name: 'Roles' }).isVisible();
	await page.getByRole('button', { name: 'Add Role' }).click();
	await page.getByRole('heading', { name: 'Create new role' }).isVisible();
	// Try to save without filling in name and description
	await page.getByRole('button', { name: 'Save' }).click();
	await page.getByRole('heading', { name: 'Create new role' }).isVisible();
	await page.getByPlaceholder('role name').fill('E2E test role with one participant');

	// Try to save without filling in description
	await page.getByRole('button', { name: 'Save' }).click();
	await page.getByRole('heading', { name: 'Create new role' }).isVisible();
	await page
		.getByPlaceholder('role description')
		.fill('E2E test role with one participant description');

	await page.locator('#dropdown').click();
	await page.getByText('biohazard').click();

	await page.getByRole('button', { name: 'Save' }).click();

	await page.getByRole('heading', { name: 'Create new role' }).isHidden();
	await page.getByRole('heading', { name: 'Roles' }).isVisible();

	const createdCard = page
		.getByTestId('RoleCard')
		.filter({ hasText: 'E2E test role with one participant' });
	createdCard.isVisible();

	const participantIcons = createdCard.locator('#icon-faMale');
	expect(participantIcons).toHaveCount(1);

	await createdCard.getByTestId('icon-faBiohazard').isVisible();
	await createdCard.getByText('E2E test role description with single participant').isVisible();
});

test('Should create a new role with multiple participant', async () => {
	await page.getByRole('heading', { name: 'Roles' }).isVisible();
	await page.getByRole('button', { name: 'Add Role' }).click();
	await page.getByRole('heading', { name: 'Create new role' }).isVisible();

	await page.getByPlaceholder('role name').fill('E2E test role with multiple participants');
	await page
		.getByPlaceholder('role description')
		.fill('E2E test role with multiple participant description');

	await page.locator('#dropdown').click();
	await page.getByText('sack-dollar').click();

	await page.getByLabel('Can have multiple participants?').check();

	await page.getByRole('button', { name: 'Save' }).click();

	await page.getByRole('heading', { name: 'Create new role' }).isHidden();
	await page.getByRole('heading', { name: 'Roles' }).isVisible();

	await page
		.getByTestId('RoleCard')
		.filter({ hasText: 'E2E test role with multiple participants' })
		.isVisible();

	const createdCard = page
		.getByTestId('RoleCard')
		.filter({ hasText: 'E2E test role with multiple participants' });

	await createdCard.locator('#icon-faMale').nth(0).isVisible();
	await createdCard.locator('#icon-faMale').nth(1).isVisible();
	await createdCard.locator('#icon-faMale').nth(5).isVisible();

	await createdCard.getByTestId('icon-faSackDollar').isVisible();
	await createdCard.getByText('E2E test role description with multiple participants').isVisible();
});
