import type { Item } from './item';
import type { Participant } from './participant';
import type { dbInfo } from './utils';

export interface Event extends dbInfo {
 	item: Item;
	startDate: string;
	endDate?: string | null;
	participants: Array<Participant> | Array<string>;
}
