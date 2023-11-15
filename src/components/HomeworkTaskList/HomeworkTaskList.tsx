import React from 'react';
import { UiComponentProps } from "@ui-kit/interfaces";
import { HomeworkTask } from "@app/features/homeworkTask/homeworkTaskModel";
import EmptyItem from "@components/EmptyItem/EmptyItem";
import TaskItem from "@components/HomeworkTaskItem/HomeworkTaskItem";

interface HomeworkTaskListProps extends UiComponentProps {
    listState: [HomeworkTask[], React.Dispatch<React.SetStateAction<HomeworkTask[]>>];
    allowDelete?: boolean;
    onSelect ?: (item : HomeworkTask) => void;
    onDeselect ?: (item : HomeworkTask) => void;
}

const HomeworkTaskList: React.FC<HomeworkTaskListProps> = ({ listState, onDeselect, onSelect, allowDelete = false }) => {
    const [list, setList] = listState;

    const handleDelete = (id: number) => {
        setList(prev => {
            return prev.filter(item => item.id !== id);
        });
    }

    return (
        <>
            {!list.length ? <EmptyItem /> :
                list.map((t, i) => (
                    <React.Fragment key={t.id}>
                        <TaskItem
                            title={`Задание №${i + 1}`}
                            task={t}
                            onDelete={allowDelete ? handleDelete : undefined}
                            onSelect={onSelect}
                            onDeselect={onDeselect}
                        />
                    </React.Fragment>
                ))
            }
        </>
    );
};

export default HomeworkTaskList;
