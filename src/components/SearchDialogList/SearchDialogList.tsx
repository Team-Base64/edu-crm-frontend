import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Input from '@ui-kit/Input/Input.tsx';
import styles from './SearchDialogList.module.scss';
import { routerQueryParams } from '@router/routes.ts';
import { SetURLSearchParams } from 'react-router-dom';
import { updateOneSearchParam } from '../../utils/router/searchParams.ts';

interface SearchDialogListProps extends UiComponentProps {
    useQueryParams: [URLSearchParams, () => string, SetURLSearchParams];
}

export const SearchDialogList: React.FC<SearchDialogListProps> = ({
    useQueryParams,
}) => {
    const [searchParams, getParam, setSearchParams] = useQueryParams;

    const onInputChangeHandler = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setSearchParams(
            updateOneSearchParam(
                searchParams,
                routerQueryParams.messenger.search,
                event.target.value,
            ),
        );
    };

    return (
        <Input
            type={'search'}
            sizeType={'s'}
            border={'thin'}
            classes={styles.searchDialogInput}
            placeholder={'Поиск'}
            onChange={onInputChangeHandler}
            value={getParam()}
        />
    );
};
