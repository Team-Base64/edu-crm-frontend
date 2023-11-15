import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import styles from './AddEventForm.module.scss';
import Container from '@ui-kit/Container/Container.tsx';
import Input from '@ui-kit/Input/Input.tsx';
import { TimePicker } from '@ui-kit/TimePicker/TimePicker.tsx';
import { DatePicker } from '@ui-kit/DatePicker/DatePicker.tsx';
import Button from '@ui-kit/Button/Button.tsx';
import Text from '@ui-kit/Text/Text.tsx';
import useAddEvent from '../../hooks/useAddEvent.ts';
import { DropDown } from '@ui-kit/DropDown/DropDown.tsx';
import {
    CalendarEventType,
    eventMutationsType,
} from '@app/features/calendar/calendarModel.ts';

interface AddEvenFormProps extends UiComponentProps {
    setIsShowingState: React.Dispatch<React.SetStateAction<boolean>>;
    useMutation: eventMutationsType;
    event: CalendarEventType;
}

export type dateInput = null | Date;

export const AddEventForm: React.FC<AddEvenFormProps> = ({
    setIsShowingState,
    useMutation,
    event,
}) => {
    const {
        useTitle,
        useStartDate,
        useStartTime,
        useEndDate,
        useEndTime,
        useDescription,
        useSelectedClass,
        classData,
        handleSubmit,
    } = useAddEvent(setIsShowingState, useMutation()[0], event);
    // useAddEvent(setIsShowingState, useAddEventMutation()[0]);

    return (
        <form onSubmit={handleSubmit}>
            <Container
                direction={'grid'}
                layout={'defaultBase'}
                classes={styles.addEventForm}
            >
                <Input
                    classes={styles.addEventFormTitle}
                    type="text"
                    onChange={(event) => useTitle.setTitle(event.target.value)}
                ></Input>
                <DatePicker
                    classes={styles.addEventFormDate}
                    setDate={useStartDate.setStartDate}
                ></DatePicker>
                <TimePicker
                    classes={styles.addEventFormTime}
                    setTime={useStartTime.setStartTime}
                ></TimePicker>
                <Text
                    type={'h'}
                    size={5}
                ></Text>
                <DatePicker
                    classes={styles.addEventFormDate}
                    setDate={useEndDate.setEndDate}
                ></DatePicker>
                <TimePicker
                    classes={styles.addEventFormTime}
                    setTime={useEndTime.setEndTime}
                ></TimePicker>
                <Input
                    type="text"
                    classes={styles.addEventFormDescription}
                    onChange={(event) =>
                        useDescription.setDescription(event.target.value)
                    }
                ></Input>
                <DropDown
                    options={Array.from(classData.keys())}
                    classes={styles.addEventFormClassPicker}
                    onChange={(event) =>
                        useSelectedClass.setSelectedClass(
                            classData.get(event.target.value) ?? -1,
                        )
                    }
                ></DropDown>
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
