export type dateInput = Date | null;

export const getDialogDate = (dateString: string) => {
    const date = new Date(dateString);
    const currentDate = new Date();
    if (isSameDate(date, currentDate)) {
        return 'сегодня';
    }
    currentDate.setDate(date.getDate() - 1);
    if (isSameDate(date, currentDate)) {
        return 'вчера';
    }
    return getUTCDate(date);
};

export const isSameDate = (firstDate: Date, secondDate: Date) =>
    firstDate.toDateString() === secondDate.toDateString();

export const getUTCDate = (date: Date) =>
    date.toLocaleDateString().replace(date.toLocaleTimeString(), '');

export const getUTCTime = (date: Date) =>
    `${addLeadingZero(date.getUTCHours())}:${addLeadingZero(
        date.getUTCMinutes(),
    )}`;

export const getFullUTCTime = (date: Date) =>
    getUTCTime(date) + addLeadingZero(date.getUTCSeconds());

export const getNextYearDate = () =>
    new Date(new Date().setFullYear(new Date().getFullYear() + 1));

export const getInputDateRepresentation = (date: Date | null) =>
    date ? date.toLocaleDateString('en-CA') : undefined;

const addLeadingZero = (stringDate: string | number) =>
    ('0' + stringDate).slice(-2);

export const setZeroDate = (date: Date) => {
    date.setDate(1);
    date.setMonth(1);
    date.setFullYear(1970);
    return date;
};

export const getZeroDate = (date: Date) => {
    const newDate = new Date(date);
    return setZeroDate(newDate);
};

export const setZeroTime = (date: Date) => {
    // const newDate = new Date(date);
    date.setHours(0, 0, 0, 0);
    return date;
};

export const setTime = (date: Date, time: Date | null) => {
    // const newDate = new Date(date);
    if (time instanceof Date) {
        date.setHours(time.getHours());
        date.setMinutes(time.getMinutes());
        date.setSeconds(time.getSeconds());
    }
    return date;
};

export const valueAsDateTimezoneOffset = (date: dateInput) => {
    if (date instanceof Date) {
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    }
    return date;
};

export const valueAsPayloadTimezoneOffset = (date: Date) => {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date;
};
