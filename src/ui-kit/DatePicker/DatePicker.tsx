import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Input from '@ui-kit/Input/Input.tsx';
import { dateInput } from '@components/AddEventForm/AddEventForm.tsx';
import {
    getInputDateRepresentation,
    getNextYearDate,
} from '../../utils/common/dateRepresentation.ts';

interface DatePickerProps extends UiComponentProps {
    useDate: {
        date: dateInput | undefined;
        setDate: React.Dispatch<React.SetStateAction<dateInput | undefined>>;
    };
}

export const DatePicker: React.FC<DatePickerProps> = ({ useDate }) => {
    return (
        <Input
            type={'date'}
            onChange={(event) => useDate.setDate(event.target.valueAsDate)}
            min={getInputDateRepresentation(new Date())}
            max={getInputDateRepresentation(getNextYearDate())}
            value={getInputDateRepresentation(useDate.date ?? new Date())}
        ></Input>
    );
};
