import React, { useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import styles from './AddEventForm.module.scss';
import Container from '@ui-kit/Container/Container.tsx';
import Input from '@ui-kit/Input/Input.tsx';
import { TimePicker } from '@ui-kit/TimePicker/TimePicker.tsx';
import { DatePicker } from '@ui-kit/DatePicker/DatePicker.tsx';
import Button from '@ui-kit/Button/Button.tsx';
import Text from '@ui-kit/Text/Text.tsx';
import { useAddEventMutation } from '@app/features/calendar/calendarSlice.ts';

interface AddEvenFormProps extends UiComponentProps {
    setIsShowingState: React.Dispatch<React.SetStateAction<boolean>>;
    calendarRef: React.RefObject<HTMLIFrameElement>;
}

export type dateInput = null | Date;

export const AddEvenForm: React.FC<AddEvenFormProps> = ({
    setIsShowingState,
    // calendarRef,
}) => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState<dateInput>(null);
    const [startTime, setStartTime] = useState<dateInput>(null);
    const [endDate, setEndDate] = useState<dateInput>(null);
    const [endTime, setEndTime] = useState<dateInput>(null);
    const [description, setDescription] = useState('');

    const [sendEvent] = useAddEventMutation();
    return (
        <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                if (startDate && startTime && endDate && endTime) {
                    startDate.setHours(startTime.getHours());
                    startDate.setMinutes(startTime.getMinutes());
                    endDate.setHours(endTime.getHours());
                    endDate.setMinutes(endTime.getMinutes());
                    console.log(startDate);
                    sendEvent({
                        title,
                        description,
                        startDate: startDate.toISOString(),
                        endDate: endDate.toISOString(),
                    });
                    // calendarRef.current?.src += '';
                }
                // fix;
                setIsShowingState(false);
            }}
        >
            <Container
                direction={'grid'}
                layout={'defaultBase'}
                classes={styles.addEventForm}
            >
                <Input
                    classes={styles.addEventFormTitle}
                    type="text"
                    onChange={(event) => setTitle(event.target.value)}
                ></Input>
                <DatePicker
                    classes={styles.addEventFormDate}
                    setDate={setStartDate}
                ></DatePicker>
                <TimePicker
                    classes={styles.addEventFormTime}
                    setTime={setStartTime}
                ></TimePicker>
                <Text
                    type={'h'}
                    size={5}
                ></Text>
                <DatePicker
                    classes={styles.addEventFormDate}
                    setDate={setEndDate}
                ></DatePicker>
                <TimePicker
                    classes={styles.addEventFormTime}
                    setTime={setEndTime}
                ></TimePicker>
                <Input
                    type="text"
                    classes={styles.addEventFormDescription}
                    onChange={(event) => setDescription(event.target.value)}
                ></Input>
                <Button>
                    <Text
                        type={'h'}
                        size={5}
                    >
                        Добавить
                    </Text>
                </Button>
                <Button
                    type={'secondary'}
                    onClick={() => setIsShowingState(false)}
                >
                    {' '}
                    <Text
                        type={'h'}
                        size={5}
                    >
                        Закрыть
                    </Text>
                </Button>
            </Container>
        </form>
    );
};
