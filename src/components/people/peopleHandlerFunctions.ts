
import { LocalApiPeople } from '$lib/apiClient/people';

export const getAllSelectablePeople = async (itemId) => {
	console.log("get all selectable people")
	const res = await LocalApiPeople.getAllPeopleByItem(itemId);
	const people = [];

	res.map((person) => {
		if (person.active) {
			people.push({ value: person._id, label: person.name });
		}
	});

	return people;
};

export const getAllEventsForPerson = async (personId) => {
	return await LocalApiPeople.getAllPersonEvents(personId);
};
