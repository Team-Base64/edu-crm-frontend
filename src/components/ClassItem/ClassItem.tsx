import React, { useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import { ClassData } from '@app/features/class/classModel';
import Button from '@ui-kit/Button/Button';
import Icon from '@ui-kit/Icon/Icon';

import styles from './ClassItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { copyInviteToken } from 'utils/class/copyInviteToken';
import Hint from '@ui-kit/Hint/Hint';
import { useGetClassByIdQuery } from '@app/features/class/classSlice';
import Spinner from '@ui-kit/Spinner/Spinner';

interface ClassItemProps extends UiComponentProps {
    classID: number;
}

const ClassItem: React.FC<ClassItemProps> = ({ classID, classes }) => {
    const { data, isLoading, isError, isSuccess } = useGetClassByIdQuery({ id: classID });
    // const { id, title, description, inviteToken } = data;
    const [hint, setHint] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleCardClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!data) return;

        navigate(String(data.class.id));
    };

    const handleInvite: React.MouseEventHandler = (e) => {
        e.stopPropagation();

        if (!data) return;

        const { title, inviteToken } = data.class;
        copyInviteToken('', title, inviteToken);
        setHint(true);
    }

    return (
        <>
            <Container
                direction={'grid'}
                layout={'defaultBase'}
                classes={[styles.card, classes].join(' ')}
                onClick={handleCardClick}
            >
                {isLoading && (
                    <Container classes={styles.status}>
                        <Spinner classes={styles.statusSpinner} />
                        <Text type="p" size={1} classes={styles.statusText}>
                            Загрузка...
                        </Text>
                    </Container>
                )}
                {isError && (
                    <Container classes={styles.status}>
                        <Icon name="alert" classes={styles.statusIcon} />
                        <Text type="p" size={1} classes={styles.statusText}>
                            Произошла ошибка...
                        </Text>
                    </Container>
                )}
                {isSuccess && data.class && (
                    <>
                        <Container classes={styles.content}>
                            <Container
                                direction={'vertical'}
                                classes={styles.wrapper}
                                gap='l'
                            >
                                <Text
                                    type={'h'}
                                    size={4}
                                    weight={'bold'}
                                    classes={styles.text}
                                >
                                    {data.class.title}
                                </Text>
                                <Text
                                    type={'p'}
                                    size={1}
                                    classes={styles.text}
                                >
                                    {data.class.description && data.class.description.length ? data.class.description : 'Без описания'}
                                </Text>
                            </Container>
                        </Container>

                        <Container
                            classes={styles.invite}
                            layout='defaultBase'
                        >
                            <Container classes={styles.inviteWrapper}>
                                <Text type='p' size={1} classes={styles.inviteToken}>
                                    {data.class.inviteToken}
                                </Text>
                            </Container>
                            <Button
                                type='link'
                                classes={styles.inviteBtn}
                                onClick={handleInvite}
                            >
                                <Icon name='copyLine' classes={styles.inviteBtnIcon} />
                            </Button>
                            <Hint classes={styles.inviteHint} text='Приглашение скопировано в буфер обмена!' timeoutSec={3} state={[hint, setHint]} />
                        </Container>

                        <Button type={'link'} classes={styles.btn}>
                            <Icon name={'arrowRight'} classes={styles.btnIcon} />
                        </Button>
                    </>
                )}
            </Container >
        </>
    );
};

export default ClassItem;
