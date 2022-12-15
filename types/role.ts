import { Item } from './item';

export interface Role {
	name: string;
	description: string;
	icon: string;
	isLongerThenOneDay: boolean;
	itemsUsingRole?: Array<Item>;
}
