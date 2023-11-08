import ClassMemberList from '@components/ClassMemberList/ClassMemberList';
import Widget from '@components/Widget/Widget';
import Button from '@ui-kit/Button/Button';
import Overlay from '@ui-kit/Overlay/Overlay';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useState } from 'react';
import styles from './ClassMembersWidget.module.scss';
import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';

interface ClassMembersWidgetProps extends UiComponentProps {
    classId: string | number;
}

const ClassMembersWidget: React.FC<ClassMembersWidgetProps> = ({
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
                Посмотреть всех
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
                            {'Все участники группы'}
                        </Text>
                    </Container>
                    <ClassMemberList
                        classId={classId}
                        classes={styles.fullPage}
                    />
                </Container>
            </Overlay>

            <Widget
                title="Участники: "
                nav={showAllButton}
                classes={classes}
            >
                <ClassMemberList
                    classId={classId}
                    limit={2}
                />
            </Widget>
        </>
    );
};

export default ClassMembersWidget;
