import { Homework } from "@app/features/homework/homeworkModel";
import { HomeworkTask } from "@app/features/homeworkTask/homeworkTaskModel";
import { useGetTasksQuery } from "@app/features/homeworkTask/homeworkTaskSlice";
import EmptyItem from "@components/EmptyItem/EmptyItem";
import HomeworkTaskItem from "@components/HomeworkTaskItem/HomeworkTaskItem";
import Container from "@ui-kit/Container/Container";
import Icon from "@ui-kit/Icon/Icon";
import ListFC from "@ui-kit/List/List";
import { arrayToItem } from "@ui-kit/List/helpers";
import { useListItems } from "@ui-kit/List/hooks";
import Spinner from "@ui-kit/Spinner/Spinner";
import Text from "@ui-kit/Text/Text";
import { UiComponentProps } from "@ui-kit/interfaces";
import React, { useEffect } from "react";

interface HomeworkTaskListProps extends UiComponentProps {
    homework: Homework;
}

const HomeworkTaskList: React.FC<HomeworkTaskListProps> = ({ homework, classes }) => {
    const { data, isLoading, isError, isSuccess } = useGetTasksQuery(null);
    const [tasks, setTasks] = useListItems([] as HomeworkTask[]);

    useEffect(() => {
        if (!data) return;
        setTasks(
            arrayToItem(
                data.tasks
                    .filter(t => homework.tasks.includes(t.id))
            )
        );
    }, [setTasks, data?.tasks]);

    return (
        <>
            {isLoading && (
                <Container>
                    <Spinner />
                    <Text
                        type="p"
                        size={1}
                        weight="regular"
                    >
                        Загрузка
                    </Text>
                </Container>
            )}
            {isError && (
                <Container>
                    <Icon name="alert" />
                    <Text
                        type="p"
                        size={1}
                        weight="regular"
                    >
                        Произошла ошибка
                    </Text>
                </Container>
            )}
            {isSuccess && (
                <ListFC
                    itemsState={[tasks, setTasks]}
                    renderItem={HomeworkTaskItem}
                    renderItemProps={{}}
                    classes={classes}
                >
                    <EmptyItem text="Задачи не прикреплены" />
                </ListFC>
            )}
        </>
    );
}

export default HomeworkTaskList;