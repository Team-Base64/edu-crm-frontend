import { HomeworkSolution } from '@app/features/homeworkSolution/homeworkSolutionModel';
import { useGetHomeworkSolutionsQuery } from '@app/features/homeworkSolution/homeworkSolutionSlice';
import Container from '@ui-kit/Container/Container';
import Spinner from '@ui-kit/Spinner/Spinner';
import React, { useEffect, useId, useState } from 'react';
import styles from './SolutionSelect.module.scss';
import Text from '@ui-kit/Text/Text';
import Icon from '@ui-kit/Icon/Icon';
import { NavLink } from 'react-router-dom';
import Button from '@ui-kit/Button/Button';
import AppRoutes from '@router/routes';
import { getDelta } from 'utils/common/PrettyDate/common/delta';
import getDate from 'utils/common/PrettyDate/common/date';
import getTime from 'utils/common/PrettyDate/common/time';

interface SolutionSelectItemProps {
    solution: HomeworkSolution;
}

const SolutionSelectItem: React.FC<SolutionSelectItemProps> = ({
    solution,
}) => {
    const { id, createTime } = solution;
    return (
        <>
            <NavLink
                to={`/${AppRoutes.solutions}/${id}`}
                relative="route"
                className={({ isActive }) =>
                    [styles.a, isActive ? styles.active : ''].join(' ')
                }
            >
                <Button
                    type="link"
                    classes={styles.link}
                >
                    <Text
                        type="h"
                        size={5}
                        weight="bold"
                        classes={styles.linkText}
                    >
                        {getDate(createTime)}
                    </Text>
                    <Text
                        type="h"
                        size={5}
                        weight="bold"
                        classes={styles.linkText}
                    >
                        {getTime(createTime)}
                    </Text>
                </Button>
            </NavLink>
        </>
    );
};

interface SolutionSelectProps {
    solution: HomeworkSolution;
}

const SolutionSelect: React.FC<SolutionSelectProps> = ({ solution }) => {
    const key = useId();
    const { hwID, studentID } = solution;
    const {
        data: otherHwSolutions,
        isLoading,
        isSuccess,
        isError,
    } = useGetHomeworkSolutionsQuery({
        homeworkID: hwID,
    });
    const [filteredOtherSolutions, update] = useState<
        HomeworkSolution[] | undefined
    >(undefined);

    useEffect(() => {
        if (!isSuccess) return;
        update(
            otherHwSolutions.solutions
                .filter((s) => s.studentID === studentID)
                .sort((a, b) => getDelta(b.createTime, a.createTime)), // && s.id !== id
        );
    }, [
        update,
        isLoading,
        solution,
        isSuccess,
        otherHwSolutions?.solutions,
        studentID,
    ]);
    return (
        <>
            {isLoading && (
                <Container>
                    <Spinner classes={styles.statusSpinner} />
                    <Text
                        type="p"
                        size={1}
                        classes={styles.statusText}
                    >
                        Загрузка....
                    </Text>
                </Container>
            )}
            {isError && (
                <Container>
                    <Icon
                        name="alert"
                        classes={styles.statusIcon}
                    />
                    <Text
                        type="p"
                        size={1}
                        classes={styles.statusText}
                    >
                        Произошла ошибка
                    </Text>
                </Container>
            )}
            {isSuccess && filteredOtherSolutions && (
                <Container
                    gap="s"
                    classes={styles.list}
                >
                    {filteredOtherSolutions.map((s) => (
                        <React.Fragment key={`${key}-select-item-${s.id}`}>
                            <SolutionSelectItem solution={s} />
                        </React.Fragment>
                    ))}
                </Container>
            )}
        </>
    );
};

export default SolutionSelect;
