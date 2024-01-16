import { useCreateHomeworkMutation } from '@app/features/homework/homeworkSlice';
import { HomeworkTask } from '@app/features/homeworkTask/homeworkTaskModel';
import HomeworkTaskChoose, {
    HomeworkTaskChooseRef,
} from '@components/HomeworkTaskChoose/HomeworkTaskChoose';
import Button from '@ui-kit/Button/Button';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import Input from '@ui-kit/Input/Input';
import { useListItems } from '@ui-kit/List/hooks';
import Spinner from '@ui-kit/Spinner/Spinner';
import Text from '@ui-kit/Text/Text';
import TextArea from '@ui-kit/TextArea/TextArea';
import useForm from '@ui-kit/_hooks/useForm';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useRef, useState } from 'react';
import { dateToLocalISO } from 'utils/common/PrettyDate/common/iso';
import styles from './HomeworkCreateForm.module.scss';

interface HomeworkCreateFormProps extends UiComponentProps {
    onSubmitSuccess?: () => void;
    classId: string | number;
}

const HomeworkCreateForm: React.FC<HomeworkCreateFormProps> = ({
    onSubmitSuccess,
    classId,
}) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const chooseRef = useRef<HomeworkTaskChooseRef>(null);

    const [lock, setLock] = useState<boolean>(false);
    const [createHW] = useCreateHomeworkMutation();

    const minDate = new Date();
    minDate.setHours(minDate.getHours() + 1);

    const [form, isValid, clear] = useForm({
        title: {
            rules: {
                noEmpty: true,
                max: 100,
                trim: true,
            },
            initial: '',
        },
        description: {
            rules: {},
            initial: '',
        },
        deadline: {
            rules: {
                date: {
                    minISO: dateToLocalISO(minDate).slice(0, -13),
                },
            },
            initial: dateToLocalISO(minDate).slice(0, -13),
        },
    });

    const [choosenTasks, changeChoosenTasks] = useListItems(
        [] as HomeworkTask[],
    );

    const handleSubmit = () => {
        if (!isValid || !choosenTasks.length) {
            return;
        }

        setLock(true);
        createHW({
            payload: {
                classID: Number(classId),
                // deadlineTime: dateToLocalISO(
                //     new Date(Date.parse(form.deadline.value)),
                // ),
                deadlineTime: new Date(Date.parse(form.deadline.value)).toISOString(),
                title: form.title.value,
                description: form.description.value,
                tasks: choosenTasks.map((t) => t.id),
            },
        })
            .then((resp) => {
                if ('error' in resp)
                    throw new Error(JSON.stringify(resp.error));
                chooseRef.current?.clearSelect();
                clear();
                onSubmitSuccess?.();
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setLock(false);
            });
    };

    return (
        <>
            <Container
                direction="vertical"
                layout="defaultBase"
                gap="l"
                classes={styles.widget}
            >
                <Text
                    type="h"
                    size={3}
                    weight="bold"
                >
                    {'Новое домашнее задание'}
                </Text>

                <Container
                    direction="vertical"
                    gap="l"
                >
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Input
                            label={{
                                text: 'Заголовок домашнего задания',
                                type: 'h',
                                size: 4,
                            }}
                            placeholder="Например: Повторение "
                            onChange={form.title.changeMiddleware()}
                            errors={form.title.errors}
                            value={form.title.value}
                        />
                        <TextArea
                            textareaRef={textAreaRef}
                            label={{
                                text: 'Описание домашнего задания',
                                type: 'h',
                                size: 4,
                            }}
                            placeholder="Можно оставить пустым"
                            onChange={form.description.changeMiddleware()}
                            errors={form.description.errors}
                            textareaText={form.description.value}
                        />
                        <Input
                            label={{
                                text: 'Срок сдачи',
                                type: 'h',
                                size: 4,
                            }}
                            type="datetime-local"
                            min={dateToLocalISO(new Date()).slice(0, -13)}
                            value={form.deadline.value}
                            onChange={form.deadline.changeMiddleware()}
                            errors={form.deadline.errors}
                        />
                    </form>

                    <Container
                        direction="vertical"
                        classes={styles.content}
                    >
                        <Text
                            type="h"
                            size={4}
                            weight="bold"
                        >
                            Список задач:
                        </Text>
                        <HomeworkTaskChoose
                            ref={chooseRef}
                            changeChoosen={changeChoosenTasks}
                            lock={lock}
                            classes={styles.tasks}
                        />
                    </Container>
                </Container>
                <Button
                    disabled={lock || !isValid || !choosenTasks.length}
                    onClick={handleSubmit}
                    classes={styles.submit}
                >
                    {lock ? (
                        <Spinner classes="spinner" />
                    ) : (
                        <>
                            <Icon
                                name="approve"
                                classes={styles.submitIcon}
                            />
                            <Text
                                type="p"
                                weight="bold"
                                size={1}
                                classes={styles.submitText}
                            >
                                Создать
                            </Text>
                        </>
                    )}
                </Button>
            </Container>
        </>
    );
};

export default HomeworkCreateForm;
