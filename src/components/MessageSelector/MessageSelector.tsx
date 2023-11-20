import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Container from '@ui-kit/Container/Container.tsx';
import MessageSelectDialogItem from '@components/MessageSelectDioalogItem/MessageSelectDialogItem.tsx';
import { SearchDialogList } from '@components/SearchDialogList/SearchDialogList.tsx';
import styles from './MessageSelector.module.scss';
import { useGetDialogsQuery } from '@app/features/dialog/dialogSlice';
import { useSearchParams } from 'react-router-dom';

interface MessageSelectorProps extends UiComponentProps {
    useSetChatIdQueryParams: [URLSearchParams, SetURLSearchParams];
}

const MessageSelector: React.FC<MessageSelectorProps> = ({
    useSetChatIdQueryParams,
    classes,
}) => {
    const { data, isLoading, isSuccess, isError, error } =
        useGetDialogsQuery(null);

    const [searchParams, setSearchParams] = useSetChatIdQueryParams;

    const dialogList = Object.values(data?.dialogs ?? {})
        .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
        .map((dialog) => (
            <MessageSelectDialogItem
                data={dialog}
                key={dialog.chatID}
                selectDialog={() => setSearchParams({ chatid: dialog.chatID })}
                isSelected={searchParams.get('chatid') === dialog.chatID}
            ></MessageSelectDialogItem>
        ));

    return (
        <Container
            direction={'vertical'}
            layout={'base'}
            classes={[styles.messageSelector, classes].join(' ')}
        >
            <SearchDialogList></SearchDialogList>
            {isSuccess && dialogList}
            {isError && <p>{JSON.stringify(error)}</p>}
            {isLoading && <p>loading...</p>}
        </Container>
    );
};

export default MessageSelector;
