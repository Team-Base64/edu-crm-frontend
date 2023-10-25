import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Container from '@ui-kit/Container/Container.tsx';
import { useGetChatsQuery } from '../../app/services/api.ts';
import MessageSelectDialogItem from '@components/MessageSelectDioalogItem/MessageSelectDialogItem.tsx';

interface MessageSelectorProps extends UiComponentProps {
    setChatID: (chatID: number) => void;
}

const MessageSelector: React.FC<MessageSelectorProps> = ({ setChatID }) => {
    const { data, isLoading, isSuccess, isError, error } =
        useGetChatsQuery(null);
    // const { data, isLoading, isSuccess, isError, error } = {
    //     data: { chats: [{ chatid: 1 }, { chatid: 2 }] },
    //     isLoading: false,
    //     isSuccess: true,
    //     isError: false,
    //     error: undefined,
    // };
    console.log(
        data,
        `isLoading: ${isLoading}`,
        `isSuccess: ${isSuccess}`,
        `isError: ${isError}`,
        `error: ${JSON.stringify(error)}`,
    );

    const dialogList = data?.chats.map((chat) => (
        <MessageSelectDialogItem
            name={chat.chatid.toString()}
            key={chat.chatid}
            selectDialog={() => setChatID(chat.chatid)}
        ></MessageSelectDialogItem>
    ));

    return (
        <Container>
            {isSuccess && dialogList}
            {isError && <p>error</p>}
            {isLoading && <p>loading...</p>}
        </Container>
    );
};

export default MessageSelector;
