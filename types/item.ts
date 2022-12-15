import { Group } from './group';
import { Role } from './role';

export interface Item {
	name: string;
	roles?: Array<Role>;
	description: string;
	isLongerThenOneDay: boolean;
	groupes?: Array<Group>;
}
