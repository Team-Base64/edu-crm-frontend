import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import styles from './CalendarEventForm.module.scss';
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
import { unselectedId } from '@app/const/consts.ts';

interface AddEvenFormProps extends UiComponentProps {
    setIsShowingState: React.Dispatch<React.SetStateAction<boolean>>;
    useMutation: eventMutationsType;
    eventData?: CalendarEventType | null;
    title: string;
}

export type dateInput = null | Date;

export const CalendarEventForm: React.FC<AddEvenFormProps> = ({
    setIsShowingState,
    useMutation,
    eventData = null,
    title,
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
    } = useAddEvent(setIsShowingState, useMutation()[0], eventData);

    return (
        <form onSubmit={handleSubmit}>
            <Container
                direction={'grid'}
                layout={'defaultBase'}
                classes={styles.addEventForm}
            >
                <Text
                    type={'h'}
                    size={3}
                    classes={styles.addEventFormFormName}
                >
                    {title}
                </Text>
                <Input
                    classes={styles.addEventFormTitle}
                    type="text"
                    value={useTitle.title}
                    onChange={(event) => useTitle.setTitle(event.target.value)}
                    label={'Название'}
                ></Input>
                <DatePicker
                    classes={styles.addEventFormStartDate}
                    useDate={useStartDate}
                    label={'Дата начала'}
                ></DatePicker>
                <TimePicker
                    classes={styles.addEventFormStartDate}
                    useTime={useStartTime}
                    label={'Время начала'}
                ></TimePicker>
                <DatePicker
                    classes={styles.addEventFormEndDate}
                    useDate={useEndDate}
                    label={'Дата окончания'}
                ></DatePicker>
                <TimePicker
                    classes={styles.addEventFormEndDate}
                    useTime={useEndTime}
                    label={'Время окончания'}
                ></TimePicker>
                <Input
                    type={'text'}
                    classes={styles.addEventFormDescription}
                    value={useDescription.description}
                    onChange={(event) =>
                        useDescription.setDescription(event.target.value)
                    }
                    label={'Описание'}
                ></Input>
                <DropDown
                    options={Array.from(classData.keys())}
                    classes={styles.addEventFormClassPicker}
                    onChange={(event) =>
                        useSelectedClass.setSelected(
                            classData.get(event.target.value) ?? unselectedId,
                        )
                    }
                    values={Array.from(classData.values())}
                    selectedValue={useSelectedClass.selected}
                    label={'Класс'}
                ></DropDown>
                <Button classes={styles.addEventFormSubmitButton}>
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
                    classes={styles.addEventFormCancelButton}
                    action={'button'}
                >
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
