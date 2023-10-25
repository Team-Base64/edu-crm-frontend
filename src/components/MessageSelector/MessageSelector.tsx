import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Container from '@ui-kit/Container/Container.tsx';
import { useGetChatsQuery } from '../../app/services/api.ts';
import MessageSelectDialogItem from '@components/MessageSelectDioalogItem/MessageSelectDialogItem.tsx';

interface MessageSelectorProps extends UiComponentProps {}

const MessageSelector: React.FC<MessageSelectorProps> = () => {
    const { data, isLoading, isSuccess, isError, error } =
        useGetChatsQuery(null);
    console.log(
        data,
        `isLoading: ${isLoading}`,
        `isSuccess: ${isSuccess}`,
        `isError: ${isError}`,
        `error: ${error}`,
    );
    return (
        <Container>
            {isSuccess && (
                <MessageSelectDialogItem
                    name={data?.toString()}
                ></MessageSelectDialogItem>
            )}
            {isError && <p>error</p>}
            {isLoading && <p>loading...</p>}
        </Container>
    );
};

export default MessageSelector;
