import { Item } from './item';
import { Participant } from './participant';

export interface Event {
	item: Item;
	startDate: Date;
	endDate?: Date;
	participants: Array<Participant>;
	isLongerThenOneDay: boolean;
}
