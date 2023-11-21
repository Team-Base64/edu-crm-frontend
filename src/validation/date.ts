import { getNextYearDate } from '../utils/common/dateRepresentation.ts';

export const isEmptyDateValidation = (date: Date | null) =>
    isNotEmptyDate(date) ? '' : 'Выберете время';

export const isNotEmptyDate = (date: Date | null) => {
    if (date) {
        console.log(
            date,
            date >= new Date(),
            new Date(),
            date <= getNextYearDate(),
            getNextYearDate(),
        );
    }
    return !!date && date >= new Date() && date <= getNextYearDate();
};

export const isFirstArgLessDate = (
    initialDate: Date,
    dateToCompareWith: Date,
) => initialDate <= dateToCompareWith;

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
    const isInitialEmpty = isEmptyDateValidation(initialDate);
    const isToCompareEmpty = isEmptyDateValidation(dateToCompareWith);

    if (!isInitialEmpty) {
        return isInitialEmpty;
    }

    if (!isToCompareEmpty) {
        return '';
    }

    return checkFunc(initialDate as Date, dateToCompareWith as Date)
        ? errorText
        : '';
};
