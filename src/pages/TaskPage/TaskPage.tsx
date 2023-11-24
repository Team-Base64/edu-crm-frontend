import React, { useEffect, useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import Container from '@ui-kit/Container/Container';
import styles from './TaskPage.module.scss';
import Text from '@ui-kit/Text/Text';
import Button from '@ui-kit/Button/Button';
import Icon from '@ui-kit/Icon/Icon';
import Overlay from '@ui-kit/Overlay/Overlay';
import { HomeworkTask } from '@app/features/homeworkTask/homeworkTaskModel';
import { useGetTasksQuery } from '@app/features/homeworkTask/homeworkTaskSlice';
import TaskCreateForm from '@components/HomeworkTaskCreateForm/HomeworkTaskCreateForm';
import ListFC from '@ui-kit/List/List';
import HomeworkTaskItem from '@components/HomeworkTaskItem/HomeworkTaskItem';
import { useListItems } from '@ui-kit/List/hooks';
import { arrayToItem } from '@ui-kit/List/helpers';

interface TaskPageProps extends UiComponentProps { }

const TaskPage: React.FC<TaskPageProps> = () => {
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
    const [tasks, setTasks] = useListItems([] as HomeworkTask[]);
    const { data } = useGetTasksQuery(null);

    useEffect(() => {
        if (!data) return;
        setTasks(arrayToItem(data.tasks));
    }, [data, setTasks]);

    return (
        <>
            <Container
                direction={'vertical'}
                classes={styles.page}
                layout={'defaultBase'}
                gap={'l'}
            >
                <Container
                    direction="horizontal"
                    classes={styles.header}
                >
                    <Text
                        type={'h'}
                        size={3}
                        weight={'bold'}
                    >
                        Банк ваших заданий:
                    </Text>
                    <Button onClick={() => setShowCreateForm(true)}>
                        <Icon
                            name="addLine"
                            classes={styles.btnIcon}
                        />
                        <Text
                            type="p"
                            size={1}
                            weight="bold"
                            classes={styles.btnText}
                        >
                            Добавить задачу
                        </Text>
                    </Button>
                </Container>
                <ListFC
                    itemsState={[tasks, setTasks]}
                    renderItem={HomeworkTaskItem}
                    renderItemProps={{
                        allowDelete: false,
                        allowSelect: false,
                        classes: styles.listItem,
                    }}
                    containerProps={{
                        direction:'grid',
                        classes: styles.listContainer
                    }}
                    classes={styles.list}
                />
            </Container>
            <Overlay
                isShowing={showCreateForm}
                closeOverlay={() => setShowCreateForm(false)}
            >
                <TaskCreateForm
                    onSubmitSuccess={() => setShowCreateForm(false)}
                />
            </Overlay>
        </>
    );
};

export default TaskPage;
