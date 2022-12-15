import { Group } from './group';
import { Item } from './item';

export interface Person {
	name: string;
	active: boolean;
	itemsCanBeAttended?: Array<Item>;
	groupes?: Array<Group>;
}
