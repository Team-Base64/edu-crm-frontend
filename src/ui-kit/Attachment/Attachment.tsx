import { UiComponentProps } from '@ui-kit/interfaces.ts';
import React, { useEffect, useState } from 'react';
import styles from './Attachment.module.scss';
import Container from '@ui-kit/Container/Container.tsx';
import Icon from '@ui-kit/Icon/Icon.tsx';
import Button from '@ui-kit/Button/Button.tsx';
import Text from '@ui-kit/Text/Text.tsx';
import { IframeViewer } from '@ui-kit/IframeViewer/IframeViewer.tsx';
import Overlay from '@ui-kit/Overlay/Overlay.tsx';

interface ChatAttachmentProps extends UiComponentProps {
    onRemoveClick: () => void;
    file: File | string;
    isStatic?: boolean;
}

export const Attachment: React.FC<ChatAttachmentProps> = ({
    onRemoveClick,
    file,
    isStatic = false,
}) => {
    const handleRemoveClick = () => {
        onRemoveClick();
    };

    const [linkToFile, setLinkToFile] = useState('');
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

    useEffect(() => {
        if (file instanceof File) {
            setLinkToFile(URL.createObjectURL(file));
        }

        return () => URL.revokeObjectURL(linkToFile);
    }, [file, linkToFile]);

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
                onClick={() => setOverlayIsShowing(true)}
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
                <IframeViewer linkToFile={linkToFile}></IframeViewer>
            </Overlay>
        </Container>
    );
};
