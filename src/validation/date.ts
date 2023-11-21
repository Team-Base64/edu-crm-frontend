import { getNextYearDate } from '../utils/common/dateRepresentation.ts';

export const isEmptyDateValidation = (date: Date | null) =>
    date ? '' : 'Поле должно быть заполнено';

export const isActualDate = (date: Date | null) => {
    const isEmpty = isEmptyDateValidation(date);
    if (isEmpty) {
        return isEmpty;
    } else {
        return isDateNotTooOld(date as Date) ? '' : 'Выберете актуальную дату';
    }
};

export const isActualTime = (date: Date | null) => {
    console.log(date);
    const isEmpty = isEmptyDateValidation(date);
    if (isEmpty) {
        return isEmpty;
    } else {
        console.log(isTimeTooOld(date as Date));
        return isTimeTooOld(date as Date) ? 'Выберете актуальное время' : '';
    }
};

const isDateNotTooOld = (date: Date) => {
    const actualDate = new Date();
    actualDate.setHours(0, 0, 0, 0);
    // console.log(actualDate, date, date >= actualDate);
    return date >= actualDate && date <= getNextYearDate();
};

const isTimeTooOld = (date: Date) => {
    // const actualDate = new Date();
    // setZeroDate(actualDate);
    // setZeroDate(date);
    // return date >= actualDate && date <= getNextYearDate();
    console.log(date);
    return false;
};

export const isFirstArgLessDate = (
    initialDate: Date,
    dateToCompareWith: Date,
) => {
    return initialDate <= dateToCompareWith;
};

export const isFirstArgLessOrEqualDate = (
    initialDate: Date,
    dateToCompareWith: Date,
) => initialDate < dateToCompareWith;

export const getIsFirstArgLessDateValidation = (
    initialDate: Date | null,
    dateToCompareWith: Date | null,
    errorText: string,
) =>
    getDateValidation(
        initialDate,
        dateToCompareWith,
        errorText,
        isFirstArgLessDate,
    );

export const getIsFirstArgLessOrEqualDateValidation = (
    initialDate: Date | null,
    dateToCompareWith: Date | null,
    errorText: string,
) =>
    getDateValidation(
        initialDate,
        dateToCompareWith,
        errorText,
        isFirstArgLessOrEqualDate,
    );
export const getDateValidation = (
    initialDate: Date | null,
    dateToCompareWith: Date | null,
    errorText: string,
    checkFunc: (initialDate: Date, dateToCompareWith: Date) => boolean,
) => {
    const isInitialEmpty = isActualDate(initialDate);
    const isToCompareEmpty = isActualDate(dateToCompareWith);

    if (isInitialEmpty) {
        return isInitialEmpty;
    }

    if (isToCompareEmpty) {
        return '';
    }

    return checkFunc(initialDate as Date, dateToCompareWith as Date)
        ? errorText
        : '';
};
