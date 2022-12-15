import type { Group } from './group';
import type { Role } from './role';

export interface Item {
	_id: string;
	name: string;
	roles?: Array<Role>;
	description: string;
	isLongerThenOneDay: boolean;
	groupes?: Array<Group>;
}
