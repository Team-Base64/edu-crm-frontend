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
import { unselectedId } from '@app/const/consts.ts';
import {
    getIsFirstArgLessOrEqualDateValidation,
    isActualDate,
    isActualTime,
} from '../../validation/date.ts';
import { getEmptyStringValidation } from '../../validation/string.ts';

interface AddEvenFormProps extends UiComponentProps {
    setIsShowingState: React.Dispatch<React.SetStateAction<boolean>>;
    useMutation: eventMutationsType;
    eventData?: CalendarEventType | null;
    title: string;
    iframeRef: React.RefObject<HTMLIFrameElement>;
}

export type dateInput = Date | null;

export const CalendarEventForm: React.FC<AddEvenFormProps> = ({
    setIsShowingState,
    useMutation,
    eventData = null,
    title,
    iframeRef,
}) => {
    const handleOverlayClose = () => {
        if (iframeRef.current) {
            iframeRef.current.src += '';
        }
        setIsShowingState(false);
    };

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
    } = useAddEvent(handleOverlayClose, useMutation()[0], eventData);

    const [titleError, setTitleError] = useState<string>('');
    const [startDateError, setStartDateError] = useState<string>('');
    const [startTimeError, setStartTimeError] = useState<string>('');
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
                setTitleError(getEmptyStringValidation(useTitle.title));
                setStartDateError(isActualDate(useStartDate.date));
                setStartTimeError(isActualTime(useStartTime.time));
                setEndDateError(
                    getIsFirstArgLessOrEqualDateValidation(
                        useEndDate.date,
                        useStartDate.date,
                        'Время окончания должна быть не позже даты начала',
                    ),
                );
                setEndTimeError(isActualTime(useEndTime.time));

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
                    label={{ text: 'Название', type: 'h', size: 5 }}
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
                    onChange={({ target }) => {
                        setStartDateError(isActualDate(new Date(target.value)));
                    }}
                ></DatePicker>
                <TimePicker
                    classes={styles.addEventFormStartDate}
                    useTime={useStartTime}
                    label={'Время начала'}
                    error={{
                        text: startTimeError,
                        position: 'right',
                    }}
                    onChange={({ target }) =>
                        setStartTimeError(isActualTime(target.valueAsDate))
                    }
                ></TimePicker>
                <DatePicker
                    classes={styles.addEventFormEndDate}
                    useDate={useEndDate}
                    label={'Дата окончания'}
                    error={{
                        text: endDateError,
                        position: 'left',
                    }}
                    onChange={({ target }) =>
                        setEndDateError(
                            getIsFirstArgLessOrEqualDateValidation(
                                target.valueAsDate,
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
                    onChange={({ target }) =>
                        setEndTimeError(isActualTime(target.valueAsDate))
                    }
                ></TimePicker>
                <Input
                    type={'text'}
                    classes={styles.addEventFormDescription}
                    defaultValue={useDescription.description}
                    onChange={(event) =>
                        useDescription.setDescription(event.target.value)
                    }
                    label={{ text: 'Описание', type: 'h', size: 5 }}
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
                    onClick={handleOverlayClose}
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
