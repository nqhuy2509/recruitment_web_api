import moment from 'moment';

export const diff2Date = (date1, date2) => {
	let year1 = date1.getFullYear();
	let month1 = date1.getMonth();
	let day1 = date1.getDate();

	let year2 = date2.getFullYear();
	let month2 = date2.getMonth();
	let day2 = date2.getDate();

	let momentDate1 = moment([year1, month1, day1]);
	let momentDate2 = moment([year2, month2, day2]);

	return momentDate1.diff(momentDate2, 'days');
};
