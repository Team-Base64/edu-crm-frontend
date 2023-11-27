import React, { useCallback, useEffect, useRef, useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import Container from '@ui-kit/Container/Container';
import Input from '@ui-kit/Input/Input';
import TextArea from '@ui-kit/TextArea/TextArea';
import Button from '@ui-kit/Button/Button';
import Icon from '@ui-kit/Icon/Icon';
import styles from './HomeworkCreateForm.module.scss';
import Text from '@ui-kit/Text/Text';
import { useCreateHomeworkMutation } from '@app/features/homework/homeworkSlice';
import { HomeworkTask } from '@app/features/homeworkTask/homeworkTaskModel';
import { useListItems } from '@ui-kit/List/hooks';
import HomeworkTaskChoose, {
    HomeworkTaskChooseRef,
} from '@components/HomeworkTaskChoose/HomeworkTaskChoose';

interface HomeworkCreateFormProps extends UiComponentProps {
    onSubmitSuccess?: () => void;
    classId: string | number;
}

const HomeworkCreateForm: React.FC<HomeworkCreateFormProps> = ({
    onSubmitSuccess,
    classId,
}) => {
    const formRef = useRef<HTMLFormElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const chooseRef = useRef<HomeworkTaskChooseRef>(null);

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

    const handleSubmit = useCallback(async () => {
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
            chooseRef.current?.clearSelect();

            onSubmitSuccess?.();
        });
    }, [chooseRef, choosenTasks, classId, createHW, onSubmitSuccess]);

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
                    <form
                        ref={formRef}
                        onSubmit={(e) => e.preventDefault()}
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
        </>
    );
};

export default HomeworkCreateForm;
