import { expect, test, type Page } from '@playwright/test';
import * as dotenv from 'dotenv';
import { formatDate, getApiContext, getAuthBasePageContext } from './helpers';

dotenv.config();

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

	const requestContext = await getApiContext();

	const response = await requestContext.get('/api/items');
	console.log(await response.text());
	// expect(response.ok()).toBeTruthy();
});

test.afterEach(async ({ browser }) => {
	// delete all e2e created role
});

test('Should create a new role', async () => {
	await createRoleWithSingleParticipant();
	await page.getByRole('heading', { name: 'Roles' }).isVisible();
});

// test('Can edit event', async () => {
// 	const newStartDate = new Date(Date.now() + 20000 * 86400);
// 	const newEndDate = new Date(Date.now() + 22000 * 86400);

// 	const divs = page.getByTestId('ItemCard');
// 	await expect(divs).toHaveCount(6);
// 	await page.getByRole('link', { name: 'Regular alliance attack on Darth Vader' }).click();

// 	await page
// 		.getByTestId('FuturuEvents')
// 		.getByTestId('EventCard')
// 		.nth(0)
// 		.getByRole('button', { name: 'edit' })
// 		.click();

// 	await page.getByLabel('Start date*').fill(formatDate(newStartDate, 'YYYY-MM-DD'));
// 	await page.getByLabel('End date*').fill(formatDate(newEndDate, 'YYYY-MM-DD'));

// 	await page
// 		.locator('#eventForm div')
// 		.filter({ hasText: 'Main Assasin Ahsoka' })
// 		.locator('#dropdown')
// 		.click();
// 	await page.locator('#eventForm').getByText('Han Solo', { exact: true }).click();

// 	await page
// 		.locator('#eventForm div')
// 		.filter({ hasText: 'Support Assasin Ackbar' })
// 		.locator('#dropdown')
// 		.click();
// 	await page.locator('#eventForm').getByText('Mace Windu').click();

// 	await page.getByPlaceholder('Optional event note').fill('This is a test note');

// 	await page.getByText('Save').click();

// 	await expect(page.getByText('Detail of Regular alliance attack on Darth Vader')).toBeVisible();

// 	const editedCard = page.getByTestId('FuturuEvents').getByTestId('EventCard').nth(0);

// 	await expect(editedCard.getByTestId('StartDate')).toHaveText('04.10.2023');
// 	// await expect(editedCard.getByTestId('EndDate')).toHaveText(formatDate(newEndDate, 'DD.MM.YYYY'));

// 	// await expect(editedCard.getByTestId('EventRole').nth(0).getByRole('link')).toHaveText('Han Solo');
// 	// await expect(editedCard.getByTestId('EventRole').nth(1).getByRole('link')).toHaveText('Ackbar');
// 	// await expect(editedCard.getByTestId('EventRole').nth(2).getByRole('link')).toHaveText(
// 	// 	'Mace Windu'
// 	// );
// });
