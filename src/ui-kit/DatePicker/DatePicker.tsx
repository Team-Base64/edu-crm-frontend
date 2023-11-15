import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Input from '@ui-kit/Input/Input.tsx';
import { dateInput } from '@components/AddEventForm/AddEventForm.tsx';

interface DatePickerProps extends UiComponentProps {
    setDate: React.Dispatch<React.SetStateAction<dateInput>>;
}

export const DatePicker: React.FC<DatePickerProps> = ({ setDate }) => {
    return (
        <Input
            type={'date'}
            onChange={(event) => setDate(event.target.valueAsDate)}
            // value={new Date().toLocaleDateString('en-CA')}
            min={new Date().toLocaleDateString('en-CA')}
        ></Input>
    );
};
