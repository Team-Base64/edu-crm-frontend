import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useState } from 'react';

import styles from './ClassHeader.module.scss';
import { useGetClassByIdQuery } from '@app/features/class/classSlice';
import Button from '@ui-kit/Button/Button';
import Icon from '@ui-kit/Icon/Icon';
import Hint from '@ui-kit/Hint/Hint';
import { copyInviteToken } from 'utils/class/copyInviteToken';
import Spinner from '@ui-kit/Spinner/Spinner';

interface ClassHeaderProps extends UiComponentProps {
    classId: string | number;
}

const ClassHeader: React.FC<ClassHeaderProps> = ({ classId }) => {
    const { data, isError, isLoading, isSuccess } = useGetClassByIdQuery({
        id: classId,
    });
    const [hint, setHint] = useState<boolean>(false);

    const handleInvite = () => {
        copyInviteToken(
            '',
            data?.class.title || '',
            data?.class.inviteToken || '',
        );
        setHint(true);
    };

    return (
        <Container
            classes={styles.widget}
            layout="defaultBase"
        >
            {isLoading && (
                <>
                    <Spinner classes={styles.statusSpinner} />
                    <Text
                        type="p"
                        size={1}
                        classes={styles.statusText}
                    >
                        Загрузка...
                    </Text>
                </>
            )}
            {isError && (
                <>
                    <Icon
                        name="alert"
                        classes={styles.statusIcon}
                    />
                    <Text
                        type="p"
                        size={1}
                        classes={styles.statusText}
                    >
                        Загрузка...
                    </Text>
                </>
            )}
            {isSuccess && (
                <>
                    <Container
                        direction="vertical"
                        classes={styles.header}
                    >
                        <Text
                            type="h"
                            size={2}
                            classes={styles.title}
                        >
                            {data.class.title}
                        </Text>
                        <Text
                            type="p"
                            size={1}
                            classes={styles.description}
                        >
                            {data.class.description
                                ? data.class.description
                                : 'Без описания'}
                        </Text>
                    </Container>
                    <Container
                        classes={styles.invite}
                        direction="vertical"
                        layout="defaultBase"
                    >
                        <Text
                            type="h"
                            size={4}
                            weight="bold"
                        >
                            Приглашение в класс
                        </Text>
                        <Container
                            classes={styles.inviteContent}
                            layout="defaultBase"
                        >
                            <Text
                                type="p"
                                size={1}
                                classes={styles.inviteToken}
                            >
                                {data.class.inviteToken}
                            </Text>
                            <Button
                                type="link"
                                classes={styles.btn}
                                onClick={handleInvite}
                            >
                                <Icon name="copyLine" />
                            </Button>
                            <Hint
                                classes={styles.hint}
                                text="Приглашение скопировано в буфер обмена!"
                                timeoutSec={3}
                                state={[hint, setHint]}
                            />
                        </Container>
                    </Container>
                </>
            )}
        </Container>
    );
};

export default ClassHeader;
