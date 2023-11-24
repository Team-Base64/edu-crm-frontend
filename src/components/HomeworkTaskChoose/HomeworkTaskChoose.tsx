import Button from '@ui-kit/Button/Button';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import ListFC from '@ui-kit/List/List';
import Text from '@ui-kit/Text/Text';
import styles from './HomeworkTaskChoose.module.scss';
import React, {
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import Overlay from '@ui-kit/Overlay/Overlay';
import TaskCreateForm from '@components/HomeworkTaskCreateForm/HomeworkTaskCreateForm';
import { HomeworkTask } from '@app/features/homeworkTask/homeworkTaskModel';
import { Item } from '@ui-kit/List/types';
import { useGetTasksQuery } from '@app/features/homeworkTask/homeworkTaskSlice';
import { useListItems } from '@ui-kit/List/hooks';
import { arrayToItem, objToItem } from '@ui-kit/List/helpers';
import HomeworkTaskItem from '@components/HomeworkTaskItem/HomeworkTaskItem';
import EmptyItem from '@components/EmptyItem/EmptyItem';
import Input from '@ui-kit/Input/Input';
import { UiComponentProps } from '@ui-kit/interfaces';

interface HomeworkTaskChooseProps extends UiComponentProps {
    chooseState: [
        Item<HomeworkTask>[],
        React.Dispatch<React.SetStateAction<Item<HomeworkTask>[]>>,
    ];
    lock: boolean;
}

export type HomeworkTaskChooseRef = {
    clearSelect: () => void;
};

const HomeworkTaskChoose = React.forwardRef<
    HomeworkTaskChooseRef,
    HomeworkTaskChooseProps
>(({ lock, chooseState, classes }, ref) => {
    const { data } = useGetTasksQuery(null);
    const [, changeChoosen] = chooseState;

    const searchRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState<string>('');

    const [tasks, changeTasks] = useListItems<HomeworkTask>([]);
    const [isTaskCreateFrom, setTaskCreateForm] = useState<boolean>(false);

    useImperativeHandle(
        ref,
        () => ({
            clearSelect() {
                console.log('ClearSelect');
                changeTasks((items) =>
                    items.map((i) => ({ ...i, selected: false })),
                );
                setQuery('');
            },
        }),
        [changeTasks],
    );

    useEffect(() => {
        if (!data) return;
        changeTasks(arrayToItem(data.tasks));
    }, [changeTasks, data]);

    useEffect(() => {
        changeChoosen(tasks.filter((t) => t.selected));
    }, [tasks, changeChoosen]);

    const handleNewTask = (task: HomeworkTask) => {
        changeTasks((items) => [
            ...items,
            { ...objToItem(task), selected: true },
        ]);
        setTaskCreateForm(false);
    };

    const allTasks = useCallback(() => {
        return tasks
            .filter((t) => !t.selected)
            .filter((t) => {
                if (!query.length) {
                    return t;
                }
                return [t.description, t.id]
                    .join(' ')
                    .toLowerCase()
                    .includes(query.toLocaleLowerCase());
            });
    }, [tasks, query]);

    return (
        <>
            <Container
                classes={[styles.widget, classes].join(' ')}
                direction="grid"
                gap="l"
            >
                <Container
                    direction="vertical"
                    classes={styles.content}
                >
                    <Text
                        type="h"
                        size={4}
                        weight="bold"
                    >
                        Прикреплённые
                    </Text>

                    <ListFC
                        itemsState={[
                            tasks.filter((t) => t.selected),
                            changeTasks,
                        ]}
                        renderItem={HomeworkTaskItem}
                        renderItemProps={{
                            allowDelete: false,
                            allowSelect: true,
                        }}
                        classes={styles.list}
                        containerProps={{ classes: styles.listContainer }}
                    >
                        <EmptyItem text="Не выбрано ни одной задачи" />
                    </ListFC>
                </Container>
                <Container
                    direction="vertical"
                    classes={styles.content}
                >
                    <Text
                        type="h"
                        size={4}
                        weight="bold"
                    >
                        Банк задач
                    </Text>
                    <Container classes={styles.nav}>
                        <Input
                            inputRef={searchRef}
                            icon={<Icon name="searchIcon" />}
                            button={
                                <Icon
                                    name="close"
                                    onClick={() => {
                                        if (!searchRef.current) return;
                                        searchRef.current.value = '';
                                    }}
                                />
                            }
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Button
                            disabled={lock}
                            onClick={() => setTaskCreateForm(true)}
                            classes={styles.add}
                        >
                            <Icon
                                name="addLine"
                                classes={styles.icon}
                            />
                            <Text
                                type="p"
                                weight="bold"
                                size={1}
                                classes={styles.text}
                            >
                                Новая
                            </Text>
                        </Button>
                    </Container>

                    <ListFC
                        itemsState={[allTasks(), changeTasks]}
                        renderItem={HomeworkTaskItem}
                        renderItemProps={{
                            allowDelete: false,
                            allowSelect: true,
                        }}
                        classes={styles.list}
                        containerProps={{ classes: styles.listContainer }}
                    >
                        <EmptyItem text="Задачи не найдены" />
                    </ListFC>
                </Container>
            </Container>
            <Overlay
                isShowing={isTaskCreateFrom}
                closeOverlay={() => setTaskCreateForm(false)}
            >
                <TaskCreateForm onSubmitSuccess={handleNewTask} />
            </Overlay>
        </>
    );
});

export default HomeworkTaskChoose;
