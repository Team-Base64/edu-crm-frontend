import { useState } from 'react';
import {
    DateErrorMessages,
    getDateValidation,
    isActualDate,
    isMoreOrEqualDate,
} from '../../validation/date.ts';
import { dateInput } from '@components/CalendarEventForm/CalendarEventForm.tsx';

export const useActualDateValidation = (errorType: DateErrorMessages) => {
    const [dateError, setDateError] = useState<string>('');
    const checkActual = isActualDate.bind(this, errorType);
    return {
        errorText: dateError,
        setDateError: (date: dateInput) => setDateError(checkActual(date)),
    };
};

export const useIsMoreOrEqualDateValidation = (
    errorType: DateErrorMessages,
) => {
    const [dateError, setDateError] = useState<string>('');

    const checkIsMoreOrEqual = getDateValidation.bind(
        this,
        errorType,
        isMoreOrEqualDate.bind(this, errorType),
    );
    return {
        errorText: dateError,
        setDateError: (dateToCheck: dateInput, dateToCompareWith: dateInput) =>
            setDateError(checkIsMoreOrEqual(dateToCheck, dateToCompareWith)),
    };
};
