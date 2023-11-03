import Button from '@ui-kit/Button/Button';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import { UiComponentProps } from '@ui-kit/interfaces';
import React from 'react';
import Text from '@ui-kit/Text/Text';

import styles from './HomeworkItem.module.scss';

interface HomeworkItemProps extends UiComponentProps {
    title: string;
    description?: string;
    deadlineTime: number;
}

const HomeworkItem: React.FC<HomeworkItemProps> = ({
    title,
    description,
    deadlineTime,
    onClick,
    classes,
}) => {
    let stateClassName = styles.notPass;
    const stateStr =
        'До ' + new Date(deadlineTime).toLocaleDateString('ru-RU').slice(0, -5);

    if (Date.now() < deadlineTime) {
        stateClassName = styles.notPass;
    } else {
        stateClassName = styles.pass;
    }

    return (
        <Container
            classes={[styles.card, classes].join(' ')}
            direction="horizontal"
            onClick={onClick}
        >
            <Container
                classes={styles.wrapper}
                direction="vertical"
            >
                <Text
                    classes={[styles.text, styles.title].join(' ')}
                    type="h"
                    size={6}
                    weight="bold"
                >
                    {title}
                </Text>
                <Text
                    classes={[styles.text, styles.description].join(' ')}
                    type="p"
                    size={2}
                    weight="regular"
                >
                    {description}
                </Text>
            </Container>
            <Container direction="horizontal">
                <Text
                    type="p"
                    size={2}
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

export default HomeworkItem;
