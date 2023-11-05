import { UiComponentProps } from '@ui-kit/interfaces.ts';
import React from 'react';
import styles from './ChatAttachment.module.scss';
import Container from '@ui-kit/Container/Container.tsx';
import Icon from '@ui-kit/Icon/Icon';
import Button from '@ui-kit/Button/Button.tsx';

interface ChatAttachmentProps extends UiComponentProps {
    onRemoveClick: () => void;
    file: File;
}

export const ChatAttachment: React.FC<ChatAttachmentProps> = ({
    onRemoveClick,
    file,
}) => {
    const handleRemoveClick = () => {
        onRemoveClick();
    };

    return (
        <Container
            gap={''}
            direction={'vertical'}
            classes={styles.chatAttachmentList}
        >
            <Button
                type={'link'}
                size={''}
                onClick={handleRemoveClick}
            >
                <Icon
                    name={'closeCircle'}
                    classes={styles.chatAttachmentListFileRemove}
                ></Icon>
            </Button>
            <Icon
                name={'fileIcon'}
                classes={styles.chatAttachmentListFileIcon}
                size={''}
            ></Icon>
        </Container>
    );
};
