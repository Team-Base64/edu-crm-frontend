import { useGetClassSolutionsQuery } from "@app/features/homeworkSolution/homeworkSolutionSlice";
import Container from "@ui-kit/Container/Container";
import Text from "@ui-kit/Text/Text";
import React, { useId, useState } from "react";
import { HomeworkSolution } from "@app/features/homeworkSolution/homeworkSolutionModel";
import EmptyItem from "@components/EmptyItem/EmptyItem";
import Spinner from "@ui-kit/Spinner/Spinner";
import styles from './ClassSolutionsAll.module.scss';
import Icon from "@ui-kit/Icon/Icon";
import { SolutionHeaderAuthor, SolutionHeaderHomeworkData } from "@components/SolutionHeader/SolutionHeader";
import { UiComponentProps } from "@ui-kit/interfaces";
import getDate from "utils/common/PrettyDate/common/date";
import getTime from "utils/common/PrettyDate/common/time";
import Button from "@ui-kit/Button/Button";
import DeepGroup, { GroupFC, ListFC } from "@ui-kit/DeepGroup/DeepGroup";
import { useNavigate } from "react-router-dom";
import AppRoutes from "@router/routes";

interface SolutionItemProps extends UiComponentProps {
    data: HomeworkSolution;
}

const SolutionItem: React.FC<SolutionItemProps> = ({ data }) => {
    const { createTime, text, id } = data;
    const navigate = useNavigate();
    return (
        <Container
            layout='defaultBase'
            classes={styles.item}
            onClick={() => navigate(`/${AppRoutes.solutions}/${id}`, { replace: false, relative: 'route' })}
        >
            <Container
                direction='vertical'
                gap="l"
            >
                <Text
                    type='h'
                    size={4}
                    weight="bold"
                >
                    Решение от {getDate(createTime)} {getTime(createTime)}
                </Text>
                <Container
                    direction='vertical'>
                    <Text
                        type='p'
                        size={1}
                        weight="bold"
                    >
                        Сообщение:
                    </Text>
                    <Text
                        type='p'
                        size={1}
                    >
                        {text ? text : 'Без сообщения'}
                    </Text>
                </Container>
            </Container>
            <Button type="link" classes={styles.btn}>
                <Icon name='arrowRight' classes={styles.btnIcon} />
            </Button>
        </Container>
    );
}

interface SolutionGroupProps {

}

const SolutionGroup: GroupFC<SolutionGroupProps, HomeworkSolution> = ({ keys, children }) => {
    const [show, setShow] = useState<boolean>(true);
    let headerText: string = '';
    let headerConent: React.ReactNode = '';

    if (keys.hwID !== undefined) {
        headerText = `Домашнее задание id${keys.hwID}`;
        headerConent = <SolutionHeaderHomeworkData homeworkID={keys.hwID} />;
    }
    if (keys.studentID !== undefined) {
        headerText = 'Выполнил';
        headerConent = <SolutionHeaderAuthor classes={styles.author} studentID={keys.studentID} />;
    }
    if (keys.isApproved !== undefined) {
        headerText = keys.isApproved ? 'Принятые' : 'С ошибками';
        // headerConent = (
        //     <Text
        //         type="p"
        //         size={1}
        //     >
        //         {keys.isApproved ? 'Зачтено' : 'Не зачтено'}
        //     </Text>
        // );
    }

    return (
        <Container
            classes={styles.group}
            gap="l"
        >
            <Container
                direction='vertical'
                classes={styles.title}
            >
                <Button type='link' classes={styles.btn} onClick={() => setShow(prev => !prev)}>
                    <Text
                        type="h"
                        size={4}
                        weight="bold"
                        classes={styles.titleText}
                    >
                        {headerText}
                    </Text>
                    <Icon name={show ? 'arrowUp' : 'arrowDown'} classes={styles.btnIcon} />
                    {/* <Text type="p" size={2} weight="bold" classes={styles.btnText}>
                        {show ? 'Свернуть' : 'Развернуть' }
                        </Text> */}

                </Button>
            </Container>
            <Container
                direction='vertical'
                classes={styles.content}
            >
                {show ? (
                    <>
                        {headerConent}
                        {children}
                    </>
                ) : (
                    <EmptyItem text="Скрыто" classes={styles.hidden}>
                        <Icon name='eyeCrossed' classes={styles.hiddenIcon} />
                    </EmptyItem>
                )}
            </Container>
        </Container>
    );
}
interface SolutionListProps {

}

const SolutionList: ListFC<SolutionListProps, HomeworkSolution> = ({ items }) => {
    const key = useId();
    if (!items.length) {
        return <EmptyItem text="Пока нет решений" />
    }

    return (
        <Container
            direction='vertical'
        // layout='defaultBase'
        >
            {
                items.map(item => (
                    <React.Fragment key={`${key}-${item.id}`}>
                        <SolutionItem data={item} />
                    </React.Fragment>
                ))
            }
        </Container>
    );
}

interface ClassSolutionsAllProps {
    classID: number;
}

const ClassSolutionsAll: React.FC<ClassSolutionsAllProps> = ({ classID }) => {
    const { data, isSuccess, isLoading, isError } = useGetClassSolutionsQuery({ class_id: classID });

    return (
        <Container
            direction='vertical'
            layout='defaultBase'
            classes={styles.widget}
        >
            <Text
                type="h"
                size={3}
                weight="bold"
            >
                Все решения класса
            </Text>
            {isLoading && (
                <Container>
                    <Spinner classes={styles.statusSpinner} />
                    <Text
                        type="p"
                        size={1}
                        classes={styles.statusText}
                    >
                        Загрузка...
                    </Text>
                </Container>
            )}
            {isError && (
                <Container>
                    <Icon name='alert' classes={styles.statusIcon} />
                    <Text
                        type="p"
                        size={1}
                        classes={styles.statusText}
                    >
                        Ошибка получения данных
                    </Text>
                </Container>
            )}
            {isSuccess && (
                <Container
                    direction='vertical'
                    classes={styles.widgetContent}
                >
                    <DeepGroup
                        items={data.solutions}
                        keys={['hwID', 'studentID', 'isApproved']}
                        renderGroup={SolutionGroup}
                        renderList={SolutionList}
                        renderGroupProps={{

                        }}
                        renderListProps={{

                        }}
                    />
                </Container>
            )}
        </Container>
    );
}

export default ClassSolutionsAll;