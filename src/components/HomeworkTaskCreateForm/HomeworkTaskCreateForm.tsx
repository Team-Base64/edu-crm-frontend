import { HomeworkTask } from "@app/features/homeworkTask/homeworkTaskModel";
import { useCreateTaskMutation } from "@app/features/homeworkTask/homeworkTaskSlice";
import { AttachFile } from "@ui-kit/AttachFile/AttachFile";
import Button from "@ui-kit/Button/Button";
import Container from "@ui-kit/Container/Container";
import Icon from "@ui-kit/Icon/Icon";
import Text from "@ui-kit/Text/Text";
import TextArea from "@ui-kit/TextArea/TextArea";
import { UiComponentProps } from "@ui-kit/interfaces";
import { useRef, useState } from "react";

import styles from './HomeworkTaskCreateForm.module.scss';
import { AttachmentsList } from "@ui-kit/AttachmentsList/AttachmentsList";
import useSendAttaches from "hooks/useSendAttaches";
import { SerializeAttachesFromBackend } from "utils/attaches/attachesSerializers";

interface TaskCreateFormProps extends UiComponentProps {
    onSubmitSuccess?: (t: HomeworkTask) => void;
}

const TaskCreateForm: React.FC<TaskCreateFormProps> = ({ onSubmitSuccess, classes }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const { attaches, setAttaches, attachesSendPromise } = useSendAttaches('homework');
    const [createTask] = useCreateTaskMutation();
    const [lock, setLock] = useState<boolean>(false);

    const handleSubmit = async () => {
        const form = formRef.current;
        if (!form) {
            return;
        }

        const description = form.descr.value as string;
        if (!description.length && !attaches?.length) {
            return;
        }


        let loaded: string[] = [];

        setLock(true);

        try {
            if (attaches) {
                const result = await attachesSendPromise();
                loaded = SerializeAttachesFromBackend(result);
            }

            const resp = await createTask({
                payload: {
                    description: description,
                    attach: loaded[0] || '',
                }
            });

            if ('data' in resp) {
                const id = resp.data.id;

                onSubmitSuccess?.({
                    id: id,
                    description: description,
                    attach: loaded.at(0) || '',
                });

                setAttaches([]);
                form.descr.value = '';

            }
        } catch (e) {
            console.log(e);
        }

        setLock(false);
    }

    return (
        <>
            <Container direction='vertical' layout='defaultBase' gap='l' classes={styles.widget + ' ' + classes}>
                <Text type='h' size={3} weight='bold'>
                    Создание задания
                </Text>
                <form
                    ref={formRef}
                    onSubmit={(e) => e.preventDefault()}
                    className={styles.form}
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
                            useFiles={[attaches, setAttaches]}
                            maxFilesToAttach={1}
                        >
                            <Icon
                                name={'attachIcon'}
                                size={'large'}
                            />
                        </AttachFile>
                    </Container>
                </form>

                <AttachmentsList useFiles={[attaches, setAttaches]} />

                <Button
                    onClick={handleSubmit}
                    disabled={lock}
                >
                    <Icon name='approve' classes={styles.submitIcon}/>
                    <Text type='p' size={1} weight='bold' classes={styles.submitText}>
                        Создать
                    </Text>
                </Button>
            </Container>
        </>
    );
}

export default TaskCreateForm;