import { useSendChatAttachesMutation } from "@app/features/chat/chatSlice";
import { HomeworkTask } from "@app/features/homeworkTask/homeworkTaskModel";
import { useCreateTaskMutation } from "@app/features/homeworkTask/homeworkTaskSlice";
import { ChatAttachmentsList } from "@components/ChatAttachmentsList/ChatAttachmentsList";
import Widget from "@components/Widget/Widget";
import { AttachFile } from "@ui-kit/AttachFile/AttachFile";
import Button from "@ui-kit/Button/Button";
import Container from "@ui-kit/Container/Container";
import Icon from "@ui-kit/Icon/Icon";
import TextArea from "@ui-kit/TextArea/TextArea";
import { UiComponentProps } from "@ui-kit/interfaces";
import { useEffect, useRef, useState } from "react";

interface TaskCreateFormProps extends UiComponentProps {
    onSubmitSuccess?: (t: HomeworkTask) => void;
}

const TaskCreateForm: React.FC<TaskCreateFormProps> = ({ onSubmitSuccess, classes }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [attaches, setAttaches] = useState<File[]>();
    const [uploadAttach, uploadAttachStatus] = useSendChatAttachesMutation();
    const [createTask, createTaskStatus] = useCreateTaskMutation();
    const [lock, setLock] = useState<boolean>(false);

    useEffect( () => {
        if(uploadAttachStatus.isLoading || createTaskStatus.isLoading) {
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
            <Widget
                classes={classes}
                title='Создание задания'
                footer={
                    <Button
                        onClick={handleSubmit}
                        disabled={lock}
                    >
                        Создать
                    </Button>
                }
            >
                <form
                    ref={formRef}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <Container>
                        <AttachFile
                            setFilesState={setAttaches}
                            maxFilesToAttach={1}
                        >
                            <Icon
                                name={'attachIcon'}
                                size={'large'}
                            />
                        </AttachFile>

                        <TextArea
                            labelText='Описание задачи'
                            placeholder='Опишите суть задачи'
                            minRows={4}
                            maxRows={8}
                            border='border'
                            name='descr'
                        />
                    </Container>
                    <ChatAttachmentsList useFiles={[attaches, setAttaches]} />
                </form>
            </Widget>
        </>
    );
}

export default TaskCreateForm;