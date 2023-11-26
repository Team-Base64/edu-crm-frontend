import {
    dateInput,
    getNextYearDate,
    setTime,
    setZeroTime,
} from '../utils/common/dateRepresentation.ts';

const dateErrorMessages = {
    actualDate: 'Выберете актуальную дату',
    actualTime: 'Выберете актуальное время',
    emptyTime: 'Выберете время',
    emptyDate: 'Выберете дату',
    moreOrEqualEndDate: 'Дата окончания должна быть не позже даты начала',
    moreOrEqualEndTime: 'Время окончания должно быть не позже времени начала',
};

export type DateErrorMessages = keyof typeof dateErrorMessages;
export type DateAndTimeJoin = {
    date: Date;
    time: dateInput;
};

export const getReadyForTimeValidation = (dates: DateAndTimeJoin[]) => {
    return dates.map(({ date, time }) => setTime(date ?? new Date(), time));
};

export const getReadyForDateValidation = (dates: dateInput[]) => {
    dates.forEach((date) => (date instanceof Date ? setZeroTime(date) : date));
    return dates;
};

const isDateTooOld = (errorType: DateErrorMessages, date: Date) => {
    const actualDate = new Date();
    if (errorType.toLowerCase().includes('date')) {
        getReadyForDateValidation([actualDate]);
    }

    return (
        date.getTime() >= actualDate.getTime() &&
        date.getTime() <= getNextYearDate().getTime()
    );
};
export const isEmptyDateValidation = (
    errorType: DateErrorMessages,
    date: dateInput,
) => (date ? '' : dateErrorMessages[errorType]);

export const isActualDate = (errorType: DateErrorMessages, date: dateInput) => {
    const isEmpty = isEmptyDateValidation(errorType, date);
    if (isEmpty || !(date instanceof Date)) {
        return isEmpty;
    } else {
        return isDateTooOld(errorType, date)
            ? ''
            : dateErrorMessages[errorType];
    }
};

export const isMoreOrEqualDate = (
    dateToCheck: Date,
    dateToCompareWith: Date,
) => {
    // getReadyToValidate(errorType, [dateToCheck, dateToCompareWith]);
    return dateToCheck.getTime() >= dateToCompareWith.getTime();
};

export function getDateValidation(
    errorType: DateErrorMessages,
    checkFunc: (initialDate: Date, dateToCompareWith: Date) => boolean,
    dateToCheck: dateInput,
    dateToCompareWith: dateInput,
) {
    const isInitialEmpty = isActualDate(errorType, dateToCheck);
    const isToCompareEmpty = isActualDate(errorType, dateToCompareWith);

    if (isInitialEmpty || !(dateToCheck instanceof Date)) {
        return isInitialEmpty;
    }

    if (isToCompareEmpty || !(dateToCompareWith instanceof Date)) {
        return '';
    }
    return checkFunc(dateToCheck, dateToCompareWith)
        ? ''
        : dateErrorMessages[errorType];
}
