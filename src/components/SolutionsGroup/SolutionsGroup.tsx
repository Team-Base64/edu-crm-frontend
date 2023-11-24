import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import React, { useId, useState } from 'react';
import { HomeworkSolution } from '@app/features/homeworkSolution/homeworkSolutionModel';
import EmptyItem from '@components/EmptyItem/EmptyItem';
import styles from './SolutionsGroup.module.scss';
import Icon from '@ui-kit/Icon/Icon';
import {
    SolutionHeaderAuthor,
    SolutionHeaderHomeworkData,
} from '@components/SolutionHeader/SolutionHeader';
import { UiComponentProps } from '@ui-kit/interfaces';
import getDate from 'utils/common/PrettyDate/common/date';
import getTime from 'utils/common/PrettyDate/common/time';
import Button from '@ui-kit/Button/Button';
import DeepGroup, { GroupFC, ListFC } from '@ui-kit/DeepGroup/DeepGroup';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '@router/routes';

interface SolutionItemProps extends UiComponentProps {
    data: HomeworkSolution;
}

const SolutionItem: React.FC<SolutionItemProps> = ({ data }) => {
    const { createTime, text, id } = data;
    const navigate = useNavigate();
    return (
        <Container
            layout="defaultBase"
            classes={styles.item}
            onClick={() =>
                navigate(`/${AppRoutes.solutions}/${id}`, {
                    replace: false,
                    relative: 'route',
                })
            }
        >
            <Container
                direction="vertical"
                gap="l"
            >
                <Text
                    type="h"
                    size={4}
                    weight="bold"
                >
                    Решение от {getDate(createTime)} {getTime(createTime)}
                </Text>
                <Container direction="vertical">
                    <Text
                        type="p"
                        size={1}
                        weight="bold"
                    >
                        Сообщение:
                    </Text>
                    <Text
                        type="p"
                        size={1}
                    >
                        {text ? text : 'Без сообщения'}
                    </Text>
                </Container>
            </Container>
            <Button
                type="link"
                classes={styles.btn}
            >
                <Icon
                    name="arrowRight"
                    classes={styles.btnIcon}
                />
            </Button>
        </Container>
    );
};

interface SolutionGroupProps { }

const SolutionGroup: GroupFC<SolutionGroupProps, HomeworkSolution> = ({
    keys,
    children,
}) => {
    const [show, setShow] = useState<boolean>(true);
    let headerText: string = '';
    let headerConent: React.ReactNode = '';

    if (keys.hwID !== undefined) {
        headerText = `Домашнее задание id${keys.hwID}`;
        headerConent = <SolutionHeaderHomeworkData homeworkID={keys.hwID} />;
    }
    if (keys.studentID !== undefined) {
        headerText = 'Выполнил';
        headerConent = (
            <SolutionHeaderAuthor
                classes={styles.author}
                studentID={keys.studentID}
            />
        );
    }
    if (keys.status !== undefined) {
        switch (keys.status) {
            case 'new': {
                headerText = 'Непроверенные';
                break;
            }
            case 'approve': {
                headerText = 'Принятые';
                break;
            }
            case 'reject': {
                headerText = 'С ошибками';
                break;
            }
        }
    }

    return (
        <Container classes={styles.group}>
            <Container
                direction="vertical"
                classes={styles.title}
            >
                <Button
                    type="link"
                    classes={styles.btn}
                    onClick={() => setShow((prev) => !prev)}
                >
                    <Text
                        type="h"
                        size={4}
                        weight="bold"
                        classes={styles.titleText}
                    >
                        {headerText}
                    </Text>
                    <Icon
                        name={show ? 'arrowUp' : 'arrowDown'}
                        classes={styles.btnIcon}
                    />
                    {/* <Text type="p" size={2} weight="bold" classes={styles.btnText}>
                        {show ? 'Свернуть' : 'Развернуть' }
                        </Text> */}
                </Button>
            </Container>
            <Container
                direction="vertical"
                classes={styles.content}
            >
                {show ? (
                    <>
                        {headerConent}
                        {children}
                    </>
                ) : (
                    <EmptyItem
                        text="Скрыто"
                        classes={styles.hidden}
                    >
                        <Icon
                            name="eyeCrossed"
                            classes={styles.hiddenIcon}
                        />
                    </EmptyItem>
                )}
            </Container>
        </Container>
    );
};
interface SolutionListProps { }

const SolutionList: ListFC<SolutionListProps, HomeworkSolution> = ({
    items,
}) => {
    const key = useId();

    if (!items.length) {
        return <EmptyItem text="Пока нет решений" />;
    }

    return (
        <Container direction="vertical">
            {items.map((item) => (
                <React.Fragment key={`${key}-group-item-${item.id}`}>
                    <SolutionItem data={item} />
                </React.Fragment>
            ))}
        </Container>
    );
};

interface SolutionsGroupProps extends UiComponentProps {
    solutions: HomeworkSolution[];
    title?: string;
    keys: (keyof HomeworkSolution)[];
}

const SolutionsGroup: React.FC<SolutionsGroupProps> = ({
    solutions,
    title,
    keys,
    classes,
}) => {
    return (
        <Container
            direction="vertical"
            layout="defaultBase"
            classes={[styles.widget, classes].join(' ')}
            gap="l"
        >
            {title && (
                <Text
                    type="h"
                    size={3}
                    weight="bold"
                    classes={styles.widgetTitle}
                >
                    {title}
                </Text>
            )}

            {solutions.length ? (
                <Container
                    direction="vertical"
                    classes={styles.widgetContent}
                >
                    <DeepGroup
                        items={solutions}
                        keys={keys}
                        renderGroup={SolutionGroup}
                        renderList={SolutionList}
                        renderGroupProps={{}}
                        renderListProps={{}}
                    />
                </Container>
            ) : (
                <EmptyItem text='Пока нет решений'/>
            )}
        </Container>
    );
};

export default SolutionsGroup;
