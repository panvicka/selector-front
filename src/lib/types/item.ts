import type { Group } from './group';
import type { Role } from './role';
import type { dbInfo } from './utils';

export interface Item extends dbInfo {
	name: string;
	roles: Array<Role>;
	description: string;
	longDescription: string;
	isLongerThenOneDay: boolean;
	usualLenght: number | null;
	hasAutomaticStartDate: boolean;
	// item can only be in one group, it is still an array because of legacy i guess
	groupes: Array<Group>;
}

export interface ItemRequestType extends Omit<Item, 'roles' | 'groupes' | '_id'> {
	_id?: string;
	roles?: Array<string>;
	groupes?: Array<string>;
}

export interface RandomOptions {
	daysSince: number;
	lessThenAverage: boolean;
	notAlreadyPlanned: boolean;
	hasDoneTheRole: boolean | undefined;
	numberOfResults: number;
	excludePeople: Array<string>;
}

export interface RandomResult {
	attended: number;
	dates: Array<string>;
	latestDate: string;
	name: string;
	_id: string;
}

export interface RandomResultResponse {
	possibleMatches: Array<{
		attended: number;
		dates: Array<string>;
		latestDate: string;
		name: string;
		_id: string;
	}>;
	averageAttendance: number;
}
