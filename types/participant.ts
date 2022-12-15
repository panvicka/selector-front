import { Person } from './person';
import { Role } from './role';

export interface Participant {
	role: Role;
	person: Person;
}
