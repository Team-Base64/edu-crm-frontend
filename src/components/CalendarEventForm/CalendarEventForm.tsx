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
import { useEmptyStringValidation } from '../../hooks/validation/string.ts';
import {
    useActualDateValidation,
    useIsMoreOrEqualDateValidation,
} from '../../hooks/validation/date.ts';

interface AddEvenFormProps extends UiComponentProps {
    useMutation: eventMutationsType;
    eventData?: CalendarEventType | null;
    title: string;
    handleOverlayClose: () => void;
}

export type dateInput = Date | null;

export const CalendarEventForm: React.FC<AddEvenFormProps> = ({
    useMutation,
    eventData = null,
    title,
    handleOverlayClose,
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
    } = useAddEvent(handleOverlayClose, useMutation()[0], eventData);

    const titleError = useEmptyStringValidation();
    const startDateError = useActualDateValidation('actualDate');
    const startTimeError = useActualDateValidation('actualTime');
    const endDateError = useIsMoreOrEqualDateValidation('moreOrEqualEndDate');
    const endTimeError = useIsMoreOrEqualDateValidation('moreOrEqualEndTime');

    const handleFromSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        console.log(
            useTitle.title,
            useStartTime.time,
            useStartTime.time,
            useEndDate.date,
            useEndTime.time,
        );
        console.log(
            titleError.errorText,
            startDateError.errorText,
            startTimeError.errorText,
            endDateError.errorText,
            endTimeError.errorText,
        );
        console.log(
            !titleError.errorText &&
                !startDateError.errorText &&
                !startTimeError.errorText &&
                !endDateError.errorText &&
                !endTimeError.errorText,
        );

        if (
            !titleError.errorText &&
            !startDateError.errorText &&
            !startTimeError.errorText &&
            !endDateError.errorText &&
            !endTimeError.errorText
        ) {
            handleSubmit();
        }
    };

    const handleButtonSubmit = () => {
        titleError.setDateError(useTitle.title ?? '');
        startDateError.setDateError(useStartDate.date);
        startTimeError.setDateError(useStartTime.time);
        endDateError.setDateError(useEndDate.date, useStartDate.date);
        endTimeError.setDateError(useEndTime.time, useEndTime.time);
    };

    return (
        <form onSubmit={handleFromSubmit}>
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
                        titleError.setDateError(target.value);
                    }}
                    label={{ text: 'Название', type: 'h', size: 5 }}
                    classes={styles.addEventFormTitle}
                    error={{
                        text: titleError.errorText,
                        position: 'right',
                    }}
                    placeholder={'Введите название события'}
                ></Input>
                <DatePicker
                    classes={styles.addEventFormStartDate}
                    useDate={useStartDate}
                    label={'Дата начала'}
                    error={{
                        text: startDateError.errorText,
                        position: 'left',
                    }}
                    onChange={({ target }) =>
                        startDateError.setDateError(target.valueAsDate)
                    }
                ></DatePicker>
                <TimePicker
                    classes={styles.addEventFormStartDate}
                    useTime={useStartTime}
                    label={'Время начала'}
                    error={{
                        text: startTimeError.errorText,
                        position: 'right',
                    }}
                    onChange={({ target }) =>
                        startTimeError.setDateError(target.valueAsDate)
                    }
                ></TimePicker>
                <DatePicker
                    classes={styles.addEventFormEndDate}
                    useDate={useEndDate}
                    label={'Дата окончания'}
                    error={{
                        text: endDateError.errorText,
                        position: 'left',
                    }}
                    onChange={({ target }) =>
                        endDateError.setDateError(
                            target.valueAsDate,
                            useStartDate.date,
                        )
                    }
                ></DatePicker>
                <TimePicker
                    classes={styles.addEventFormEndDate}
                    useTime={useEndTime}
                    label={'Время окончания'}
                    error={{
                        text: endTimeError.errorText,
                        position: 'right',
                    }}
                    onChange={({ target }) =>
                        endTimeError.setDateError(
                            target.valueAsDate,
                            useEndTime.time,
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
                    onClick={handleButtonSubmit}
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
