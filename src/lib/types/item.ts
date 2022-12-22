import type { Group } from './group';
import type { Role } from './role';
import type { dbInfo } from './utils';

export interface Item extends dbInfo {
	name: string;
	roles?: Array<Role> | Array<string>;
	description: string;
	isLongerThenOneDay: boolean;
	groupes?: Array<Group> | Array<string>;
}
