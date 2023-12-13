import { HomeworkTask } from '@app/features/homeworkTask/homeworkTaskModel';
import { useCreateTaskMutation } from '@app/features/homeworkTask/homeworkTaskSlice';
import { AttachFile } from '@ui-kit/AttachFile/AttachFile';
import Button from '@ui-kit/Button/Button';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import Text from '@ui-kit/Text/Text';
import TextArea from '@ui-kit/TextArea/TextArea';
import { UiComponentProps } from '@ui-kit/interfaces';
import { useRef, useState } from 'react';

import styles from './HomeworkTaskCreateForm.module.scss';
import { AttachmentsList } from '@ui-kit/AttachmentsList/AttachmentsList';
import useSendAttaches from 'hooks/useSendAttaches';
import { SerializeAttachesFromBackend } from 'utils/attaches/attachesSerializers';
import useForm from '@ui-kit/_hooks/useForm';

interface TaskCreateFormProps extends UiComponentProps {
    onSubmitSuccess?: (t: HomeworkTask) => void;
}

const TaskCreateForm: React.FC<TaskCreateFormProps> = ({
    onSubmitSuccess,
    classes,
}) => {
    const { attaches, setAttaches, attachesSendPromise } =
        useSendAttaches('homework');
    const [createTask] = useCreateTaskMutation();
    const [lock, setLock] = useState<boolean>(false);

    const [form, isValid, clear] = useForm({
        description: {
            rules: {},
            initial: '',
        },
    });

    const handleSubmit = async () => {
        if (
            !isValid ||
            (!form.description.value.trim().length && !attaches.length)
        ) {
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
                    description: form.description.value.trim(),
                    attaches: loaded,
                },
            });

            if ('error' in resp) throw new Error(JSON.stringify(resp.error));

            const id = resp.data.id;

            setAttaches([]);
            clear();

            onSubmitSuccess?.({
                id: id,
                description: form.description.value,
                attaches: loaded,
            });
        } catch (e) {
            console.log(e);
        } finally {
            setLock(false);
        }
    };

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    return (
        <>
            <Container
                direction="vertical"
                layout="defaultBase"
                gap="l"
                classes={styles.widget + ' ' + classes}
            >
                <Text
                    type="h"
                    size={3}
                    weight="bold"
                >
                    Создание задания
                </Text>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className={styles.form}
                >
                    <Container classes={styles.content}>
                        <TextArea
                            textareaRef={textareaRef}
                            classes={styles.area}
                            label={{
                                text: 'Описание:',
                                type: 'h',
                                size: 4,
                            }}
                            placeholder="Обязательно, если нет вложений"
                            autoResize
                            minRows={4}
                            focusRows={8}
                            maxRows={16}
                            errors={form.description.errors}
                            onChange={form.description.changeMiddleware()}
                            textareaText={form.description.value}
                        />

                        <AttachFile
                            useFiles={[attaches, setAttaches]}
                            maxFilesToAttach={10}
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
                    disabled={
                        lock ||
                        !isValid ||
                        (!form.description.value.trim().length &&
                            !attaches.length)
                    }
                >
                    <Icon
                        name="approve"
                        classes={styles.submitIcon}
                    />
                    <Text
                        type="p"
                        size={1}
                        weight="bold"
                        classes={styles.submitText}
                    >
                        Создать
                    </Text>
                </Button>
            </Container>
        </>
    );
};

export default TaskCreateForm;
