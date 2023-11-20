import React, { useEffect, useRef, useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import Container from '@ui-kit/Container/Container';
import Input from '@ui-kit/Input/Input';
import TextArea from '@ui-kit/TextArea/TextArea';
import Button from '@ui-kit/Button/Button';
import Icon from '@ui-kit/Icon/Icon';
import { v4 as uuid } from 'uuid';
import styles from './HomeworkCreateForm.module.scss';
import Overlay from '@ui-kit/Overlay/Overlay';
import Widget from '@components/Widget/Widget';
import {
    HomeworkTask,
    HomeworkTaskRaw,
} from '@app/features/homework/homeworkModel';
import EmptyItem from '@components/EmptyItem/EmptyItem';
import Text from '@ui-kit/Text/Text';
import TaskItem from './HomeworkTask';
import TaskCreateForm from './HomeworkTaskCreateForm';
import { useCreateHomeworkMutation } from '@app/features/homework/homeworkSlice';
import { useSendChatAttachesMutation } from '@app/features/attaches/attachesSlice.ts';

interface HomeworkCreateFormProps extends UiComponentProps {
    onSuccess?: () => void;
    classId: string | number;
}

interface Item extends HomeworkTaskRaw {
    uuid: string;
}

const HomeworkCreateForm: React.FC<HomeworkCreateFormProps> = ({
    onSuccess,
    classId,
}) => {
    const [isTaskCreateFrom, setTaskCreateForm] = useState<boolean>(false);
    const [tasks, setTasks] = useState<Item[]>([]);
    const formRef = useRef<HTMLFormElement>(null);

    const [lock, setLock] = useState<boolean>(false);

    const [createHW, createStatus] = useCreateHomeworkMutation();
    // const [uploadAttach, uploadStatus] = useSendChatAttachesMutation();
    const [, uploadStatus] = useSendChatAttachesMutation();

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (createStatus.isLoading || uploadStatus.isLoading) {
            setLock(true);
        }

        if (!createStatus.isLoading && !uploadStatus.isLoading) {
            setLock(false);
        }
    }, [createStatus, uploadStatus, setLock]);

    const handleSubmit = async () => {
        const form = formRef.current;
        if (!form) {
            return;
        }

        const title = form.hwTitle.value;
        const desc = form.hwDescr.value;
        const deadline: Date = form.hwDeadline.valueAsDate;

        if (!title || !deadline) {
            return;
        }
        if (!desc && !tasks.length) {
            return;
        }

        const loadedTasks: HomeworkTask[] = [];

        for (const task of tasks) {
            const loaded = {
                description: task.description,
                id: task.id,
                attach: '',
            };

            if (task.attach) {
                // const resp = await uploadAttach({
                //     type: 'homework',
                //     attache: [task.attach],
                // });
                // if ('data' in resp) {
                //     loaded.attach = resp.data.file;
                // }
            }

            loadedTasks.push(loaded);
        }

        createHW({
            payload: {
                classID: Number(classId),
                deadlineTime: deadline.toISOString(),
                title: title,
                description: desc,
                tasks: loadedTasks,
            },
        }).then(() => onSuccess?.());
    };

    return (
        <>
            <Widget
                classes={styles.form}
                title="Создание Домашнего задания"
                footer={
                    <Button
                        disabled={lock}
                        onClick={handleSubmit}
                    >
                        Создать
                    </Button>
                }
            >
                <form
                    ref={formRef}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <Input
                        name="hwTitle"
                        label="Заголовок домашнего задания"
                        placeholder="Например: Повторение "
                    />
                    <TextArea
                        name="hwDescr"
                        labelText="Описание домашнего задания"
                        placeholder="Можно оставить пустым"
                        border="border"
                        textareaRef={textAreaRef}
                    />
                    <Input
                        name="hwDeadline"
                        label="Срок сдачи"
                        type="date"
                    />

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
                        <Container
                            direction="vertical"
                            classes={styles.list}
                        >
                            {!tasks.length ? (
                                <EmptyItem />
                            ) : (
                                tasks.map((t, i) => (
                                    <React.Fragment key={t.uuid}>
                                        <TaskItem
                                            index={i}
                                            task={t}
                                            onDelete={() => {
                                                setTasks((prev) =>
                                                    prev.filter(
                                                        (item) =>
                                                            item.uuid !==
                                                            t.uuid,
                                                    ),
                                                );
                                            }}
                                        />
                                    </React.Fragment>
                                ))
                            )}
                        </Container>
                        <Container
                            direction="horizontal"
                            classes={styles.contentNav}
                        >
                            <Button
                                disabled={lock}
                                onClick={() => setTaskCreateForm(true)}
                                classes={styles.addBtn}
                            >
                                <Icon
                                    name="addLine"
                                    classes={styles.addBtnIcon}
                                />
                                Создать задание
                            </Button>
                            <Button
                                disabled={lock}
                                classes={styles.setBtn}
                            >
                                <Icon
                                    name="layoutLine"
                                    classes={styles.setBtnIcon}
                                />
                                Выбрать задание
                            </Button>
                        </Container>
                    </Container>
                </form>
            </Widget>

            <Overlay
                isShowing={isTaskCreateFrom}
                closeOverlay={() => setTaskCreateForm(false)}
            >
                <TaskCreateForm
                    addTask={(t) => {
                        setTasks((prev) => [...prev, { ...t, uuid: uuid() }]);
                        setTaskCreateForm(false);
                    }}
                />
            </Overlay>
        </>
    );
};

export default HomeworkCreateForm;
