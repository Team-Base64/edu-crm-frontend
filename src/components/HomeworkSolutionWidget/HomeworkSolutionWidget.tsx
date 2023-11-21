import Widget from '@components/Widget/Widget';
import Button from '@ui-kit/Button/Button';
import Overlay from '@ui-kit/Overlay/Overlay';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useState } from 'react';
import styles from './HomeworkSolutionWidget.module.scss';
import Text from '@ui-kit/Text/Text';
import HomeworkSolutionList from '@components/HomeworkSolutionList/HomeworkSolutionList';
import ClassSolutionsAll from '@components/ClassSolutionsAll/ClassSolutionsAll';

interface HomeworkSolutionWidgetProps extends UiComponentProps {
    classId: string | number;
}

const HomeworkSolutionWidget: React.FC<HomeworkSolutionWidgetProps> = ({
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
                classes={styles.btnShowAll}
                onClick={handleShowAll}
            >
                <Text
                    type="p"
                    weight="bold"
                    size={1}
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
                <ClassSolutionsAll classID={Number(classId)} />
            </Overlay>

            <Widget
                title="Решения: "
                nav={showAllButton}
                classes={classes}
            >
                <HomeworkSolutionList
                    classId={classId}
                    limit={2}
                    emptyTitle="Пока нет решений"
                    showStatus="all"
                />
            </Widget>
        </>
    );
};

export default HomeworkSolutionWidget;
