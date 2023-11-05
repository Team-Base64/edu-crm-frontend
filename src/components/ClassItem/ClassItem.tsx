import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import { ClassData } from '@app/features/class/classModel';
import Button from '@ui-kit/Button/Button';
import Icon from '@ui-kit/Icon/Icon';

import styles from './ClassItem.module.scss';
import { useNavigate } from 'react-router-dom';

interface ClassItemProps extends UiComponentProps {
    data: ClassData;
}

const ClassItem: React.FC<ClassItemProps> = ({ data, classes }) => {
    const { id, title, description } = data;
    const navigate = useNavigate();
    const handleCardClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate(String(id));
    };
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
                <Button type={'link'}>
                    <Icon name={'arrowRight'} />
                </Button>
            </Container>
        </>
    );
};

export default ClassItem;
