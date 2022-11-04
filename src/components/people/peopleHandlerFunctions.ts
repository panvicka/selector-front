import { getAllPeopleByItem } from "../../api/people";

export const getAllSelectablePeople = async (itemId) => {
    const res = await getAllPeopleByItem(itemId);
    return res.map((person) => {
        return {
            value: person._id,
            label: person.name
        };
    });
};