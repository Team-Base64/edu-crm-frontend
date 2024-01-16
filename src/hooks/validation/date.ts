import { useState } from 'react';
import {
    DateAndTimeJoin,
    DateErrorMessages,
    getDateValidation,
    getReadyForDateValidation,
    getReadyForTimeValidation,
    isActualDate,
    isMoreOrEqualDate,
} from '../../validation/date.ts';
import { dateInput } from '../../utils/common/dateRepresentation.ts';

export const useActualDateValidation = (errorType: DateErrorMessages) => {
    const [dateError, setDateError] = useState<string>('');
    const checkActual = isActualDate.bind(this, errorType);
    return {
        errorText: dateError,
        setDateError: (date: dateInput) =>
            setDateError(checkActual(getReadyForDateValidation([date])[0])),
    };
};

export const useActualTimeValidation = (errorType: DateErrorMessages) => {
    const [dateError, setDateError] = useState<string>('');
    const checkActual = isActualDate.bind(this, errorType);

    return {
        errorText: dateError,
        setDateError: (date: Date, time: dateInput) =>
            setDateError(
                checkActual(
                    getReadyForTimeValidation([
                        {
                            date: date,
                            time: time,
                        },
                    ])[0],
                ),
            ),
    };
};

export const useIsMoreOrEqualDateValidation = (
    errorType: DateErrorMessages,
) => {
    const [dateError, setDateError] = useState<string>('');

    const checkIsMoreOrEqual = getDateValidation.bind(
        this,
        errorType,
        isMoreOrEqualDate,
    );

    return {
        errorText: dateError,
        setDateError: (initialDate: dateInput, dateToCompare: dateInput) => {
            const validationDate = getReadyForDateValidation([
                initialDate,
                dateToCompare,
            ]);
            setDateError(
                checkIsMoreOrEqual(validationDate[0], validationDate[1]),
            );
        },
    };
};

export const useIsMoreOrEqualTimeValidation = (
    errorType: DateErrorMessages,
) => {
    const [dateError, setDateError] = useState<string>('');

    const checkIsMoreOrEqual = getDateValidation.bind(
        this,
        errorType,
        isMoreOrEqualDate,
    );

    return {
        errorText: dateError,
        setDateError: (
            initialDate: DateAndTimeJoin,
            dateToCompare: DateAndTimeJoin,
        ) => {
            const validationTime = getReadyForTimeValidation([
                initialDate,
                dateToCompare,
            ]);
            setDateError(
                checkIsMoreOrEqual(validationTime[0], validationTime[1]),
            );
        },
    };
};
