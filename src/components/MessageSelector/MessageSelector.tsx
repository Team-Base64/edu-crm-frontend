import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Container from '@ui-kit/Container/Container.tsx';
import MessageSelectDialogItem from '@components/MessageSelectDioalogItem/MessageSelectDialogItem.tsx';
import { useGetChatsQuery } from '../../app/features/api/chat/dialogSlice.ts';
import { SearchDialogList } from '@components/SearchDialogList/SearchDialogList.tsx';
import styles from './MessageSelector.module.scss';

interface MessageSelectorProps extends UiComponentProps {
    setChatID: (chatID: number) => void;
}

const MessageSelector: React.FC<MessageSelectorProps> = ({ setChatID }) => {
    const { data, isLoading, isSuccess, isError, error } =
        useGetChatsQuery(null);

    const dialogList = data?.chats.map((chat) => (
        <MessageSelectDialogItem
            data={chat}
            key={chat.chatid}
            selectDialog={() => setChatID(chat.chatid)}
        ></MessageSelectDialogItem>
    ));

    return (
        <Container
            direction={'vertical'}
            layout={'base'}
            classes={styles.messageSelector}
        >
            <SearchDialogList></SearchDialogList>
            {isSuccess && dialogList}
            {isError && <p>{JSON.stringify(error)}</p>}
            {isLoading && <p>loading...</p>}
        </Container>
    );
};

export default MessageSelector;
