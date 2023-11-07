import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const objectify = (date) => {
    return new DateObject({
        date: new Date(date),
        calendar: persian,
        locale: persian_fa,
    });
}
export const toHijri = (date) => {
    return [
        objectify(date).format("dddd DD MMMM YYYY"),
        objectify(date).format("hh:mm"),
    ];
};

export const toShortHijri = (date) => {
    return [
        objectify(date).format("dddd YYYY/MM/dd"),
        objectify(date).format("hh:mm"),
    ];
};

export const toTimeShort = (date) => {
    return objectify(date).format("hh:mm");
};