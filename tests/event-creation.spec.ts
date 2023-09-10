import { expect, test, type Page } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const formatDate = (date: Date, formatString: string) => {
	return Object.entries({
		YYYY: date.getFullYear(),
		YY: date.getFullYear().toString().substring(2),
		yyyy: date.getFullYear(),
		yy: date.getFullYear().toString().substring(2),
		MMMM: date.toLocaleString('default', { month: 'long' }),
		MMM: date.toLocaleString('default', { month: 'short' }),
		MM: (date.getMonth() + 1).toString().padStart(2, '0'),
		M: date.getMonth() + 1,
		DDDD: date.toLocaleDateString('default', { weekday: 'long' }),
		DDD: date.toLocaleDateString('default', { weekday: 'short' }),
		DD: date.getDate().toString().padStart(2, '0'),
		D: date.getDate(),
		dddd: date.toLocaleDateString('default', { weekday: 'long' }),
		ddd: date.toLocaleDateString('default', { weekday: 'short' }),
		dd: date.getDate().toString().padStart(2, '0'),
		d: date.getDate(),
		HH: date.getHours().toString().padStart(2, '0'), // military
		H: date.getHours().toString(), // military
		hh: (date.getHours() % 12).toString().padStart(2, '0'),
		h: (date.getHours() % 12).toString(),
		mm: date.getMinutes().toString().padStart(2, '0'),
		m: date.getMinutes(),
		SS: date.getSeconds().toString().padStart(2, '0'),
		S: date.getSeconds(),
		ss: date.getSeconds().toString().padStart(2, '0'),
		s: date.getSeconds(),
		TTT: date.getMilliseconds().toString().padStart(3, '0'),
		ttt: date.getMilliseconds().toString().padStart(3, '0'),
		AMPM: date.getHours() < 13 ? 'AM' : 'PM',
		ampm: date.getHours() < 13 ? 'am' : 'pm'
	}).reduce((acc, entry) => {
		return acc.replace(entry[0], entry[1].toString());
	}, formatString);
};

let page: Page;

test.beforeAll(async ({ browser }) => {
	const context = await browser.newContext({
		httpCredentials: {
			username: process.env.VITE_ADMIN_LOGIN_NAME || '',
			password: process.env.VITE_ADMIN_LOGIN_PASS || ''
		}
	});
	page = await context.newPage();

	// Go to the starting url before each test.
	await page.goto('http://localhost:5173');
});

test('Can create a new currently running event', async () => {
	const endDate = new Date(Date.now() + 2000 * 86400);
	const endDateString = formatDate(endDate, 'YYYY-MM-DD');
	const divs = page.getByTestId('ItemCard');
	await expect(divs).toHaveCount(6);
	await page.getByRole('link', { name: 'Regular alliance attack on Darth Vader' }).click();

	const eventCardsBefore = page.getByTestId('EventCard');

	await page.getByRole('button', { name: 'Add new event' }).click();
	await page.getByLabel('End date*').fill(endDateString);

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

	await page.getByText('Save').click();

	await expect(page.getByText('Detail of Regular alliance attack on Darth Vader')).toBeVisible();
	const eventCardsAfter = page.getByTestId('EventCard');
	await expect(eventCardsAfter).toHaveCount((await eventCardsBefore.count()) + 1);

	const createdCard = page.getByTestId('EventCard').nth(1);
	expect(createdCard.getByText('from10.09.2023').nth(1)).toBeVisible;
	expect(createdCard.getByText('to12.09.2023').nth(1)).toBeVisible;
	expect(createdCard.getByText('Main Assasin Ackbar')).toBeVisible;
	expect(createdCard.getByText('Support Assasin Han Solo')).toBeVisible;
	expect(createdCard.getByText('Support Chewbacca')).toBeVisible;
});
