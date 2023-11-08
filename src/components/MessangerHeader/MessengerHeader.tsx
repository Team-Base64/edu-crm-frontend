import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Container from '@ui-kit/Container/Container.tsx';
import Text from '@ui-kit/Text/Text.tsx';
import { useGetDialogsQuery } from '@app/features/dialog/dialogSlice';

interface Messenger extends UiComponentProps {
    chatid: number;
}
export const MessengerHeader: React.FC<Messenger> = ({ chatid }) => {
    const { data } = useGetDialogsQuery(null);

    return (
        <Container layout={'defaultBase'}>
            <Text
                type={'h'}
                size={3}
            >
                {data?.dialogs[chatid].name}
            </Text>
        </Container>
    );
};
