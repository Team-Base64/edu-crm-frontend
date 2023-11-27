import { HomeworkSolution } from '@app/features/homeworkSolution/homeworkSolutionModel';
import Container from '@ui-kit/Container/Container';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useEffect, useState } from 'react';
import styles from './SolutionHeader.module.scss';
import Text, { TextProps } from '@ui-kit/Text/Text';
import { ClassMemberItem } from '@components/ClassMemberItem/ClassMemberItem';
import { useGetHomeworkQuery } from '@app/features/homework/homeworkSlice';
import getDate from 'utils/common/PrettyDate/common/date';
import getTime from 'utils/common/PrettyDate/common/time';
import prettyDate from 'utils/common/PrettyDate/datePrettify';
import { getDelta } from 'utils/common/PrettyDate/common/delta';
import Updatable from '@ui-kit/Updatable/Updatable';
import SolutionSelect from '@components/Solution/SolutionSelect';
import ShowQueryState from '@components/ShowQueryState/ShowQueryState';


interface SolutionHeaderHomeworkDataProps extends UiComponentProps {
    homeworkID: number;
}

export const SolutionHeaderHomeworkData: React.FC<SolutionHeaderHomeworkDataProps> = ({
    homeworkID,
    classes
}) => {
    const { data, isSuccess, ...status } = useGetHomeworkQuery({
        id: homeworkID,
    });

    return (
        <>
            <ShowQueryState status={status} />
            {isSuccess && (
                <Container
                    direction="vertical"
                    classes={classes}
                >
                    <Text
                        type="h"
                        size={4}
                        weight="bold"
                    >
                        Заголовок:
                    </Text>
                    <Text
                        type="p"
                        size={1}
                    >
                        {data.homework.title.length
                            ? data.homework.title
                            : 'Без заголовка'}
                    </Text>
                    <Text
                        type="h"
                        size={4}
                        weight="bold"
                    >
                        Описание:
                    </Text>
                    <Text
                        type="p"
                        size={1}
                    >
                        {data.homework.description.length
                            ? data.homework.description
                            : 'Без описания'}
                    </Text>
                    <Text
                        type="h"
                        size={4}
                        weight="bold"
                    >
                        Сроки:
                    </Text>
                    <Text
                        type="p"
                        size={1}
                    >
                        {[
                            'От',
                            getDate(data.homework.createTime),
                            getTime(data.homework.createTime),
                        ].join(' ')}
                    </Text>
                    <Text
                        type="p"
                        size={1}
                    >
                        {[
                            'До',
                            getDate(data.homework.deadlineTime),
                            getTime(data.homework.deadlineTime),
                        ].join(' ')}
                    </Text>
                </Container>
            )}
        </>
    );
};

interface SolutionHeaderPassStatusProps {
    solution: HomeworkSolution;
}

const SolutionHeaderPassStatus: React.FC<SolutionHeaderPassStatusProps> = ({
    solution,
}) => {
    const { data, isSuccess, ...status } = useGetHomeworkQuery({
        id: solution.hwID,
    });
    const [passStatus, changePassStatus] = useState<React.ReactNode>('');

    useEffect(() => {
        if (!data) return;
        const inTime =
            getDelta(data.homework.deadlineTime, solution.createTime) > 0;
        changePassStatus(
            <Text
                type="p"
                size={1}
                classes={inTime ? styles.intime : styles.outtime}
            >
                {inTime ? 'В срок' : 'После срока'}
            </Text>,
        );
    }, [data, changePassStatus, solution.createTime]);

    return (
        <>
            <ShowQueryState status={status} />
            {isSuccess && (
                <>
                    <Updatable
                        element={Text}
                        updateProps={(): TextProps => ({
                            type: 'p',
                            size: 1,
                            children: `Сдано ${prettyDate(
                                solution.createTime,
                            )}`,
                        })}
                        interval={1}
                    />
                    {passStatus}
                </>
            )}
        </>
    );
};

interface SolutionHeaderProps extends UiComponentProps {
    solution: HomeworkSolution;
};

const SolutionHeader: React.FC<SolutionHeaderProps> = ({
    solution,
    classes,
}) => {
    return (
        <Container
            gap="l"
            direction="vertical"
            layout="defaultBase"
            classes={[classes, styles.widget].join(' ')}
        >
            <Text
                type="h"
                size={3}
                weight="bold"
            >
                Решение домашнего задания
            </Text>
            <Container direction="vertical">
                <Container classes={styles.content}>
                    <Text
                        type="h"
                        size={4}
                        weight="bold"
                        classes={styles.contentTitle}
                    >
                        Выполнил:
                    </Text>
                    <Container
                        gap="l"
                        classes={styles.contentItem}
                    >
                        <ClassMemberItem studentID={solution.studentID} />
                    </Container>
                </Container>
                <Container classes={styles.content}>
                    <Text
                        type="h"
                        size={4}
                        weight="bold"
                        classes={styles.contentTitle}
                    >
                        Домашнее задание:
                    </Text>
                    <Container
                        direction="vertical"
                        classes={[styles.contentItem].join(' ')}
                    >
                        <SolutionHeaderHomeworkData
                            homeworkID={Number(solution.hwID)}
                        />
                    </Container>
                </Container>
                <Container classes={styles.content}>
                    <Text
                        type="h"
                        size={4}
                        weight="bold"
                        classes={styles.contentTitle}
                    >
                        Статус:
                    </Text>
                    <Container
                        direction="vertical"
                        classes={styles.contentItem}
                    >
                        <SolutionHeaderPassStatus solution={solution} />
                    </Container>
                </Container>
                <Container classes={styles.content}>
                    <Text
                        type="h"
                        size={4}
                        weight="bold"
                        classes={styles.contentTitle}
                    >
                        История решений:
                    </Text>
                    <Container
                        direction="vertical"
                        classes={styles.contentItem}
                    >
                        <SolutionSelect solution={solution} />
                    </Container>
                </Container>
            </Container>
        </Container>
    );
};

export default SolutionHeader;
