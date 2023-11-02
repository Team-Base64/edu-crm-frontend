import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Input from '@ui-kit/Input/Input.tsx';
import styles from './SearchDialogList.module.scss';
import Container from '@ui-kit/Container/Container.tsx';
import Button from '@ui-kit/Button/Button';
import Icon from '@ui-kit/Icon/Icon.tsx';

interface SearchDialogListProps extends UiComponentProps {}

export const SearchDialogList: React.FC<SearchDialogListProps> = () => {
    return (
        <Container classes={styles.searchDialog}>
            <Input
                type={'search'}
                sizeType={'s'}
                border={'thin'}
                classes={styles.searchDialogInput}
            ></Input>
            <Button
                type={'link'}
                size={'s'}
            >
                <Icon
                    classes={styles.icon}
                    name={'searchIcon'}
                ></Icon>
            </Button>
        </Container>
    );
};
