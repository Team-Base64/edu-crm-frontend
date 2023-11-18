import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Input from '@ui-kit/Input/Input.tsx';
import { dateInput } from '@components/AddEventForm/AddEventForm.tsx';
import { getUTCTime } from '../../utils/common/dateRepresentation.ts';

interface TimePickerProps extends UiComponentProps {
    useTime: {
        time: dateInput | undefined;
        setTime: React.Dispatch<React.SetStateAction<dateInput | undefined>>;
    };
}

export const TimePicker: React.FC<TimePickerProps> = ({ useTime }) => {
    return (
        <Input
            type={'time'}
            onChange={(event) => useTime.setTime(event.target.valueAsDate)}
            value={getUTCTime(useTime.time ?? new Date())}
        ></Input>
    );
};
