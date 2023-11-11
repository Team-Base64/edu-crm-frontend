import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Input from '@ui-kit/Input/Input.tsx';
import { dateInput } from '@components/AddEventForm/AddEventForm.tsx';

interface TimePickerProps extends UiComponentProps {
    setTime: React.Dispatch<React.SetStateAction<dateInput>>;
}

export const TimePicker: React.FC<TimePickerProps> = ({ setTime }) => {
    return (
        <Input
            type={'time'}
            onChange={(event) => setTime(event.target.valueAsDate)}
        ></Input>
    );
};
