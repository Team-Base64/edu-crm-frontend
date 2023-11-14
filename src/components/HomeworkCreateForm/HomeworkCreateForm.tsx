
import React, { useEffect, useRef, useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import Container from '@ui-kit/Container/Container';
import Input from '@ui-kit/Input/Input';
import TextArea from '@ui-kit/TextArea/TextArea';
import Button from '@ui-kit/Button/Button';
import Icon from '@ui-kit/Icon/Icon';
import styles from './HomeworkCreateForm.module.scss';
import Overlay from '@ui-kit/Overlay/Overlay';
import Widget from '@components/Widget/Widget';
import Text from '@ui-kit/Text/Text';
import { useCreateHomeworkMutation } from '@app/features/homework/homeworkSlice';

import HomeworkTaskList from '@components/HomeworkTaskList/HomeworkTaskList';
import { HomeworkTask } from '@app/features/homeworkTask/homeworkTaskModel';
import TaskCreateForm from '@components/HomeworkTaskCreateForm/HomeworkTaskCreateForm';
import HomeworkTaskSelect from '@components/HomeworkTaskSelect/HomeworkTaskSelect';

interface HomeworkCreateFormProps extends UiComponentProps {
    onSubmitSuccess?: () => void;
    classId: string | number;
}

const HomeworkCreateForm: React.FC<HomeworkCreateFormProps> = ({ onSubmitSuccess, classId }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [tasks, setTasks] = useState<HomeworkTask[]>([]);

    const [isTaskCreateFrom, setTaskCreateForm] = useState<boolean>(false);
    const [isTaskSelectForm, setTaskSelectForm] = useState<boolean>(false);

    const [lock, setLock] = useState<boolean>(false);


    const [createHW, createStatus] = useCreateHomeworkMutation();

    useEffect(() => {
        if (createStatus.isLoading) {
            setLock(true);
        } else {
            setLock(false);
        }
    }, [createStatus, setLock]);


    const handleSubmit = async () => {
        console.log('Handle submit');

        const form = formRef.current;
        if (!form) {
            return;
        }

        const title = form.hwTitle.value;
        const descr = form.hwDescr.value;
        const deadline: Date = form.hwDeadline.valueAsDate;

        if (!title || !deadline) {
            return;
        }
        console.log('OK');

        if (!descr && !tasks.length) {
            return;
        }

        console.log('OK 2');
        createHW({
            payload: {
                classID: Number(classId),
                deadlineTime: deadline.toISOString(),
                title: title,
                description: descr,
                tasks: tasks.map(t => t.id),
            }
        }).then(() => {
            form.hwTitle.value = '';
            form.hwDescr.value = '';
            form.hwDeadline.value = '';
            setTasks([]);

            onSubmitSuccess?.();
        });

    }

    const handleCreateTaskSuccess = (task: HomeworkTask) => {
        setTasks(prev => [...prev, task]);
        setTaskCreateForm(false);
    }

    const handleSelectTasks = (selected: HomeworkTask[]) => {
        setTasks(prev => [...prev, ...selected]);
        setTaskSelectForm(false);
    }

    return (
        <>
            <Widget
                classes={styles.form}
                title='Создание Домашнего задания'
                footer={
                    <Button
                        disabled={lock}
                        onClick={handleSubmit}>
                        Создать
                    </Button>
                }
            >
                <form ref={formRef} onSubmit={e => e.preventDefault()}>
                    <Input
                        name='hwTitle'
                        label='Заголовок домашнего задания'
                        placeholder='Например: Повторение '
                    />
                    <TextArea
                        name='hwDescr'
                        labelText='Описание домашнего задания'
                        placeholder='Можно оставить пустым'
                        border='border'
                    />
                    <Input
                        name='hwDeadline'
                        label='Срок сдачи'
                        type='date'
                    />

                    <Container direction='vertical' classes={styles.content}>
                        <Text type='h' size={4} weight='bold'>
                            Список задач:
                        </Text>
                        <Container direction='vertical' classes={styles.list}>
                            <HomeworkTaskList
                                listState={[tasks, setTasks]}
                                allowDelete
                            />
                        </Container>
                        <Container direction='horizontal' classes={styles.contentNav}>
                            <Button
                                disabled={lock}

                                onClick={() => setTaskCreateForm(true)} classes={styles.addBtn}>
                                <Icon name='addLine' classes={styles.addBtnIcon} />
                                Создать задание
                            </Button>
                            <Button
                                disabled={lock}
                                classes={styles.setBtn}
                                onClick={() => setTaskSelectForm(true)}
                            >
                                <Icon name='layoutLine' classes={styles.setBtnIcon} />
                                Выбрать задание
                            </Button>
                        </Container>
                    </Container>
                </form>
            </Widget>

            <Overlay isShowing={isTaskCreateFrom} closeOverlay={() => setTaskCreateForm(false)} >
                <TaskCreateForm
                    onSubmitSuccess={handleCreateTaskSuccess}
                />
            </Overlay>
            <Overlay isShowing={isTaskSelectForm} closeOverlay={() => setTaskSelectForm(false)} >
                <HomeworkTaskSelect
                    onSubmit={handleSelectTasks}
                />
            </Overlay>
        </>
    );
};

export default HomeworkCreateForm;
