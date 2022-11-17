import dayjs from 'dayjs';

export function formatDate(date) {
	let d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
}

export const getEventsWithFutureDates = (events) => {
	let results = [];
	let today = new Date();

	events.forEach((event) => {
		if (new Date(event.startDate) > today) {
			results.push(event);
		}
	});

	return results;
};

export const getActiveEvents = (events) => {
	const results = [];
	const today = new Date();

	events.forEach((event) => {
		const start = new Date(event.startDate);
		console.log({ start });
		console.log({ today });
		if (event.startDate && event.endDate) {
			const end = new Date(event.endDate);
			if (start < today && today < end) {
				results.push(event);
			}
		} else {
			if (dayjs(start).isSame(today, 'day')) {
				results.push(event);
			}
		}
	});

	return results;
};
