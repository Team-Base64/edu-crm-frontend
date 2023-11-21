import React, { useState } from 'react';
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
import { noop, unselectedId } from '@app/const/consts.ts';
import { getEmptyStringValidation } from '../../validation/string.ts';
import {
    getIsFirstArgLessDateValidation,
    getIsFirstArgLessOrEqualDateValidation,
    isEmptyDateValidation,
} from '../../validation/date.ts';

interface AddEvenFormProps extends UiComponentProps {
    setIsShowingState: React.Dispatch<React.SetStateAction<boolean>>;
    useMutation: eventMutationsType;
    eventData?: CalendarEventType | null;
    title: string;
}

export type dateInput = Date | null;

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

    const [titleError, setTitleError] = useState<string>('');
    const [startDateError, setStartDateError] = useState<string>('');
    const [endDateError, setEndDateError] = useState<string>('');
    const [endTimeError, setEndTimeError] = useState<string>('');

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                console.log(
                    useTitle.title,
                    titleError,
                    startDateError,
                    endDateError,
                    endTimeError,
                    !titleError &&
                        !startDateError &&
                        !endDateError &&
                        !endTimeError,
                );
                // if (!useTitle.title) {
                setTitleError(getEmptyStringValidation(useTitle.title));
                // }

                if (
                    !titleError &&
                    !startDateError &&
                    !endDateError &&
                    !endTimeError
                ) {
                    handleSubmit();
                }
            }}
        >
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
                    type="text"
                    defaultValue={useTitle.title}
                    onChange={({ target }) => {
                        useTitle.setTitle(target.value);
                        setTitleError(getEmptyStringValidation(target.value));
                    }}
                    label={'Название'}
                    classes={styles.addEventFormTitle}
                    error={{
                        text: titleError,
                        position: 'right',
                    }}
                    placeholder={'Введите название события'}
                ></Input>
                <DatePicker
                    classes={styles.addEventFormStartDate}
                    useDate={useStartDate}
                    label={'Дата начала'}
                    error={{
                        text: startDateError,
                        position: 'left',
                    }}
                    onChange={() => {
                        setStartDateError(
                            isEmptyDateValidation(useStartDate.date),
                        );
                    }}
                ></DatePicker>
                <TimePicker
                    classes={styles.addEventFormStartDate}
                    useTime={useStartTime}
                    label={'Время начала'}
                    onChange={noop}
                    error={{
                        text: '',
                        position: 'left',
                    }}
                ></TimePicker>
                <DatePicker
                    classes={styles.addEventFormEndDate}
                    useDate={useEndDate}
                    label={'Дата окончания'}
                    error={{
                        text: endDateError,
                        position: 'left',
                    }}
                    onChange={() =>
                        setEndDateError(
                            getIsFirstArgLessOrEqualDateValidation(
                                useEndDate.date,
                                useStartDate.date,
                                'Время окончания должна быть не позже даты начала',
                            ),
                        )
                    }
                ></DatePicker>
                <TimePicker
                    classes={styles.addEventFormEndDate}
                    useTime={useEndTime}
                    label={'Время окончания'}
                    error={{
                        text: endTimeError,
                        position: 'right',
                    }}
                    onChange={() =>
                        setEndTimeError(
                            getIsFirstArgLessDateValidation(
                                useEndTime.time,
                                useStartTime.time,
                                'Время окончания должна быть не позже даты начала',
                            ),
                        )
                    }
                ></TimePicker>
                <Input
                    type={'text'}
                    classes={styles.addEventFormDescription}
                    defaultValue={useDescription.description}
                    onChange={(event) =>
                        useDescription.setDescription(event.target.value)
                    }
                    label={'Описание'}
                    placeholder={'Введите описание события'}
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
                <Button
                    classes={styles.addEventFormSubmitButton}
                    // onClick={(event) => event.preventDefault()}
                >
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
