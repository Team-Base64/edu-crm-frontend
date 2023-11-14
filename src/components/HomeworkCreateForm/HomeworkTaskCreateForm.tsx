import { HomeworkTaskRaw } from '@app/features/homework/homeworkModel';
import { AttachmentsList } from '@ui-kit/AttachmentsList/AttachmentsList.tsx';
import Widget from '@components/Widget/Widget';
import { AttachFile } from '@ui-kit/AttachFile/AttachFile';
import Button from '@ui-kit/Button/Button';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import TextArea from '@ui-kit/TextArea/TextArea';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useRef, useState } from 'react';

interface TaskCreateFormProps extends UiComponentProps {
    addTask: (t: HomeworkTaskRaw) => void;
}

const TaskCreateForm: React.FC<TaskCreateFormProps> = ({
    addTask,
    classes,
}) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [attaches, setAttaches] = useState<File[]>();

    const handleSubmit = () => {
        const form = formRef.current;
        if (!form) {
            return;
        }

        const task: HomeworkTaskRaw = {
            description: form.descr.value || '',
            id: -1, // Новая таска
            attach: attaches?.at(0),
        };
        addTask(task);
    };

    return (
        <>
            <Widget
                classes={classes}
                title="Создание задания"
                footer={<Button onClick={handleSubmit}>Создать</Button>}
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
                            labelText="Описание задачи"
                            placeholder="Опишите суть задачи"
                            minRows={4}
                            maxRows={8}
                            border="border"
                            name="descr"
                        />
                    </Container>
                    <AttachmentsList useFiles={[attaches, setAttaches]} />
                </form>
            </Widget>
        </>
    );
};

export default TaskCreateForm;
