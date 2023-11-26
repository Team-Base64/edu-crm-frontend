import {
    getNextYearDate,
    setZeroDate,
    setZeroTime,
} from '../utils/common/dateRepresentation.ts';
import { dateInput } from '@components/CalendarEventForm/CalendarEventForm.tsx';

const dateErrorMessages = {
    actualDate: 'Выберете актуальную дату',
    actualTime: 'Выберете актуальное время',
    emptyTime: 'Выберете время',
    emptyDate: 'Выберете дату',
    moreOrEqualEndDate: 'Дата окончания должна быть не позже даты начала',
    moreOrEqualEndTime: 'Время окончания должно быть не позже времени начала',
};

export type DateErrorMessages = keyof typeof dateErrorMessages;

const isDateTooOld = (errorType: DateErrorMessages, date: Date) => {
    const actualDate = new Date();
    getReadyToValidate(errorType, [date, actualDate]);
    return (
        date.getTime() >= actualDate.getTime() &&
        date.getTime() <= getNextYearDate().getTime()
    );
};

const getReadyForTimeValidation = (dates: Date[]) => {
    dates.forEach((date) => setZeroDate(date));
};

const getReadyForDateValidation = (dates: Date[]) => {
    dates.forEach((date) => setZeroTime(date));
};

const getReadyToValidate = (errorType: DateErrorMessages, dates: Date[]) => {
    if (errorType.toLowerCase().includes('time')) {
        getReadyForTimeValidation(dates);
    }
    if (errorType.toLowerCase().includes('date')) {
        getReadyForDateValidation(dates);
    }
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
    errorType: DateErrorMessages,
    dateToCheck: Date,
    dateToCompareWith: Date,
) => {
    getReadyToValidate(errorType, [dateToCheck, dateToCompareWith]);
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
