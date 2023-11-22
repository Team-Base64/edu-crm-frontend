import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Container from '@ui-kit/Container/Container.tsx';
import MessageSelectDialogItem from '@components/MessageSelectDioalogItem/MessageSelectDialogItem.tsx';
import { SearchDialogList } from '@components/SearchDialogList/SearchDialogList.tsx';
import styles from './MessageSelector.module.scss';
import { useGetDialogsQuery } from '@app/features/dialog/dialogSlice';
import { SetURLSearchParams } from 'react-router-dom';
import { routerQueryParams } from '@router/routes.ts';
import { updateOneSearchParam } from '../../utils/router/searchParams.ts';

interface MessageSelectorProps extends UiComponentProps {
    useQueryParams: [URLSearchParams, SetURLSearchParams];
}

const MessageSelector: React.FC<MessageSelectorProps> = ({
    useQueryParams,
    classes,
}) => {
    const { data, isLoading, isSuccess, isError, error } =
        useGetDialogsQuery(null);

    const [searchParams, setSearchParams] = useQueryParams;

    const getSearchParam = () =>
        (
            searchParams.get(routerQueryParams.messenger.search) ?? ''
        ).toLowerCase();

    const dialogList = Object.values(data?.dialogs ?? {})
        .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
        .filter(
            (dialog) =>
                (dialog.name &&
                    dialog.text &&
                    dialog.name.toLowerCase().includes(getSearchParam())) ||
                dialog.text.toLowerCase().includes(getSearchParam()),
        )
        .map((dialog) => {
            return (
                <MessageSelectDialogItem
                    data={dialog}
                    key={dialog.chatID}
                    selectDialog={() =>
                        setSearchParams(
                            updateOneSearchParam(
                                searchParams,
                                routerQueryParams.messenger.chatid,
                                dialog.chatID,
                            ),
                        )
                    }
                    isSelected={
                        searchParams.get(routerQueryParams.messenger.chatid) ==
                        dialog.chatID
                    }
                ></MessageSelectDialogItem>
            );
        });

    return (
        <Container
            direction={'vertical'}
            layout={'base'}
            classes={[styles.messageSelector, classes].join(' ')}
        >
            <SearchDialogList
                useQueryParams={[searchParams, getSearchParam, setSearchParams]}
            ></SearchDialogList>
            {isSuccess && dialogList}
            {isError && <p>{JSON.stringify(error)}</p>}
            {isLoading && <p>loading...</p>}
        </Container>
    );
};

export default MessageSelector;
