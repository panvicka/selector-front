import type { Item } from './item';
import type { Participant } from './participant';

export interface Event {
	_id: string;
	item: Item;
	startDate: Date;
	endDate?: Date;
	participants: Array<Participant>;
}
