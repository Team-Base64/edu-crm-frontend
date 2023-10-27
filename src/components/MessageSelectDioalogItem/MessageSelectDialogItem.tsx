import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
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
        <Button
            type={'link'}
            onClick={selectDialog}
            size={'l'}
        >
            <Text type={'h3'}>{name}</Text>
        </Button>
    );
};

export default MessageSelectDialogItem;
