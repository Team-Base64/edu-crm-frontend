import { UiComponentProps } from '@ui-kit/interfaces.ts';
import React from 'react';
import styles from './ChatAttachment.module.scss';
import Container from '@ui-kit/Container/Container.tsx';
import Icon from '@ui-kit/Icon/Icon';
import Button from '@ui-kit/Button/Button.tsx';
import Text from '@ui-kit/Text/Text.tsx';

interface ChatAttachmentProps extends UiComponentProps {
    onRemoveClick: () => void;
    file: File | string;
    isStatic?: boolean;
}

export const ChatAttachment: React.FC<ChatAttachmentProps> = ({
    onRemoveClick,
    file,
    isStatic = false,
}) => {
    const handleRemoveClick = () => {
        onRemoveClick();
    };

    const getFileName = () => {
        if (file instanceof File) {
            return file.name;
        }
        if (typeof file === 'string') {
            return file.split('/').at(-1);
        }
        return '';
    };

    return (
        <Container
            gap={''}
            direction={'grid'}
            classes={styles.chatAttachmentList}
        >
            {!isStatic && (
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
            )}
            <Icon
                name={'fileIcon'}
                classes={styles.chatAttachmentListFileIcon}
                size={''}
            ></Icon>
            <Text
                type={'p'}
                size={1}
                classes={styles.chatAttachmentListFileText}
            >
                {getFileName()}
            </Text>
        </Container>
    );
};
