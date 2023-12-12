import Widget from '@components/Widget/Widget';
import Button from '@ui-kit/Button/Button';
import Overlay from '@ui-kit/Overlay/Overlay';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useState } from 'react';
import styles from './HomeworkWidget.module.scss';
import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import HomeworkList from '@components/HomeworkList/HomeworkList';
import Icon from '@ui-kit/Icon/Icon';
import HomeworkCreateForm from '@components/HomeworkCreateForm/HomeworkCreateForm';

interface ClassHomeworksWidgetProps extends UiComponentProps {
    classId: string | number;
}

const ClassHomeworksWidget: React.FC<ClassHomeworksWidgetProps> = ({
    classId,
    classes,
}) => {
    const [isFullPage, setFullPage] = useState<boolean>(false);
    const [isCreateForm, setCreateForm] = useState<boolean>(false);

    const handleShowAll = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFullPage(true);
        setFullPage(true);
    };

    const showAllButton = (
        <>
            <Button
                type="link"
                size="s"
                onClick={handleShowAll}
                classes={styles.btn}
            >
                <Text
                    type="h"
                    weight="bold"
                    size={5}
                    classes={styles.text}
                >
                    Посмотреть все
                </Text>
            </Button>
        </>
    );

    return (
        <>
            <Widget
                title="Домашние задания: "
                nav={showAllButton}
                classes={classes}
            >
                <HomeworkList
                    classId={classId}
                    limit={2}
                />

                <Button
                    classes={styles.btnCreate}
                    onClick={() => setCreateForm(true)}
                >
                    <Icon
                        name="addLine"
                        classes={styles.btnCreateIcon}
                    />
                    <Text
                        type="p"
                        size={1}
                        weight="bold"
                        classes={styles.btnCreateText}
                    >
                        Создать
                    </Text>
                </Button>
            </Widget>
            {/* FULL PAGE WIGET */}
            <Overlay
                isShowing={isFullPage}
                closeOverlay={() => setFullPage(false)}
            >
                <Container
                    direction="vertical"
                    layout="defaultBase"
                >
                    <Container
                        layout="defaultBase"
                        classes={styles.title}
                    >
                        <Text
                            type="h"
                            size={3}
                            weight="bold"
                        >
                            {'Все домашние задания группы: '}
                        </Text>
                    </Container>
                    <HomeworkList
                        classId={classId}
                        classes={styles.fullPage}
                    />
                </Container>
            </Overlay>
            {/* CREATE HW FORM */}
            <Overlay
                isShowing={isCreateForm}
                closeOverlay={() => setCreateForm(false)}
            >
                <HomeworkCreateForm
                    classId={classId}
                    onSubmitSuccess={() => setCreateForm(false)}
                />
            </Overlay>
        </>
    );
};

export default ClassHomeworksWidget;
