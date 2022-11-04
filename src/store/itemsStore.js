import { writable } from 'svelte/store';

export const items = writable([]);

const fetchAllItems = async () => {
	const url = 'http://localhost:9090/rotationItems/get';
	const res = await fetch(url);

	const data = await res.json();

	items.set(data.rotationItems);
};

fetchAllItems();
