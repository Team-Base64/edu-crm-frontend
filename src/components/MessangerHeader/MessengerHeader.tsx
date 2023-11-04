import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Container from '@ui-kit/Container/Container.tsx';
import Text from '@ui-kit/Text/Text.tsx';
import { useGetChatsQuery } from '../../app/features/api/chat/dialogSlice.ts';

interface Messenger extends UiComponentProps {
    chatid: number;
}
export const MessengerHeader: React.FC<Messenger> = ({ chatid }) => {
    const { data } = useGetChatsQuery(null);

    return (
        <Container layout={'defaultBase'}>
            <Text
                type={'h'}
                size={3}
            >
                {data?.chats[chatid].name}
            </Text>
        </Container>
    );
};
