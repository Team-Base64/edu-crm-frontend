import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Input, { InputErrorType } from '@ui-kit/Input/Input.tsx';
import {
    dateInput,
    getInputDateRepresentation,
    getNextYearDate,
    valueAsDateTimezoneOffset,
} from '../../utils/common/dateRepresentation.ts';

interface DatePickerProps extends UiComponentProps {
    useDate: {
        date: dateInput;
        setDate: React.Dispatch<React.SetStateAction<dateInput>>;
    };
    label: string;
    error: InputErrorType;
    onChangeDate: (date: dateInput) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
    useDate,
    classes,
    label,
    error,
    onChangeDate,
}) => {
    return (
        <Input
            type={'date'}
            onChange={(event) => {
                const date = valueAsDateTimezoneOffset(
                    event.target.valueAsDate,
                );
                useDate.setDate(date);
                onChangeDate(date);
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
