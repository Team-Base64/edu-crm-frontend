import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Input from '@ui-kit/Input/Input.tsx';
import {
    dateInput,
    getUTCTime,
    valueAsDateTimezoneOffset,
} from '../../utils/common/dateRepresentation.ts';

interface TimePickerProps extends UiComponentProps {
    useTime: {
        time: dateInput;
        setTime: React.Dispatch<React.SetStateAction<dateInput>>;
    };
    label: string;
    onChangeDate: (date: dateInput) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({
    useTime,
    classes,
    label,
    onChangeDate,
}) => {
    return (
        <Input
            type={'time'}
            onChange={({ target }) => {
                const date = valueAsDateTimezoneOffset(target.valueAsDate);
                useTime.setTime(date);
                onChangeDate(date);
            }}
            defaultValue={useTime.time ? getUTCTime(useTime.time) : undefined}
            classes={classes}
            label={{ text: label, type: 'h', size: 5 }}
        ></Input>
    );
};
