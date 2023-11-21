import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Input, { InputErrorType } from '@ui-kit/Input/Input.tsx';
import { dateInput } from '@components/CalendarEventForm/CalendarEventForm.tsx';
import { getUTCTime } from '../../utils/common/dateRepresentation.ts';

interface TimePickerProps extends UiComponentProps {
    useTime: {
        time: dateInput;
        setTime: React.Dispatch<React.SetStateAction<dateInput>>;
    };
    label: string;
    error: InputErrorType;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({
    useTime,
    classes,
    label,
    error,
    onChange,
}) => {
    return (
        <Input
            type={'time'}
            onChange={(event) => {
                useTime.setTime(event.target.valueAsDate);
                onChange(event);
            }}
            defaultValue={useTime.time ? getUTCTime(useTime.time) : undefined}
            classes={classes}
            label={label}
            error={error}
        ></Input>
    );
};
