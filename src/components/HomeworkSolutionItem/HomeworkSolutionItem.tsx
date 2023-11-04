import Avatar from '@ui-kit/Avatar/Avatar';
import Button from '@ui-kit/Button/Button';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import { UiComponentProps } from '@ui-kit/interfaces';
import React from 'react';
import Text from '@ui-kit/Text/Text';

import styles from './HomeworkSolutionItem.module.scss';
import { useGetHomeworkQuery } from 'app/features/api/homework/homeworkSlice';
import { useGetStudentQuery } from 'app/features/api/student/studentSlice';

interface HomeworkSolutionItemProps extends UiComponentProps {
    id: string | number;
    homeworkId: string | number;
    studentId: string | number;
    passTime?: number;
}

const HomeworkSolutionItem: React.FC<HomeworkSolutionItemProps> = ({
    homeworkId,
    studentId,
    passTime,
    onClick,
    classes,
}) => {
    // Тут нужно зарефакторить этот кал

    const homeworkResponse = useGetHomeworkQuery({ id: homeworkId });
    const homeworkData = homeworkResponse.data?.homework;

    let title = 'Неизвестное дз',
        deadline_time = undefined;
    if (homeworkData) {
        title = homeworkData.title;
        deadline_time = homeworkData.deadline_time;
    }

    const studentResponse = useGetStudentQuery({ id: studentId });
    const studentData = studentResponse.data?.student;

    let avatarSrc = '',
        name = 'Неизвестный ученик';
    if (studentData) {
        avatarSrc = studentData.avatarSrc;
        name = studentData.name;
    }

    let stateClassName = styles.notPass;
    let stateStr = 'Срок не ясен';

    if (passTime && deadline_time) {
        const date = new Date(passTime);
        date.toLocaleDateString();
        stateStr = 'Сдано ' + date.toLocaleDateString('ru-RU').slice(0, -5);
        if (passTime <= deadline_time) {
            stateClassName = styles.pass;
        } else {
            stateClassName = styles.passDelay;
        }
    }

    return (
        <Container
            classes={[styles.card, classes].join(' ')}
            direction="horizontal"
            onClick={onClick}
        >
            <Container
                classes={styles.wrapper}
                direction="horizontal"
            >
                <Avatar
                    classes={styles.avatar}
                    src={avatarSrc}
                    alt={name + 'avatar'}
                />
                <Container
                    classes={styles.wrapper}
                    direction="vertical"
                >
                    <Text
                        classes={[styles.text, styles.name].join(' ')}
                        type="h"
                        size={6}
                        weight="bold"
                    >
                        {name}
                    </Text>
                    <Text
                        classes={[styles.text, styles.title].join(' ')}
                        type="p"
                        size={6}
                        weight="regular"
                    >
                        {title}
                    </Text>
                </Container>
            </Container>
            <Container direction="horizontal">
                <Text
                    type="p"
                    size={2}
                    weight="bold"
                    classes={[styles.state, stateClassName].join(' ')}
                >
                    {stateStr}
                </Text>
                <Button
                    classes={styles.btn}
                    onClick={onClick}
                    type="link"
                >
                    <Icon
                        classes={styles.icon}
                        name="arrowRight"
                    />
                </Button>
            </Container>
        </Container>
    );
};

export default HomeworkSolutionItem;
