import Avatar from '@ui-kit/Avatar/Avatar';
import Button from '@ui-kit/Button/Button';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import { UiComponentProps } from '@ui-kit/interfaces';
import React from 'react';
import Text from '@ui-kit/Text/Text';

import styles from './ClassMemberItem.module.scss';
import { Student } from '@app/features/stundent/stundentModel';
import { useNavigate } from 'react-router-dom';
import AppRoutes, { routerQueryParams } from '@router/routes.ts';
import { ListItemFC } from '@ui-kit/List/types';
import { useGetStudentQuery } from '@app/features/stundent/stundentSlice';
import ShowQueryState from '@components/ShowQueryState/ShowQueryState';
import { objToItem } from '@ui-kit/List/helpers';
import { noop } from '@app/const/consts';

interface ClassMemberItemProps extends UiComponentProps {
    studentID: number;
    chatID?: number;
    role?: string;
}
export const ClassMemberItem: React.FC<ClassMemberItemProps> = ({
    studentID,
    chatID,
    role = 'Ученик',
    classes,
}) => {
    const { data, isSuccess, ...status } = useGetStudentQuery({
        id: studentID,
    });
    return (
        <>
            <ShowQueryState status={status} />
            {isSuccess && (
                <ClassMemberListItem
                    item={objToItem(data.student)}
                    onSelect={noop}
                    onDelete={noop}
                    index={0}
                    chatID={chatID}
                    role={role}
                    classes={classes}
                />
            )}
        </>
    );
};

interface ClassMemberListItemProps extends UiComponentProps {
    role?: string;
    chatID?: number;
}

export const ClassMemberListItem: ListItemFC<
    Student,
    ClassMemberListItemProps
> = ({ item, role = 'Ученик', onClick, classes, chatID }) => {
    const { name, avatarSrc } = item;

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
            {chatID && (
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
            )}
        </Container>
    );
};
