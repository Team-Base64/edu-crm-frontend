import { useState } from 'react';
import { getEmptyStringValidation } from '../../validation/string.ts';

export const useEmptyStringValidation = () => {
    const [stringError, setStringError] = useState<string>('');

    return {
        errorText: stringError,
        setDateError: (text: string) =>
            setStringError(getEmptyStringValidation(text)),
    };
};
