import type { Item } from './item';

export interface Group {
	_id: string;
	name: string;
	description?: string;
	items?: Array<Item> | [];
}
