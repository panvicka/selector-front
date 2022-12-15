import type { Group } from './group';
import type { Item } from './item';

export interface Person {
	_id: string;
	name: string;
	active: boolean;
	itemsCanBeAttended?: Array<Item>;
	groupes?: Array<Group>;
}
