import { getAllPeopleByItem, getAllPersonEvents } from '../../api/people';

export const getAllSelectablePeople = async (itemId) => {
	const res = await getAllPeopleByItem(itemId);
	const people = [];

	res.map((person) => {
		if (person.active) {
			people.push({ value: person._id, label: person.name });
		}
	});

	return people;
};

export const getAllEventsForPerson = async (personId) => {
	return await getAllPersonEvents(personId);
};
