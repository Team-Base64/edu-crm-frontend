import { HomeworkTask } from '@app/features/homeworkTask/homeworkTaskModel';
import { useGetTasksQuery } from '@app/features/homeworkTask/homeworkTaskSlice';
import Button from '@ui-kit/Button/Button';
import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useEffect } from 'react';

import styles from './HomeworkTaskSelect.module.scss';
import Icon from '@ui-kit/Icon/Icon';
import { useListItems } from '@ui-kit/List/hooks';
import { arrayToItem } from '@ui-kit/List/helpers';
import ListFC from '@ui-kit/List/List';
import HomeworkTaskItem from '@components/HomeworkTaskItem/HomeworkTaskItem';

interface HomeworkTaskSelectProps extends UiComponentProps {
    onSubmit?: (selected: HomeworkTask[]) => void;
}

const HomeworkTaskSelect: React.FC<HomeworkTaskSelectProps> = ({
    onSubmit,
}) => {
    const { data } = useGetTasksQuery(null);
    const [tasks, changeTasks] = useListItems([] as HomeworkTask[]);

    useEffect(() => {
        if (!data) return;
        changeTasks(arrayToItem(data.tasks));
    }, [data, changeTasks]);

    const handleSubmit = () => {
        onSubmit?.(tasks.filter((t) => t.selected));
        changeTasks((items) => items.filter((i) => !i.selected));
    };

    // const handleClear = () => {
    //     setListSelect([]);
    // }

    return (
        <>
            <Container
                direction="vertical"
                layout="defaultBase"
                gap="l"
                classes={styles.widget}
            >
                <Text
                    type="h"
                    size={3}
                    weight="bold"
                >
                    Выберите задания из списка
                </Text>

                <ListFC
                    itemsState={[tasks, changeTasks]}
                    renderItem={HomeworkTaskItem}
                    renderItemProps={{
                        allowSelect: true,
                        allowDelete: false,
                    }}
                />

                <Container classes={styles.nav}>
                    <Button
                        onClick={handleSubmit}
                        classes={styles.submit}
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
                            Прикрепить
                        </Text>
                    </Button>
                    {/* <Button onClick={handleClear}>
                        Очистить
                    </Button> */}
                </Container>
            </Container>
        </>
    );
};

export default HomeworkTaskSelect;
