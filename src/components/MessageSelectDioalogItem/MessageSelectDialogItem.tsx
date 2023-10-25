import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Container from '@ui-kit/Container/Container.tsx';
import Text from '@ui-kit/Text/Text.tsx';
import Button from '@ui-kit/Button/Button.tsx';

interface MessageSelectDialogItemProps extends UiComponentProps {
    name: string;
    selectDialog: () => void;
}

const MessageSelectDialogItem: React.FC<MessageSelectDialogItemProps> = ({
    name,
    selectDialog,
}) => {
    return (
        <Container direction={'vertical'}>
            <Button
                type={'link'}
                onClick={selectDialog}
            >
                <Text type={'h3'}>{name}</Text>
            </Button>
        </Container>
    );
};

export default MessageSelectDialogItem;
