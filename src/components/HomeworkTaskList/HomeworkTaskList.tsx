import { Homework } from "@app/features/homework/homeworkModel";
import { HomeworkTask } from "@app/features/homeworkTask/homeworkTaskModel";
import { useGetTasksQuery } from "@app/features/homeworkTask/homeworkTaskSlice";
import EmptyItem from "@components/EmptyItem/EmptyItem";
import HomeworkTaskItem from "@components/HomeworkTaskItem/HomeworkTaskItem";
import ShowQueryState from "@components/ShowQueryState/ShowQueryState";
import ListFC from "@ui-kit/List/List";
import { arrayToItem } from "@ui-kit/List/helpers";
import { useListItems } from "@ui-kit/List/hooks";
import { UiComponentProps } from "@ui-kit/interfaces";
import React, { useEffect } from "react";

interface HomeworkTaskListProps extends UiComponentProps {
    homework: Homework;
}

const HomeworkTaskList: React.FC<HomeworkTaskListProps> = ({ homework, classes }) => {
    const { data, isSuccess, ...status } = useGetTasksQuery(null);
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
            <ShowQueryState status={status}/>
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