import { useGetHomeworkQuery } from '@app/features/homework/homeworkSlice';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import Spinner from '@ui-kit/Spinner/Spinner';
import React, { useRef, useId, useState } from 'react';
import ReviewTask from '@components/ReviewTask/ReviewTask';
import Text from '@ui-kit/Text/Text';
import Button from '@ui-kit/Button/Button';

import styles from './Review.module.scss';
import { UiComponentProps } from '@ui-kit/interfaces';
import { HomeworkSolution } from '@app/features/homeworkSolution/homeworkSolutionModel';
import { ReviewPayload } from '@app/features/homeworkSolutionReview/reviewModel';
import { useCreateReviewMutation } from '@app/features/homeworkSolutionReview/reviewSlice';
import CheckBox from '@ui-kit/Checkbox/Checkbox';
import Label from '@ui-kit/Label/Label';
import Hint from '@ui-kit/Hint/Hint';
import { clearComment, getComment } from '@components/ReviewTask/utils';

interface ReviewProps extends UiComponentProps {
    solution: HomeworkSolution;
}

const Review: React.FC<ReviewProps> = ({ classes, solution }) => {
    const { data, isError, isLoading, isSuccess } = useGetHomeworkQuery({
        id: solution.hwID,
    });
    const [sendReview] = useCreateReviewMutation();

    const [approved, setApproved] = useState<boolean>(false);

    const formRef = useRef<HTMLFormElement>(null);
    const formID = useId();
    const [lock, setLock] = useState<boolean>(false);
    const hintState = useState<boolean>(true);

    const handleSubmit = () => {
        if (!formRef.current) {
            return;
        }

        if (!data) {
            return;
        }

        setLock(true);
        const payload: ReviewPayload = {
            isApproved: approved,
            tasks: [],
        };

        try {
            data.homework.tasks.map((id) => {
                payload.tasks.push({
                    id: id,
                    evaluation: getComment(formRef, id) || '',
                });
            });
        } catch (e) {
            console.log(e);
            setLock(false);
            return;
        }
        sendReview({
            solutionID: solution.id,
            payload: payload,
        })
            .then(() => {
                setLock(false);
                if (!data) return;
                data.homework.tasks.map((id) => clearComment(formRef, id));
            })
            .catch((e) => {
                console.log(e);
                setLock(false);
            });
    };

    return (
        <>
            <Container
                direction="vertical"
                gap="l"
                layout="defaultBase"
                classes={[styles.review, classes].join(' ')}
            >
                <Text
                    type="h"
                    size={3}
                    weight="bold"
                    classes={styles.header}
                >
                    Форма проверки
                </Text>
                {isLoading && (
                    <>
                        <Spinner />
                        <Text
                            type="p"
                            size={1}
                            weight="regular"
                        >
                            Загрузка
                        </Text>
                    </>
                )}
                {isError ||
                    (!data?.homework && (
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
                    ))}
                {isSuccess && data.homework && (
                    <>
                        <form
                            ref={formRef}
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <Container direction="vertical">
                                {data.homework.tasks.map((task_id) => (
                                    <React.Fragment key={formID + task_id}>
                                        <ReviewTask taskID={task_id} />
                                    </React.Fragment>
                                ))}
                            </Container>

                            <Container direction="vertical">
                                <Text
                                    type="h"
                                    size={4}
                                    weight="bold"
                                >
                                    Результат проверки
                                </Text>
                                <Container classes={styles.state}>
                                    <CheckBox
                                        checked={approved}
                                        onChange={() => setApproved(!approved)}
                                    />
                                    <Label
                                        type="p"
                                        size={1}
                                        classes={
                                            approved
                                                ? styles.approved
                                                : styles.reject
                                        }
                                        text={
                                            approved
                                                ? 'Решение зачтено'
                                                : 'Задание нужно переделать'
                                        }
                                    />
                                </Container>
                                <Hint
                                    state={hintState}
                                    text="Если галочка не стоит, ученик сможет ещё раз отправить решение"
                                />
                            </Container>
                            <Button
                                classes={styles.submit}
                                onClick={handleSubmit}
                                disabled={isLoading || isError || !data || lock}
                            >
                                {lock && <Spinner classes={styles.spinner} />}
                                {isError && (
                                    <Icon
                                        classes={styles.submitIcon}
                                        name="alert"
                                    />
                                )}
                                {!lock && isSuccess && (
                                    <Icon
                                        classes={styles.submitIcon}
                                        name="approve"
                                    />
                                )}
                                <Text
                                    classes={styles.submitText}
                                    type="p"
                                    size={1}
                                    weight="bold"
                                >
                                    Отправить отзыв
                                </Text>
                            </Button>
                            {/* <Button onClick={() => {
                    if(!data) return;
                    data.homework.tasks.map(id => clearComment(formRef, id));
                }}>
                    Clear
                </Button> */}
                        </form>
                    </>
                )}
            </Container>
        </>
    );
};

export default Review;
