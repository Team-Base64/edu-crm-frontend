import Widget from '@components/Widget/Widget';
import Button from '@ui-kit/Button/Button';
import Overlay from '@ui-kit/Overlay/Overlay';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useState } from 'react';
import styles from './HomeworkWidget.module.scss';
import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import HomeworkList from '@components/HomeworkList/HomeworkList';

interface ClassHomeworksWidgetProps extends UiComponentProps {
    classId: string | number;
}

const ClassHomeworksWidget: React.FC<ClassHomeworksWidgetProps> = ({
    classId,
    classes,
}) => {
    const [isOverlay, setIsOverlay] = useState<boolean>(false);

    const handleShowAll = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOverlay(true);
    };

    const showAllButton = (
        <>
            <Button
                type="link"
                size="s"
                onClick={handleShowAll}
            >
                <Text
                    type="p"
                    weight="bold"
                    size={2}
                    classes={styles.btnShowAll}
                >
                    Посмотреть все
                </Text>
            </Button>
        </>
    );

    return (
        <>
            <Overlay
                isShowing={isOverlay}
                closeOverlay={() => setIsOverlay(false)}
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
                            size={4}
                            weight="bold"
                        >
                            {'Все домашние задания группы'}
                        </Text>
                    </Container>
                    <HomeworkList
                        classId={classId}
                        classes={styles.fullPage}
                    />
                </Container>
            </Overlay>

            <Widget
                title="Домашние задания: "
                nav={showAllButton}
                classes={classes}
            >
                <HomeworkList
                    classId={classId}
                    limit={2}
                />
            </Widget>
        </>
    );
};

export default ClassHomeworksWidget;
