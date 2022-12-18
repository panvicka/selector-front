import type { Group } from './group';
import type { Item } from './item';

export interface Person {
	_id: string;
	name: string;
	active: boolean;
	itemsCanBeAttended?: Array<Item> | Array<string>;
	groupes?: Array<Group>;
}
