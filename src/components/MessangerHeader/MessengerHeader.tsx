import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Container from '@ui-kit/Container/Container.tsx';
import Text from '@ui-kit/Text/Text.tsx';
import { useGetDialogsQuery } from '@app/features/dialog/dialogSlice';
import { unselectedId } from '@app/const/consts.ts';

interface Messenger extends UiComponentProps {
    chatID: number;
}
export const MessengerHeader: React.FC<Messenger> = ({ chatID }) => {
    const { data } = useGetDialogsQuery(null);

    const content =
        chatID !== unselectedId
            ? data?.dialogs[chatID].studentName
            : 'Чат не выбран';

    return (
        <Container layout={'defaultBase'}>
            <Text
                type={'h'}
                size={3}
            >
                {content}
            </Text>
        </Container>
    );
};
