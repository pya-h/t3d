import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

const objectify = (date) => {
    return new DateObject({
		date: new Date(date),
		calendar: gregorian,
		locale: gregorian_en,
	});
}
export const toHijri = (date) => {
	return [
		objectify(date).format("dddd DD MMMM YYYY"),
		objectify(date).format("hh:mm"),
	];
};

export const toTimeShort = (date) => {
	return objectify(date).format("hh:mm");
};
