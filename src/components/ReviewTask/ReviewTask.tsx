import { useGetTaskQuery } from '@app/features/homeworkTask/homeworkTaskSlice';
import Button from '@ui-kit/Button/Button';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import TextArea from '@ui-kit/TextArea/TextArea';
import React, { useRef } from 'react';

import styles from './ReviewTask.module.scss';
import Text from '@ui-kit/Text/Text';
import { commentStorePath } from './utils';
import { noop } from '@app/const/consts';
import ShowQueryState from '@components/ShowQueryState/ShowQueryState';
import HomeworkTaskItem from '@components/HomeworkTaskItem/HomeworkTaskItem';
import { objToItem } from '@ui-kit/List/helpers';

interface ReviewTaskProps {
    title?: string;
    taskID: number;
}

const templates = {
    ok: 'Задача решена верно! Хорошая работа\n',
    error: 'В решении задачи есть ошибки:\n',
    none: 'К сожалению, задача не решена\n',
};

type Template = keyof typeof templates;

const ReviewTask: React.FC<ReviewTaskProps> = ({ taskID, title }) => {
    const { data, isSuccess, ...status } = useGetTaskQuery({
        id: taskID,
    });
    const commentRef = useRef<HTMLTextAreaElement>(null);

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        localStorage.setItem(commentStorePath + taskID, e.target.value);
    };

    const handleTemplate = (tmpl: Template) => {
        if (!commentRef.current) {
            return;
        }

        if (
            commentRef.current.value !== '' &&
            !confirm('Текущий текст будет удален')
        ) {
            return;
        }

        commentRef.current.value = templates[tmpl];
    };

    return (
        <Container
            classes={styles.item}
            layout="defaultBase"
            direction="vertical"
            gap="l"
        >
            <ShowQueryState status={status} />
            {isSuccess && (
                <>
                    <HomeworkTaskItem
                        item={objToItem(data.task)}
                        index={-1}
                        onDelete={noop}
                        onSelect={noop}
                        title={title}
                    />
                    <Container
                        direction="horizontal"
                        classes={styles.review}
                    >
                        <TextArea
                            classes={styles.area}
                            label={{
                                text: 'Ваш комментарий',
                                type: 'h',
                                size: 4,
                                weight: 'bold',
                            }}
                            placeholder="Комментарий..."
                            autoResize
                            maxRows={20}
                            minRows={4}
                            textareaRef={commentRef}
                            textareaText={
                                localStorage.getItem(
                                    commentStorePath + taskID,
                                ) || undefined
                            }
                            onChange={handleCommentChange}
                            name={`${taskID}comment`}
                        />
                        <Container
                            direction="vertical"
                            classes={styles.templates}
                        >
                            <Text
                                type="h"
                                size={4}
                                weight="bold"
                            >
                                Шаблоны:
                            </Text>
                            <Button
                                type="link"
                                classes={[styles.btn].join(' ')}
                                onClick={() => handleTemplate('ok')}
                            >
                                <Icon
                                    name="approve"
                                    classes={styles.btnIcon}
                                />
                                <Text
                                    classes={styles.btnText}
                                    type="p"
                                    size={1}
                                    weight="regular"
                                >
                                    Верно
                                </Text>
                            </Button>
                            <Button
                                type="link"
                                classes={[styles.btn].join(' ')}
                                onClick={() => handleTemplate('error')}
                            >
                                <Icon
                                    name="alert"
                                    classes={styles.btnIcon}
                                />
                                <Text
                                    classes={styles.btnText}
                                    type="p"
                                    size={1}
                                    weight="regular"
                                >
                                    Есть ошибки
                                </Text>
                            </Button>
                            <Button
                                type="link"
                                classes={[styles.btn].join(' ')}
                                onClick={() => handleTemplate('none')}
                            >
                                <Icon
                                    name="close"
                                    classes={styles.btnIcon}
                                />
                                <Text
                                    classes={styles.btnText}
                                    type="p"
                                    size={1}
                                    weight="regular"
                                >
                                    Не решена
                                </Text>
                            </Button>
                        </Container>
                    </Container>
                </>
            )}
        </Container>
    );
};

export default ReviewTask;
