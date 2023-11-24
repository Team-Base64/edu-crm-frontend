import React, { useEffect, useRef, useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import Container from '@ui-kit/Container/Container';
import Input from '@ui-kit/Input/Input';
import TextArea from '@ui-kit/TextArea/TextArea';
import Button from '@ui-kit/Button/Button';
import Icon from '@ui-kit/Icon/Icon';
import styles from './HomeworkCreateForm.module.scss';
import Overlay from '@ui-kit/Overlay/Overlay';
import Text from '@ui-kit/Text/Text';
import { useCreateHomeworkMutation } from '@app/features/homework/homeworkSlice';
import { HomeworkTask } from '@app/features/homeworkTask/homeworkTaskModel';
import TaskCreateForm from '@components/HomeworkTaskCreateForm/HomeworkTaskCreateForm';
import HomeworkTaskSelect from '@components/HomeworkTaskSelect/HomeworkTaskSelect';
import { useListItems } from '@ui-kit/List/hooks';
import ListFC from '@ui-kit/List/List';
import HomeworkTaskItem from '@components/HomeworkTaskItem/HomeworkTaskItem';

import { arrayToItem, objToItem } from '@ui-kit/List/helpers';

interface HomeworkCreateFormProps extends UiComponentProps {
    onSubmitSuccess?: () => void;
    classId: string | number;
}

const HomeworkCreateForm: React.FC<HomeworkCreateFormProps> = ({
    onSubmitSuccess,
    classId,
}) => {
    const formRef = useRef<HTMLFormElement>(null);

    const [isTaskCreateFrom, setTaskCreateForm] = useState<boolean>(false);
    const [isTaskSelectForm, setTaskSelectForm] = useState<boolean>(false);

    const [lock, setLock] = useState<boolean>(false);

    const [createHW, createStatus] = useCreateHomeworkMutation();

    const [choosenTasks, changeChoosenTasks] = useListItems(
        [] as HomeworkTask[],
    );

    useEffect(() => {
        if (createStatus.isLoading) {
            setLock(true);
        } else {
            setLock(false);
        }
    }, [createStatus, setLock]);

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
        if (!desc && !choosenTasks.length) {
            return;
        }

        createHW({
            payload: {
                classID: Number(classId),
                deadlineTime: deadline.toISOString(),
                title: title,
                description: desc,
                tasks: choosenTasks.map((t) => t.id),
            },
        }).then(() => {
            form.hwTitle.value = '';
            form.hwDescr.value = '';
            form.hwDeadline.value = '';
            changeChoosenTasks([]);

            onSubmitSuccess?.();
        });
    };

    const handleCreateTaskSuccess = (task: HomeworkTask) => {
        changeChoosenTasks((prev) => [...prev, objToItem(task)]);
        setTaskCreateForm(false);
    };

    const handleSelectTasks = (selected: HomeworkTask[]) => {
        changeChoosenTasks((prev) => [...prev, ...arrayToItem(selected)]);
        setTaskSelectForm(false);
    };

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
                <form
                    ref={formRef}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <Container
                        direction="vertical"
                        gap="l"
                    >
                        <Input
                            name="hwTitle"
                            label={{
                                text: 'Заголовок домашнего задания',
                                type: 'h',
                                size: 4,
                            }}
                            placeholder="Например: Повторение "
                        />
                        <TextArea
                            textareaRef={textAreaRef}
                            name="hwDescr"
                            label={{
                                text: 'Описание домашнего задания',
                                type: 'h',
                                size: 4,
                            }}
                            placeholder="Можно оставить пустым"
                            border="border"
                        />
                        <Input
                            name="hwDeadline"
                            label={{
                                text: 'Срок сдачи',
                                type: 'h',
                                size: 4,
                            }}
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
                                <ListFC
                                    itemsState={[
                                        choosenTasks,
                                        changeChoosenTasks,
                                    ]}
                                    renderItem={HomeworkTaskItem}
                                    renderItemProps={{
                                        allowSelect: false,
                                        allowDelete: true,
                                    }}
                                />
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
                                    <Text
                                        type="p"
                                        weight="bold"
                                        size={1}
                                        classes={styles.addBtnText}
                                    >
                                        Новая
                                    </Text>
                                </Button>
                                <Button
                                    disabled={lock}
                                    classes={styles.setBtn}
                                    onClick={() => setTaskSelectForm(true)}
                                >
                                    <Icon
                                        name="ulist"
                                        classes={styles.setBtnIcon}
                                    />
                                    <Text
                                        type="p"
                                        weight="bold"
                                        size={1}
                                        classes={styles.setBtnText}
                                    >
                                        Выбрать
                                    </Text>
                                </Button>
                            </Container>
                        </Container>
                    </Container>
                </form>
                <Button
                    disabled={lock}
                    onClick={handleSubmit}
                    classes={styles.submit}
                >
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
                </Button>
            </Container>

            <Overlay
                isShowing={isTaskCreateFrom}
                closeOverlay={() => setTaskCreateForm(false)}
            >
                <TaskCreateForm onSubmitSuccess={handleCreateTaskSuccess} />
            </Overlay>
            <Overlay
                isShowing={isTaskSelectForm}
                closeOverlay={() => setTaskSelectForm(false)}
            >
                <HomeworkTaskSelect onSubmit={handleSelectTasks} />
            </Overlay>
        </>
    );
};

export default HomeworkCreateForm;
