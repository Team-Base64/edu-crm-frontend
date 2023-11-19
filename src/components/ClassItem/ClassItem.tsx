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

interface ClassItemProps extends UiComponentProps {
    data: ClassData;
}

const ClassItem: React.FC<ClassItemProps> = ({ data, classes }) => {
    const { id, title, description, inviteToken } = data;
    const [hint, setHint] = useState<boolean>(false);

    const navigate = useNavigate();
    const handleCardClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate(String(id));
    };

    const handleInvite : React.MouseEventHandler = (e) => {
        copyInviteToken('', title, inviteToken);
        setHint(true);
        e.stopPropagation();
    }
    return (
        <>
            <Container
                direction={'horizontal'}
                layout={'defaultBase'}
                classes={[styles.card, classes].join(' ')}
                onClick={handleCardClick}
            >
                <Container
                    direction={'vertical'}
                    classes={styles.wrapper}
                >
                    <Text
                        type={'h'}
                        size={5}
                        weight={'bold'}
                        classes={styles.text}
                    >
                        {title}
                    </Text>
                    {description && (
                        <Text
                            type={'p'}
                            size={2}
                            classes={styles.text}
                        >
                            {description}
                        </Text>
                    )}
                </Container>
                <Container>
                    <Container
                        classes={styles.inviteContent}
                        layout='defaultBase'
                    >
                        <Text type='p' size={1} classes={styles.inviteToken}>
                            {inviteToken}
                        </Text>
                        <Button
                            type='link'
                            classes={styles.btn}
                            onClick={handleInvite}
                        >
                            <Icon name='copyLine' />
                        </Button>
                        <Hint classes={styles.inviteHint} text='Приглашение скопировано в буфер обмена!' timeoutSec={3} state={[hint, setHint]} />
                    </Container>
                    <Button type={'link'}>
                        <Icon name={'arrowRight'} />
                    </Button>
                </Container>
            </Container>
        </>
    );
};

export default ClassItem;
