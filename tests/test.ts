import { expect, test } from '@playwright/test';

let page;

test.beforeAll(async ({ browser }) => {
	// const browser = await chromium.launch();

	const context = await browser.newContext({
		httpCredentials: {
			username: 'admin',
			password: 'asdi3487dshwi693'
		}
	});
	page = await context.newPage();

	// Go to the starting url before each test.
	await page.goto('http://127.0.0.1:4173');
});

test('item page renders item', async () => {
	await page.route('http://localhost:4173/api/items', (route) =>
		route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: [
				{
					_id: '6352b45fea122e72a9a21c52',
					name: 'ksb at guardian unicef',
					memberTitles: ['main'],
					roles: [
						{
							_id: '635e964da7ecc805a800c337',
							name: 'moderator',
							description: 'Should talk a lot.',
							icon: 'faMicrophone',
							itemsUsingRole: []
						},
						{
							_id: '635f6bed6a27609a87e3d94c',
							name: 'Tasker',
							description: 'Ask a question ',
							icon: 'faPersonCircleQuestion',
							itemsUsingRole: []
						},
						{
							_id: '635f6ca06a27609a87e3d953',
							name: 'Main Releaser',
							description: 'release the code! ',
							icon: 'faRocket',
							itemsUsingRole: []
						}
					],
					description: 'very cool eventa\n',
					groupes: [
						{
							_id: '636fa0892984b72197ffc8e0',
							name: 'KSB',
							description: 'ksb team members '
						}
					]
				}
			]
		})
	);

	await page.goto('/');
	expect(await page.textContent('h2')).toBe('ksb at guardian unicef');
});

test('role page has expected h1', async () => {
	await page.goto('/roles');
	expect(await page.textContent('h1')).toBe('Roles');
});
