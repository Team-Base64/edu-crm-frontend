import { useSendChatAttachesMutation } from "@app/features/chat/chatSlice";
import { HomeworkTask } from "@app/features/homeworkTask/homeworkTaskModel";
import { useCreateTaskMutation } from "@app/features/homeworkTask/homeworkTaskSlice";
import { ChatAttachmentsList } from "@components/ChatAttachmentsList/ChatAttachmentsList";
import Widget from "@components/Widget/Widget";
import { AttachFile } from "@ui-kit/AttachFile/AttachFile";
import Button from "@ui-kit/Button/Button";
import Container from "@ui-kit/Container/Container";
import Icon from "@ui-kit/Icon/Icon";
import Text from "@ui-kit/Text/Text";
import TextArea from "@ui-kit/TextArea/TextArea";
import { UiComponentProps } from "@ui-kit/interfaces";
import { useEffect, useRef, useState } from "react";

import styles from './HomeworkTaskCreateForm.module.scss';

interface TaskCreateFormProps extends UiComponentProps {
    onSubmitSuccess?: (t: HomeworkTask) => void;
}

const TaskCreateForm: React.FC<TaskCreateFormProps> = ({ onSubmitSuccess, classes }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [attaches, setAttaches] = useState<File[]>();
    const [uploadAttach, uploadAttachStatus] = useSendChatAttachesMutation();
    const [createTask, createTaskStatus] = useCreateTaskMutation();
    const [lock, setLock] = useState<boolean>(false);

    useEffect(() => {
        if (uploadAttachStatus.isLoading || createTaskStatus.isLoading) {
            setLock(true);
        } else {
            setLock(false);
        }
    }, [uploadAttachStatus, createTaskStatus, setLock]);

    const handleSubmit = async () => {
        const form = formRef.current;
        if (!form) {
            return;
        }

        const description = form.descr.value as string;
        if (!description.length && !attaches?.length) {
            return;
        }

        const loadedAttaches: string[] = [];
        if (attaches) {
            for (let attach of attaches) {
                const resp = await uploadAttach({ type: 'homework', attaches: [attach] });
                if ('data' in resp) {
                    loadedAttaches.push(resp.data.file);
                }
            }
        }

        const resp = await createTask({
            payload: {
                description: description,
                attach: loadedAttaches.at(0),
            }
        });

        if ('data' in resp) {
            const id = resp.data.id;

            onSubmitSuccess?.({
                id: id,
                description: description,
                attach: loadedAttaches.at(0),
            });

            setAttaches([]);
            form.descr.value = '';
        }

    }

    return (
        <>
            <Container direction='vertical' layout='defaultBase' gap='l' classes={styles.widget}>
                <Text type='h' size={3} weight='bold'>
                    Создание задания
                </Text>
                <form
                    ref={formRef}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <Container classes={styles.content}>
                        <TextArea
                            classes={styles.area}
                            labelText='Описание задачи'
                            placeholder='Опишите суть задачи'
                            minRows={4}
                            maxRows={8}
                            border='border'
                            name='descr'
                        />

                        <AttachFile
                            setFilesState={setAttaches}
                            maxFilesToAttach={1}
                        >
                            <Icon
                                name={'attachIcon'}
                                size={'large'}
                            />
                        </AttachFile>
                    </Container>
                    <ChatAttachmentsList useFiles={[attaches, setAttaches]} />
                </form>
                <Button
                    onClick={handleSubmit}
                    disabled={lock}
                >
                    <Text type='p' size={1} weight='bold' classes={styles.submitText}>
                        Создать
                    </Text>
                </Button>
            </Container>
        </>
    );
}

export default TaskCreateForm;