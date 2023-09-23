import { request, type Browser } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export const getAuthBasePageContext = async (browser: Browser) => {
	const context = await browser.newContext({
		httpCredentials: {
			username: process.env.VITE_ADMIN_LOGIN_NAME || '',
			password: process.env.VITE_ADMIN_LOGIN_PASS || ''
		}
	});
	return context;
};

export const getApiContext = async () => {
	const auth = btoa(`${process.env.VITE_ADMIN_LOGIN_NAME}:${process.env.VITE_ADMIN_LOGIN_PASS}`);

	const requestContext = await request.newContext({
		baseURL: 'http://localhost:5173',
		extraHTTPHeaders: {
			Authorization: `Basic ${auth}`
		}
	});

	return requestContext;
};

export const formatDate = (date: Date, formatString: string) => {
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
