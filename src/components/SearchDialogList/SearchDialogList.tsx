import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Input from '@ui-kit/Input/Input.tsx';
import styles from './SearchDialogList.module.scss';

interface SearchDialogListProps extends UiComponentProps {}

export const SearchDialogList: React.FC<SearchDialogListProps> = () => {
    return (
        <Input
            type={'search'}
            sizeType={'s'}
            border={'thin'}
            classes={styles.searchDialogInput}
            placeholder={'Поиск'}
        ></Input>
    );
};
