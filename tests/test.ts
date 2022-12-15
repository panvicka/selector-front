import { expect, test, type Page } from '@playwright/test';
import * as dotenv from 'dotenv';
import { mockedItems } from './mocks/mockedItems.ts';

dotenv.config();

console.log(process.env.VITE_ADMIN_LOGIN_NAME);
let page: Page;

const itemsRoute = (page: Page) => {
	return page.route('http://localhost:4173/api/items', (route) => {
		route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify(mockedItems)
		});
	});
};

test.beforeEach(async () => {
	await itemsRoute(page);
});

test.beforeAll(async ({ browser }) => {
	const context = await browser.newContext({
		httpCredentials: {
			username: process.env.VITE_ADMIN_LOGIN_NAME || '',
			password: process.env.VITE_ADMIN_LOGIN_PASS || ''
		}
	});
	page = await context.newPage();

	// Go to the starting url before each test.
	await page.goto('http://127.0.0.1:4173');
});

test('item page renders items', async () => {
	await page.goto('/');

	const divs = page.getByTestId('ItemCard');
	console.log(divs);
	// await page.$$eval('data-testid=ItemCard', (divs) => (divs.length = 5));
	await expect(divs).toHaveCount(3);
	await expect(divs.nth(1).getByText('h2')).toContain('Telling Secrets');

	// console.log('images: ', await divs.count());
	// expect(divs.count().toBe(3));
	// console.log(divs);
	// expect(await page.textContent('h2')).toBe('ksb at guardian unicef');
});

test('role page has expected h1', async () => {
	await page.goto('/roles');
	expect(await page.textContent('h1')).toBe('Roles');
});
