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

export const getLastEvent = (events) => {
	let resultEvent = events[0];
	let today = new Date();

	events.forEach((event) => {
		const start = new Date(event.startDate);
		if (!event.endDate) {
			if (dayjs(start).isBefore(today, 'day')) {
				if (!dayjs(resultEvent.startDate).isAfter(start, 'day')) {
					resultEvent = event;
				}
			}
		} else {
			const end = new Date(event.endDate);
			if (dayjs(end).isBefore(today, 'day')) {
				if (!dayjs(resultEvent.endDate).isAfter(end, 'day')) {
					resultEvent = event;
				}
			}
		}
	});

	return resultEvent;
};

export const getActiveEvents = (events) => {
	const results = [];
	const today = new Date();

	events.forEach((event) => {
		const start = new Date(event.startDate);

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

export const getRemainingTime = (countDownDate) => {
	const now = new Date();
	const timeleft = countDownDate - now;
	console.log('countdowndate');
	console.log(countDownDate);
	console.log('now');
	console.log(now);
	const remaining = {};

	remaining.days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
	remaining.hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	remaining.minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
	remaining.seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
	console.log(remaining);
	return remaining;
};
