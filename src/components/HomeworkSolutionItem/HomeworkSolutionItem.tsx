import Avatar from '@ui-kit/Avatar/Avatar';
import Button from '@ui-kit/Button/Button';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import { UiComponentProps } from '@ui-kit/interfaces';
import React from 'react';
import Text from '@ui-kit/Text/Text';

import styles from './HomeworkSolutionItem.module.scss';

interface HomeworkSolutionItemProps extends UiComponentProps {
    firstName: string;
    lastName: string;
    avatarSrc: string;
    homeworkTitle: string;
    passTime?: number;
    deadlineTime: number;
}

const HomeworkSolutionItem: React.FC<HomeworkSolutionItemProps> = ({
    firstName,
    lastName,
    avatarSrc,
    homeworkTitle,
    passTime,
    deadlineTime,
    onClick,
    classes,
}) => {
    let stateClassName = styles.notPass;
    let stateStr = 'Не сдано';

    if (passTime) {
        const date = new Date(passTime);
        date.toLocaleDateString();
        stateStr = 'Сдано ' + date.toLocaleDateString('ru-RU').slice(0, -5);
        if (passTime <= deadlineTime) {
            stateClassName = styles.pass;
        } else {
            stateClassName = styles.passDelay;
        }
    }

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
                    alt={firstName + 'avatar'}
                />
                <Container
                    classes={styles.wrapper}
                    direction="vertical"
                >
                    <Text
                        classes={[styles.text, styles.name].join(' ')}
                        type="h6"
                        weight="bold"
                    >
                        {firstName} {lastName}
                    </Text>
                    <Text
                        classes={[styles.text, styles.title].join(' ')}
                        type="p2"
                        weight="regular"
                    >
                        {homeworkTitle}
                    </Text>
                </Container>
            </Container>
            <Container direction="horizontal">
                <Text
                    type="p2"
                    weight="bold"
                    classes={[styles.state, stateClassName].join(' ')}
                >
                    {stateStr}
                </Text>
                <Button
                    classes={styles.btn}
                    onClick={onClick}
                    type="link"
                >
                    <Icon
                        classes={styles.icon}
                        name="arrowRight"
                    />
                </Button>
            </Container>
        </Container>
    );
};

export default HomeworkSolutionItem;
