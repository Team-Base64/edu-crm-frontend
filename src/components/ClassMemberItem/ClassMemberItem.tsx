import Avatar from '@ui-kit/Avatar/Avatar';
import Button from '@ui-kit/Button/Button';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useCallback } from 'react';
import Text from '@ui-kit/Text/Text';

import styles from './ClassMemberItem.module.scss';
import { redirect, useNavigate } from 'react-router-dom';
import AppRoutes, { routerQueryParams } from '@router/routes.ts';

interface ClassMemberItemProps extends UiComponentProps {
    id: string | number;
    name: string;
    avatarSrc: string;
    role: string;
    chatID: number;
}

const ClassMemberItem: React.FC<ClassMemberItemProps> = ({
    name,
    avatarSrc,
    role,
    onClick,
    classes,
    chatID,
}) => {
    const navigate = useNavigate();
    const handleChatClick = () => {
        navigate(
            `/${AppRoutes.messenger}?${routerQueryParams.messenger.chatid}=${chatID}`,
        );
    };

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
