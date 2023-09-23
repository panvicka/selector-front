import { expect, test, type Page } from '@playwright/test';
import * as dotenv from 'dotenv';
import { formatDate, getApiContext, getAuthBasePageContext } from './helpers';

dotenv.config();

let page: Page;

test.beforeEach(async ({ browser }) => {
	const context = await getAuthBasePageContext(browser);
	page = await context.newPage();
	// Go to the starting url before each test.
	await page.goto('http://localhost:5173');

	const requestContext = await getApiContext();

	const response = await requestContext.get('/api/items');
	console.log(await response.text());
	// expect(response.ok()).toBeTruthy();
});

test('Can create a new currently running event', async () => {
	const today = formatDate(new Date(), 'DD.MM.YYYY');
	const endDate = new Date(Date.now() + 2000 * 86400);

	const divs = page.getByTestId('ItemCard');
	await expect(divs).toHaveCount(6);
	await page.getByRole('link', { name: 'Regular alliance attack on Darth Vader' }).click();

	const runningEventCardsBefore = page.getByTestId('RunningEvents').getByTestId('EventCard');

	await page.getByRole('button', { name: 'Add new event' }).click();

	// try saving without filling in end date
	await page.getByText('Save').click();
	await expect(page.getByLabel('End date*')).toBeVisible();

	await page.getByLabel('End date*').fill(formatDate(endDate, 'YYYY-MM-DD'));

	await page.getByPlaceholder('Select main assasin').click();
	await page.getByPlaceholder('Select main assasin').fill('a');
	await page.locator('#eventForm').getByText('Ackbar', { exact: true }).click();

	await page.getByPlaceholder('Select support assasin').click();
	await page.getByPlaceholder('Select support assasin').fill('a');
	await page.locator('#eventForm').getByText('Han Solo', { exact: true }).click();
	await page
		.locator('#eventForm div')
		.filter({
			hasText: 'Support Assasin Option Han Solo, selected. Select is focused, type to refine lis'
		})
		.locator('#dropdown')
		.fill('a');

	await page.locator('#eventForm').getByText('Chewbacca', { exact: true }).click();

	await page
		.locator('#eventForm div')
		.filter({
			hasText: 'Support Assasin Option Han Solo, Chewbacca, selected. Select is focused, type to'
		})
		.locator('#dropdown')
		.fill('a');

	await page.locator('#eventForm').getByText('Ahsoka', { exact: true }).click();

	await page.locator('.multi-item-clear').first().click();
	await page.getByText('Save').click();

	await expect(page.getByText('Detail of Regular alliance attack on Darth Vader')).toBeVisible();

	const runningEventCardsAfter = page.getByTestId('RunningEvents').getByTestId('EventCard');
	await expect(runningEventCardsAfter).toHaveCount((await runningEventCardsBefore.count()) + 1);

	const createdEventCard = page.getByTestId('EventCard').nth(0);

	await expect(createdEventCard.getByTestId('TimeCounter')).toBeVisible();
	await expect(createdEventCard.getByTestId('StartDate')).toHaveText(today);
	await expect(createdEventCard.getByTestId('EndDate')).toHaveText(
		formatDate(endDate, 'DD.MM.YYYY')
	);
	await expect(
		createdEventCard.getByTestId('EventRole').nth(0).getByTestId('RoleBadge')
	).toHaveText('Main Assasin');
	await expect(createdEventCard.getByTestId('EventRole').nth(0).getByRole('link')).toHaveText(
		'Ackbar'
	);

	await expect(
		createdEventCard.getByTestId('EventRole').nth(1).getByTestId('RoleBadge')
	).toHaveText('Support Assasin');
	await expect(createdEventCard.getByTestId('EventRole').nth(1).getByRole('link')).toHaveText(
		'Chewbacca'
	);

	await expect(
		createdEventCard.getByTestId('EventRole').nth(2).getByTestId('RoleBadge')
	).toHaveText('Support Assasin');
	await expect(createdEventCard.getByTestId('EventRole').nth(2).getByRole('link')).toHaveText(
		'Ahsoka'
	);
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
