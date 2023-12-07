import Avatar from '@ui-kit/Avatar/Avatar';
import Button from '@ui-kit/Button/Button';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import { UiComponentProps } from '@ui-kit/interfaces';
import React from 'react';
import Text, { TextProps } from '@ui-kit/Text/Text';

import styles from './HomeworkSolutionItem.module.scss';
import { useGetHomeworkQuery } from '@app/features/homework/homeworkSlice';
import { useGetStudentQuery } from '@app/features/stundent/stundentSlice';
import { HomeworkSolution } from '@app/features/homeworkSolution/homeworkSolutionModel';
import { getDelta } from 'utils/common/PrettyDate/common/delta';
import prettyDate from 'utils/common/PrettyDate/datePrettify';
import Updatable from '@ui-kit/Updatable/Updatable';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '@router/routes';

interface HomeworkSolutionItemProps extends UiComponentProps {
    data: HomeworkSolution;
}

const HomeworkSolutionItem: React.FC<HomeworkSolutionItemProps> = ({
    data,
    classes,
}) => {
    const { id, hwID, studentID, createTime } = data;
    const navigate = useNavigate();

    // Тут нужно зарефакторить этот кал
    const homeworkResponse = useGetHomeworkQuery({ id: hwID });
    const homeworkData = homeworkResponse.data?.homework;

    let title = 'Неизвестное дз',
        deadline_time = undefined;
    if (homeworkData) {
        title = homeworkData.title;
        deadline_time = homeworkData.deadlineTime;
        deadline_time = homeworkData.deadlineTime;
    }

    const studentResponse = useGetStudentQuery({ id: studentID });
    const studentData = studentResponse.data?.student;

    let avatarSrc = '',
        name = 'Неизвестный ученик';
    if (studentData) {
        avatarSrc = studentData.avatarSrc;
        name = studentData.name;
    }

    let stateClassName = styles.notPass;

    if (createTime && deadline_time) {
        if (getDelta(deadline_time, createTime) < 0) {
            stateClassName = styles.pass;
        } else {
            stateClassName = styles.passDelay;
        }
    }

    const handleClick: React.MouseEventHandler = (e) => {
        e.stopPropagation();
        return navigate(`/${AppRoutes.solutions}/${id}`);
    };

    return (
        <Container
            classes={[styles.card, classes].join(' ')}
            direction="horizontal"
            onClick={handleClick}
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
                        size={5}
                        weight="bold"
                    >
                        {name}
                    </Text>
                    <Text
                        classes={[styles.text, styles.title].join(' ')}
                        type="p"
                        size={1}
                        weight="regular"
                    >
                        {title}
                    </Text>
                </Container>
            </Container>
            <Container direction="horizontal">
                <Updatable
                    element={Text}
                    updateProps={(): TextProps => ({
                        type: 'p',
                        size: 2,
                        weight: 'bold',
                        classes: [styles.state, stateClassName].join(' '),
                        children: createTime
                            ? prettyDate(createTime)
                            : 'Срок не ясен',
                    })}
                    interval={1}
                />
                <Button
                    classes={styles.btn}
                    onClick={handleClick}
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
