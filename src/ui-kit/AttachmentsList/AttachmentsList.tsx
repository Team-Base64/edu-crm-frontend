import { UiComponentProps } from '@ui-kit/interfaces.ts';
import React from 'react';
import Container from '@ui-kit/Container/Container.tsx';
import { Attachment } from '@ui-kit/Attachment/Attachment.tsx';
import styles from './AttachmentsList.module.scss';

interface ChatAttachmentsListProps extends UiComponentProps {
    useFiles: [File[], React.Dispatch<React.SetStateAction<File[]>>];
}

export const AttachmentsList: React.FC<ChatAttachmentsListProps> = ({
    useFiles,
}) => {
    const [files, setFiles] = useFiles;
    const onRemoveClick = (index: number) => {
        if (files instanceof Array) {
            files.splice(index, 1);
            setFiles([...files]);
        } else {
            console.error('not array');
        }
    };

    const filesLayout = files?.map((file, index) => {
        return (
            <Attachment
                onRemoveClick={onRemoveClick.bind(this, index)}
                key={index + new Date().getUTCSeconds()}
                file={file}
            ></Attachment>
        );
    });

    return (
        <Container
            direction={'vertical'}
            classes={filesLayout?.length ? styles.chatAttachList : ''}
            layout={'sub'}
        >
            {filesLayout}
        </Container>
    );
};
