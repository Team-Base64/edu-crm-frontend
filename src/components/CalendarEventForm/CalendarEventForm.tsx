import React, { useRef, useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import styles from './CalendarEventForm.module.scss';
import Container from '@ui-kit/Container/Container.tsx';
import Input from '@ui-kit/Input/Input.tsx';
import Button from '@ui-kit/Button/Button.tsx';
import Text from '@ui-kit/Text/Text.tsx';
import { DropDown } from '@ui-kit/DropDown/DropDown.tsx';
import {
    CalendarEventType,
    eventMutationsType,
} from '@app/features/calendar/calendarModel.ts';
import Icon from '@ui-kit/Icon/Icon.tsx';
import TextArea from '@ui-kit/TextArea/TextArea.tsx';
import { dateToLocalISO } from 'utils/common/PrettyDate/common/iso.ts';
import { useGetClassesQuery } from '@app/features/class/classSlice.ts';
import ShowQueryState from '@components/ShowQueryState/ShowQueryState.tsx';
import { getDelta } from 'utils/common/PrettyDate/common/delta.ts';
import useForm from '@ui-kit/_hooks/useForm';

const fillDuration = (from: number, step: number, count: number): number[] => {
    const arr: number[] = [];
    for (let idx = 0; idx <= count; idx++) {
        arr.push(from + idx * step);
    }
    return arr;
};

const parseMinutes = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const value = (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;

    return { h, m, value };
};

const durationValues = fillDuration(15, 15, 120 / 15);
const durationValueTitle = (value: number | string) =>
    parseMinutes(Number(value)).value;

interface CalendarEventFormProps extends UiComponentProps {
    useMutation: eventMutationsType;
    eventData?: CalendarEventType | null;
    onClose?: () => void;
    onSuccess?: () => void;
}

export const CalendarEventForm: React.FC<CalendarEventFormProps> = ({
    eventData,
    useMutation,
    onClose,
    onSuccess,
}) => {
    const {
        data: classesData,
        isSuccess,
        ...status
    } = useGetClassesQuery(null);
    const [mutation] = useMutation();

    const [form, isValid, clear] = useForm({
        title: {
            rules: {
                min: 5,
            },
            initial: eventData?.title || '',
        },

        description: {
            rules: {},
            initial: eventData?.description || '',
        },
        startDate: {
            rules: {
                date: {
                    minISO: dateToLocalISO(new Date()),
                },
            },
            initial: eventData
                ? dateToLocalISO(
                      new Date(Date.parse(eventData?.startDate)),
                  ).slice(0, -13)
                : '',
        },
        duration: {
            rules: {
                noEmpty: true,
            },
            initial: eventData
                ? String(
                      getDelta(eventData.endDate, eventData.startDate) /
                          (1000 * 60),
                  )
                : '',
        },

        classID: {
            rules: {
                noEmpty: true,
            },
            initial: eventData?.classid.toString() || '',
        },
    });

    const formTitle = eventData ? 'Изменить событие' : 'Создать событие';
    const submitTitle = eventData ? 'Сохранить' : 'Создать';

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [lock, setLock] = useState(false);

    const handleSubmit = async () => {
        try {
            setLock(true);

            const res = await mutation({
                title: form.title.value,
                description: form.description.value,
                startDate: dateToLocalISO(
                    new Date(Date.parse(form.startDate.value)),
                ),
                endDate: dateToLocalISO(
                    new Date(
                        Date.parse(form.startDate.value) +
                            Number(form.duration.value) * 60 * 1000,
                    ),
                ),
                classid: Number(form.classID.value),
                id: eventData?.id || '',
            });

            if ('error' in res) throw new Error(JSON.stringify(res.error));
            clear();
            onSuccess?.();
        } catch (e) {
            console.log(e);
        } finally {
            setLock(false);
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Container
                direction="vertical"
                layout={'defaultBase'}
                gap="l"
                classes={styles.component}
            >
                <Text
                    type={'h'}
                    size={3}
                    weight="bold"
                >
                    {formTitle}
                </Text>

                <ShowQueryState status={status} />
                {isSuccess && (
                    <>
                        <Container direction="vertical">
                            <Input
                                placeholder="Введите название события"
                                label={{
                                    text: 'Название события',
                                    type: 'h',
                                    size: 4,
                                }}
                                value={form.title.value}
                                onChange={form.title.changeMiddleware()}
                                errors={form.title.errors}
                            />
                            <TextArea
                                placeholder="Введите описание события"
                                label={{
                                    text: 'Описание события',
                                    type: 'h',
                                    size: 4,
                                }}
                                textareaText={form.description.value}
                                textareaRef={textareaRef}
                                onChange={form.description.changeMiddleware()}
                                errors={form.description.errors}
                            />
                            <Input
                                placeholder="Введите дату события"
                                label={{
                                    text: 'Дата и время события',
                                    type: 'h',
                                    size: 4,
                                }}
                                value={form.startDate.value}
                                type="datetime-local"
                                min={dateToLocalISO(new Date()).slice(0, -13)}
                                onChange={form.startDate.changeMiddleware()}
                                errors={form.startDate.errors}
                            />
                            <DropDown
                                values={durationValues}
                                placeholder={'Выберите продолжительность'}
                                formatTitle={durationValueTitle}
                                label={{
                                    text: 'Продолжительность',
                                    type: 'h',
                                    size: 4,
                                }}
                                initial={form.duration.value}
                                onChange={form.duration.changeMiddleware()}
                                errors={form.duration.errors}
                            />
                            <DropDown
                                values={classesData.classes.map((cl) => cl.id)}
                                placeholder={'Выберите класс'}
                                formatTitle={(id) => {
                                    return (
                                        classesData.classes
                                            .filter((cl) => cl.id === id)
                                            .at(0)?.title || 'Неизвестно'
                                    );
                                }}
                                label={{
                                    text: 'Класс',
                                    type: 'h',
                                    size: 4,
                                }}
                                onChange={form.classID.changeMiddleware()}
                                errors={form.classID.errors}
                                initial={form.classID.value}
                            />
                        </Container>
                        <Container>
                            <Button
                                onClick={handleSubmit}
                                disabled={lock || !isValid}
                                classes={[styles.btn].join(' ')}
                            >
                                <Icon
                                    name="approve"
                                    classes={styles.icon}
                                />
                                <Text
                                    type={'p'}
                                    size={1}
                                    weight="bold"
                                    classes={styles.text}
                                >
                                    {submitTitle}
                                </Text>
                            </Button>
                            <Button
                                type={'link'}
                                onClick={onClose}
                                classes={[styles.btn].join(' ')}
                            >
                                <Icon
                                    name="close"
                                    classes={styles.iconClose}
                                />
                                <Text
                                    type={'p'}
                                    size={1}
                                    weight="bold"
                                    classes={styles.textClose}
                                >
                                    Закрыть
                                </Text>
                            </Button>
                        </Container>
                    </>
                )}
            </Container>
        </form>
    );
};
