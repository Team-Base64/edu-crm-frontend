import { useState } from 'react';
import { getEmptyStringValidation } from '../../validation/string.ts';

export const useEmptyStringValidation = () => {
    const [stringError, setStringError] = useState<string>('');

    return {
        errorText: stringError,
        setStringError: (text: string) =>
            setStringError(getEmptyStringValidation(text)),
    };
};
