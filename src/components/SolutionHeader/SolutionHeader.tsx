import { HomeworkSolution } from "@app/features/homeworkSolution/homeworkSolutionModel";
import Container from "@ui-kit/Container/Container";
import { UiComponentProps } from "@ui-kit/interfaces";
import React, { useEffect, useState } from "react";
import styles from './SolutionHeader.module.scss';
import Text, { TextProps } from "@ui-kit/Text/Text";
import ClassMemberItem from "@components/ClassMemberItem/ClassMemberItem";
import { useGetStudentQuery } from "@app/features/stundent/stundentSlice";
import Spinner from "@ui-kit/Spinner/Spinner";
import Icon from "@ui-kit/Icon/Icon";
import { useGetHomeworkQuery } from "@app/features/homework/homeworkSlice";
import getDate from "utils/common/PrettyDate/common/date";
import getTime from "utils/common/PrettyDate/common/time";
import prettyDate from "utils/common/PrettyDate/datePrettify";
import { getDelta } from "utils/common/PrettyDate/common/delta";
import Updatable from "@ui-kit/Updatable/Updatable";
import SolutionSelect from "@components/Solution/SolutionSelect";
import HomeworkTaskList from "@components/HomeworkTaskList/HomeworkTaskList";


interface SolutionHeaderAuthorProps extends UiComponentProps {
    studentID: number;
}

export const SolutionHeaderAuthor: React.FC<SolutionHeaderAuthorProps> = ({
    studentID,
    classes,
}) => {
    const { data, isLoading, isError, isSuccess } = useGetStudentQuery({ id: studentID });
    if (isLoading) {
        return (
            <>
                <Spinner classes={styles.statusSpinner} />
                <Text type='p' size={1} classes={styles.statusText}>
                    Загрузка...
                </Text>
            </>
        );
    }

    if (isError || !data?.student) {
        return (
            <>
                <Icon name='alert' classes={styles.statusIcon} />
                <Text type='p' size={1} classes={styles.statusText}>
                    Загрузка...
                </Text>
            </>
        );
    }
    return (
        <>
            {isSuccess && data.student && (
                <ClassMemberItem classes={[styles.authorItem, classes].join(' ')} student={data.student} role="Ученик" />
            )}
        </>
    );
}

interface SolutionHeaderHomeworkDataProps extends UiComponentProps{
    homeworkID: number;
}

export const SolutionHeaderHomeworkData: React.FC<SolutionHeaderHomeworkDataProps> = ({ homeworkID, classes }) => {
    const { data, isLoading, isError, isSuccess } = useGetHomeworkQuery({ id: homeworkID });

    if (isLoading) {
        return (
            <>
                <Spinner classes={styles.statusSpinner} />
                <Text type='p' size={1} classes={styles.statusText}>
                    Загрузка...
                </Text>
            </>
        );
    }

    if (isError && !data?.homework) {
        return (
            <>
                <Icon name='alert' classes={styles.statusIcon} />
                <Text type='p' size={1} classes={styles.statusText}>
                    Загрузка...
                </Text>
            </>
        );
    }

    return (
        <>
            {isSuccess && data.homework && (
                <Container direction='vertical' classes={classes}>
                    <Text type='h' size={4} weight="bold">
                        Заголовок:
                    </Text>
                    <Text type='p' size={1} >
                        {data.homework.title.length ? data.homework.title : 'Без заголовка'}
                    </Text>
                    <Text type='h' size={4} weight="bold">
                        Описание:
                    </Text>
                    <Text type='p' size={1}>
                        {data.homework.description.length ? data.homework.description : 'Без описания'}
                    </Text>
                    <Text type='h' size={4} weight="bold">
                        Сроки:
                    </Text>
                    <Text type='p' size={1}>
                        {[
                            'От',
                            getDate(data.homework.createTime),
                            getTime(data.homework.createTime),
                        ].join(' ')}
                    </Text>
                    <Text type='p' size={1}>
                        {[
                            'До',
                            getDate(data.homework.deadlineTime),
                            getTime(data.homework.deadlineTime),
                        ].join(' ')}
                    </Text>

                    <Text type='h' size={4} weight="bold">
                        Задачи: TODO
                    </Text>
                </Container>
            )}
        </>
    );
}

interface SolutionHeaderPassStatusProps {
    solution: HomeworkSolution;
}

const SolutionHeaderPassStatus: React.FC<SolutionHeaderPassStatusProps> = ({ solution }) => {
    const homework = useGetHomeworkQuery({ id: solution.id });
    const [passStatus, changePassStatus] = useState<JSX.Element>();

    useEffect(() => {
        if (homework.isSuccess && homework.data.homework) {
            const inTime = getDelta(homework.data.homework.deadlineTime, solution.createTime) > 0;
            changePassStatus(
                <Text type='p' size={1} classes={inTime ? styles.intime : styles.outtime}>
                    {inTime ? 'В срок' : 'После срока'}
                </Text>
            );
        }
    }, [homework]);

    return (
        <>
            <Updatable
                element={Text}
                updateProps={(): TextProps => ({
                    type: 'p',
                    size: 1,
                    children: `Сдано ${prettyDate(solution.createTime)}`,
                })}
                interval={1}
            />
            {passStatus}
        </>
    );
}

interface SolutionHeaderProps extends UiComponentProps {
    solution: HomeworkSolution;
}


const SolutionHeader: React.FC<SolutionHeaderProps> = ({ solution, classes }) => {

    return (
        <Container gap="l" direction='vertical' layout='defaultBase' classes={[classes, styles.widget].join(' ')}>
            <Text type='h' size={3} weight="bold">
                Решение домашнего задания
            </Text>
            <Container direction="vertical" >
                <Container classes={styles.content}>
                    <Text type='h' size={4} weight="bold" classes={styles.contentTitle}>
                        Выполнил:
                    </Text>
                    <Container gap="l" classes={styles.contentItem}>
                        <SolutionHeaderAuthor studentID={Number(solution.studentID)} />
                    </Container>

                </Container>
                <Container classes={styles.content}>
                    <Text type='h' size={4} weight="bold" classes={styles.contentTitle}>
                        Домашнее задание:
                    </Text>
                    <Container direction='vertical' classes={[styles.contentItem].join(' ')}>
                        <SolutionHeaderHomeworkData homeworkID={Number(solution.hwID)} />
                    </Container>
                </Container>
                <Container classes={styles.content}>
                    <Text type='h' size={4} weight="bold" classes={styles.contentTitle}>
                        Статус:
                    </Text>
                    <Container direction='vertical' classes={styles.contentItem}>
                        <SolutionHeaderPassStatus solution={solution} />
                    </Container>
                </Container>
                <Container classes={styles.content}>
                    <Text type='h' size={4} weight="bold" classes={styles.contentTitle}>
                        История решений:
                    </Text>
                    <Container direction='vertical' classes={styles.contentItem}>
                        <SolutionSelect solution={solution} />
                    </Container>
                </Container>
            </Container>
        </Container>
    );
}


export default SolutionHeader;