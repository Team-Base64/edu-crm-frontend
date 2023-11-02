import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Container from '@ui-kit/Container/Container.tsx';
import Text from '@ui-kit/Text/Text.tsx';

interface Messenger extends UiComponentProps {
    title: string;
}
export const MessengerHeader: React.FC<Messenger> = ({ title }) => {
    return (
        <Container>
            <Text
                type={'h'}
                size={3}
            >
                {title}
            </Text>
        </Container>
    );
};
