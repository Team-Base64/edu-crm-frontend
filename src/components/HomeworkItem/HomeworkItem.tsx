import Button from '@ui-kit/Button/Button';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import { UiComponentProps } from '@ui-kit/interfaces';
import React from 'react';
import Text from '@ui-kit/Text/Text';

import styles from './HomeworkItem.module.scss';
import getDate from 'utils/common/PrettyDate/common/date';
import { getDeltaNow } from 'utils/common/PrettyDate/common/delta';
import getTime from 'utils/common/PrettyDate/common/time';
import { Homework } from '@app/features/homework/homeworkModel';

interface HomeworkItemProps extends UiComponentProps {
    homework: Homework;
}

const HomeworkItem: React.FC<HomeworkItemProps> = ({
    homework,
    onClick,
    classes,
}) => {
    const {deadlineTime, title, description} = homework;

    let stateClassName = styles.notPass;
    const stateStr =
        'До ' + getDate(deadlineTime, false) + ' ' + getTime(deadlineTime);

    if (getDeltaNow(deadlineTime) > 0) {
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
                    size={5}
                    weight="bold"
                >
                    {title}
                </Text>
                <Text
                    classes={[styles.text, styles.description].join(' ')}
                    type="p"
                    size={1}
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
