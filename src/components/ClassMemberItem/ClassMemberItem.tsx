import Avatar from '@ui-kit/Avatar/Avatar';
import Button from '@ui-kit/Button/Button';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useCallback } from 'react';
import Text from '@ui-kit/Text/Text';

import styles from './ClassMemberItem.module.scss';
import { Student } from '@app/features/stundent/stundentModel';

interface ClassMemberItemProps extends UiComponentProps {
    student: Student;
    role: string;
    onMessageClick?: () => void;
}

const ClassMemberItem: React.FC<ClassMemberItemProps> = ({
    student,
    role,
    onMessageClick,
    onClick,
    classes,
}) => {
    const {name, avatarSrc} = student;
    const handleChatClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            onMessageClick?.();
        },
        [onMessageClick],
    );

    return (
        <Container
            classes={[styles.card, classes].join(' ')}
            direction="horizontal"
            onClick={onClick}
        >
            <Container
                classes={styles.wrapper}
                direction="horizontal"
            >
                <Avatar
                    classes={styles.avatar}
                    src={avatarSrc}
                    alt={name + 'avatar'}
                />
                <Container
                    classes={styles.wrapper}
                    direction="vertical"
                >
                    <Text
                        classes={[styles.name, styles.text].join(' ')}
                        type="h"
                        size={5}
                        weight="bold"
                    >
                        {name}
                    </Text>
                    <Text
                        classes={[styles.role, styles.text].join(' ')}
                        type="p"
                        size={1}
                        weight="regular"
                    >
                        {role}
                    </Text>
                </Container>
            </Container>
            <Button
                classes={styles.btn}
                onClick={handleChatClick}
                type="link"
            >
                <Icon
                    classes={styles.icon}
                    name="chatRightFill"
                />
            </Button>
        </Container>
    );
};

export default ClassMemberItem;
