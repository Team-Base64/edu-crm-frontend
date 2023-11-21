import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Input, { InputErrorType } from '@ui-kit/Input/Input.tsx';
import { dateInput } from '@components/CalendarEventForm/CalendarEventForm.tsx';
import {
    getInputDateRepresentation,
    getNextYearDate,
} from '../../utils/common/dateRepresentation.ts';

interface DatePickerProps extends UiComponentProps {
    useDate: {
        date: dateInput;
        setDate: React.Dispatch<React.SetStateAction<dateInput>>;
    };
    label: string;
    error: InputErrorType;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
    useDate,
    classes,
    label,
    error,
    onChange,
}) => {
    return (
        <Input
            type={'date'}
            onChange={(event) => {
                useDate.setDate(event.target.valueAsDate);
                onChange(event);
            }}
            min={getInputDateRepresentation(new Date())}
            max={getInputDateRepresentation(getNextYearDate())}
            defaultValue={getInputDateRepresentation(useDate.date)}
            classes={classes}
            label={{ text: label, type: 'h', size: 5 }}
            error={error}
        ></Input>
    );
};
