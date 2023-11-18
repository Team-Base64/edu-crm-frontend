import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Input from '@ui-kit/Input/Input.tsx';
import { dateInput } from '@components/CalendarEventForm/CalendarEventForm.tsx';
import { getUTCTime } from '../../utils/common/dateRepresentation.ts';

interface TimePickerProps extends UiComponentProps {
    useTime: {
        time: dateInput;
        setTime: React.Dispatch<React.SetStateAction<dateInput>>;
    };
}

export const TimePicker: React.FC<TimePickerProps> = ({ useTime, classes }) => {
    return (
        <Input
            type={'time'}
            onChange={(event) => useTime.setTime(event.target.valueAsDate)}
            value={getUTCTime(useTime.time ?? new Date())}
            classes={classes}
        ></Input>
    );
};
