import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import Text from '@ui-kit/Text/Text';
import styles from './ClassInvite.module.scss';
import Button from '@ui-kit/Button/Button';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useCallback, useState } from 'react';
import Overlay from '@ui-kit/Overlay/Overlay';
import { useProfileQuery } from '@app/features/teacher/teacherApi';
import ShowQueryState from '@components/ShowQueryState/ShowQueryState';
import {
    VkBotLink,
    copyToClipboard,
    tutorialMessage,
} from 'utils/class/copyInviteToken';
import Hint from '@ui-kit/Hint/Hint';

interface ClassInviteProps extends UiComponentProps {
    wrap?: boolean;
    token: string;
    classTitle: string;
}

const ClassInvite: React.FC<ClassInviteProps> = ({
    wrap = false,
    classes,
    token,
    classTitle,
}) => {
    const { data, isSuccess, ...status } = useProfileQuery(null);
    const [overlay, setOverlay] = useState<boolean>(false);
    const [tokenHint, setTokenHint] = useState<boolean>(false);
    const [tutorHint, setTutorHint] = useState<boolean>(false);

    const handleCopyToken: React.MouseEventHandler = (e) => {
        e.stopPropagation();
        setTokenHint(true);
        copyToClipboard(token);
    };

    const handleCopyTutorial: React.MouseEventHandler = useCallback(
        (e) => {
            e.stopPropagation();
            if (!data) return;
            copyToClipboard(
                tutorialMessage(data.teacher.name, classTitle, token),
            );
            setTutorHint(true);
            setTimeout(() => {
                setOverlay(false);
            }, 5000);
        },
        [data, classTitle, token],
    );

    const handleTutorial: React.MouseEventHandler = (e) => {
        e.stopPropagation();
        setOverlay(true);
    };

    const card = (
        <Container
            layout="defaultBase"
            classes={styles.content}
        >
            <Text
                type="p"
                size={1}
                classes={styles.token}
            >
                {token}
            </Text>
            <Container classes={styles.nav}>
                <Button
                    type="link"
                    classes={styles.btn}
                    onClick={handleCopyToken}
                >
                    <Icon
                        name="copyLine"
                        classes={styles.icon}
                    />
                    <Hint
                        state={[tokenHint, setTokenHint]}
                        text="Токен скопирован"
                        timeoutSec={5}
                        classes={styles.hint}
                    />
                </Button>
                <Button
                    type="link"
                    classes={styles.btn}
                    onClick={handleTutorial}
                >
                    <Icon
                        name="infoCircle"
                        classes={styles.icon}
                    />
                </Button>
            </Container>
        </Container>
    );
    return (
        <>
            <ShowQueryState status={status} />
            {isSuccess && (
                <>
                    {wrap ? (
                        <Container
                            direction="vertical"
                            layout="defaultBase"
                            classes={[styles.widget, classes].join(' ')}
                        >
                            <Text
                                type="h"
                                size={4}
                                weight="bold"
                            >
                                Код-приглашение
                            </Text>
                            {card}
                        </Container>
                    ) : (
                        <>{card}</>
                    )}
                    <Overlay
                        closeOverlay={() => setOverlay(false)}
                        isShowing={overlay}
                    >
                        <Container
                            direction="vertical"
                            layout="defaultBase"
                            gap="l"
                            classes={styles.guide}
                        >
                            <Text
                                type="h"
                                size={3}
                                weight="bold"
                            >
                                Инструкция по приглашению:
                            </Text>

                            <Container direction="vertical">
                                <Container
                                    direction="vertical"
                                    layout="defaultBase"
                                    classes={styles.step}
                                >
                                    <Text
                                        type="p"
                                        size={1}
                                        classes={styles.text}
                                    >
                                        <Container
                                            classes={styles.container}
                                            gap="s"
                                        >
                                            1. Ученик должен должен написать
                                            боту в
                                            <Button type="link">
                                                <a
                                                    href={`${VkBotLink}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Text
                                                        type="p"
                                                        size={1}
                                                        weight="bold"
                                                    >
                                                        Вконтакте
                                                    </Text>
                                                </a>
                                            </Button>
                                            или
                                            <Button type="link">
                                                <a
                                                    href={`${VkBotLink}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Text
                                                        type="p"
                                                        size={1}
                                                        weight="bold"
                                                    >
                                                        Телеграм
                                                    </Text>
                                                </a>
                                            </Button>
                                            команду
                                            <Text
                                                type="p"
                                                size={1}
                                                weight="bold"
                                            >
                                                {' /start '}
                                            </Text>
                                            и следовать инструкциям
                                        </Container>
                                    </Text>
                                </Container>
                                <Container
                                    direction="vertical"
                                    layout="defaultBase"
                                    classes={styles.step}
                                >
                                    <Text
                                        type="p"
                                        size={1}
                                        classes={styles.text}
                                    >
                                        2. В момент, когда бот попросит токен,
                                        ученик должен отправить токен
                                        <Text
                                            type="p"
                                            size={1}
                                            weight="bold"
                                        >
                                            {` ${token} `}
                                        </Text>
                                    </Text>
                                </Container>
                            </Container>

                            <Button
                                onClick={handleCopyTutorial}
                                classes={styles.tutorBtn}
                            >
                                <Icon
                                    name="copyLine"
                                    classes={styles.tutorBtnIcon}
                                />
                                <Text
                                    type="p"
                                    size={1}
                                    weight="bold"
                                    classes={styles.tutorBtnText}
                                >
                                    Копировать инструкцию для ученика
                                </Text>
                                <Hint
                                    state={[tutorHint, setTutorHint]}
                                    text="Инструкция скопирована, отправьте её ученику"
                                    timeoutSec={5}
                                    onClose={() => setOverlay(false)}
                                    classes={styles.hint}
                                />
                            </Button>
                        </Container>
                    </Overlay>
                </>
            )}
        </>
    );
};

export default ClassInvite;
