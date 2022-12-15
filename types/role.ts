import type { Item } from './item';

export interface Role {
	_id: string;
	name: string;
	description: string;
	icon: string;
	isLongerThenOneDay: boolean;
	itemsUsingRole?: Array<Item>;
}
