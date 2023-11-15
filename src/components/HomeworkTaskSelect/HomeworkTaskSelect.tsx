import { HomeworkTask } from '@app/features/homeworkTask/homeworkTaskModel';
import { useGetTasksQuery } from '@app/features/homeworkTask/homeworkTaskSlice';
import HomeworkTaskList from '@components/HomeworkTaskList/HomeworkTaskList';
import Button from '@ui-kit/Button/Button';
import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useEffect, useState } from 'react';

import styles from './HomeworkTaskSelect.module.scss';
import Icon from '@ui-kit/Icon/Icon';

interface HomeworkTaskSelectProps extends UiComponentProps {
    onSubmit?: (selected: HomeworkTask[]) => void;
}

const HomeworkTaskSelect: React.FC<HomeworkTaskSelectProps> = ({ onSubmit }) => {
    const [list, setList] = useState<HomeworkTask[]>([]);
    const [listSelect, setListSelect] = useState<HomeworkTask[]>([]);
    const { data } = useGetTasksQuery(null);

    useEffect(() => {
        console.log(listSelect);
    }, [listSelect]);

    useEffect(() => {
        if (!data) return;
        setList(data.tasks);
    }, [data]);

    const handleSubmit = () => {
        onSubmit?.(listSelect);
        setListSelect([]);
    }

    // const handleClear = () => {
    //     setListSelect([]);
    // }

    return (
        <>
            <Container direction='vertical' layout='defaultBase' gap='l' classes={styles.widget}>
                <Text type='h' size={3} weight='bold'>
                    Выберите задания из списка
                </Text>
                <HomeworkTaskList
                    listState={[list, setList]}
                    onSelect={(t) => {
                        setListSelect(p => [...p, t])
                    }}
                    onDeselect={(t) => {
                        setListSelect(p => p.filter(i => i.id !== t.id))
                    }}
                />
                <Container classes={styles.nav}>
                    <Button onClick={handleSubmit} classes={styles.submit}>
                        <Icon name='approve' classes={styles.submitIcon}/>
                        <Text type='p' size={1} weight='bold' classes={styles.submitText} >
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
