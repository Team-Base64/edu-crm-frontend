import React, { useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import Button from '@ui-kit/Button/Button';
import Icon from '@ui-kit/Icon/Icon';

import styles from './ClassItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { copyInviteToken } from 'utils/class/copyInviteToken';
import Hint from '@ui-kit/Hint/Hint';
import { useGetClassByIdQuery } from '@app/features/class/classSlice';
import AppRoutes from '@router/routes';
import { ListItemFC } from '@ui-kit/List/types';
import { ClassData } from '@app/features/class/classModel';
import { objToItem } from '@ui-kit/List/helpers';
import { noop } from '@app/const/consts';
import ShowQueryState from '@components/ShowQueryState/ShowQueryState';

interface ClassItemProps extends UiComponentProps {
    classID: number;
}

export const ClassItem: React.FC<ClassItemProps> = ({ classID }) => {
    const { data, isSuccess, ...status } = useGetClassByIdQuery({
        id: classID,
    });
    return (
        <>
            <ShowQueryState status={status} />
            {isSuccess && (
                <ClassListItem
                    item={objToItem(data.class)}
                    onSelect={noop}
                    onDelete={noop}
                    index={0}
                />
            )}
        </>
    );
};

interface ClassListItemProps extends UiComponentProps {}

export const ClassListItem: ListItemFC<ClassData, ClassListItemProps> = ({
    item,
    classes,
}) => {
    const { id, title, description, inviteToken } = item;
    const [hint, setHint] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleCardClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate(`/${AppRoutes.classes}/${id}`);
    };

    const handleInvite: React.MouseEventHandler = (e) => {
        e.stopPropagation();
        copyInviteToken('', title, inviteToken);
        setHint(true);
    };

    return (
        <>
            <Container
                direction={'grid'}
                layout={'defaultBase'}
                classes={[styles.card, classes].join(' ')}
                onClick={handleCardClick}
            >
                <Container classes={styles.content}>
                    <Container
                        direction={'vertical'}
                        classes={styles.wrapper}
                        gap="l"
                    >
                        <Text
                            type={'h'}
                            size={4}
                            weight={'bold'}
                            classes={styles.text}
                        >
                            {title}
                        </Text>
                        <Text
                            type={'p'}
                            size={1}
                            classes={styles.text}
                        >
                            {description && description.length
                                ? description
                                : 'Без описания'}
                        </Text>
                    </Container>
                </Container>

                <Container
                    classes={styles.invite}
                    layout="defaultBase"
                >
                    <Container classes={styles.inviteWrapper}>
                        <Text
                            type="p"
                            size={1}
                            classes={styles.inviteToken}
                        >
                            {inviteToken}
                        </Text>
                    </Container>
                    <Button
                        type="link"
                        classes={styles.inviteBtn}
                        onClick={handleInvite}
                    >
                        <Icon
                            name="copyLine"
                            classes={styles.inviteBtnIcon}
                        />
                    </Button>
                    <Hint
                        classes={styles.inviteHint}
                        text="Приглашение скопировано в буфер обмена!"
                        timeoutSec={3}
                        state={[hint, setHint]}
                    />
                </Container>

                <Button
                    type={'link'}
                    classes={styles.btn}
                >
                    <Icon
                        name={'arrowRight'}
                        classes={styles.btnIcon}
                    />
                </Button>
            </Container>
        </>
    );
};
