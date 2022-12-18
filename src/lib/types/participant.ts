import type { Person } from './person';
import type { Role } from './role';

export interface Participant {
	role: Role | string;
	person: Person | string;
}
