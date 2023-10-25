import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Container from '@ui-kit/Container/Container.tsx';
import { useGetChatsQuery } from '../../app/services/api.ts';

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
            {/*<MessageSelectDialogItem name={'123'}></MessageSelectDialogItem>*/}
        </Container>
    );
};

export default MessageSelector;
