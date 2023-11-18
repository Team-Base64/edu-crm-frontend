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
    `${date.getUTCHours()}:${date.getUTCMinutes()}`;

export const getNextYearDate = () =>
    new Date(new Date().setFullYear(new Date().getFullYear() + 1));

export const getInputDateRepresentation = (date: Date) =>
    date.toLocaleDateString('en-CA');
