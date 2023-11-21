import { UiComponentProps } from '@ui-kit/interfaces.ts';
import React, { useState } from 'react';
import styles from './Attachment.module.scss';
import Container from '@ui-kit/Container/Container.tsx';
import Icon from '@ui-kit/Icon/Icon.tsx';
import Button from '@ui-kit/Button/Button.tsx';
import Text from '@ui-kit/Text/Text.tsx';
import Overlay from '@ui-kit/Overlay/Overlay.tsx';
import { MediaPreview } from '@components/MediaPreview/MediaPreview.tsx';
import { checkIfImageByExtension } from '../../utils/attaches/attachesExtensions.ts';

interface ChatAttachmentProps extends UiComponentProps {
    allowOpen?: () => boolean;
    onRemoveClick: () => void;
    file: File | string;
    isStatic?: boolean;
}

export const Attachment: React.FC<ChatAttachmentProps> = ({
    onRemoveClick,
    allowOpen,
    file,
    isStatic = false,
    classes
}) => {
    const handleRemoveClick = () => {
        onRemoveClick();
    };

    const handleClick: React.MouseEventHandler = () => {
        if (allowOpen) {
            setOverlayIsShowing(allowOpen());
            return;
        }

        setOverlayIsShowing(true);
    }

    const [isOverlay, setOverlayIsShowing] = useState(false);

    const getFileName = () => {
        if (file instanceof File) {
            return file.name;
        }
        if (typeof file === 'string') {
            return file.split('/').at(-1);
        }
        return '';
    };

    const linkToFile =
        typeof file === 'string' ? file : URL.createObjectURL(file);

    return (
        <Container
            gap={''}
            direction={'grid'}
            classes={[styles.chatAttachmentList, classes].join(' ')}
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
                name={
                    checkIfImageByExtension(getFileName() ?? '')
                        ? 'imageIcon'
                        : 'fileIcon'
                }
                classes={styles.chatAttachmentListFileIcon}
                size={''}
                onClick={handleClick}
            ></Icon>
            <Text
                type={'p'}
                size={1}
                classes={styles.chatAttachmentListFileText}
            >
                {getFileName()}
            </Text>
            <Overlay
                isShowing={isOverlay}
                closeOverlay={() => setOverlayIsShowing(false)}
            >
                <MediaPreview
                    linkToFile={linkToFile}
                    fileName={getFileName()}
                ></MediaPreview>
            </Overlay>
        </Container>
    );
};
