import { UiComponentProps } from '@ui-kit/interfaces.ts';
import React from 'react';
import Container from '@ui-kit/Container/Container.tsx';
import { Attachment } from '@ui-kit/Attachment/Attachment.tsx';
import styles from './AttachmentsList.module.scss';
import { noop } from '@app/const/consts.ts';

interface ChatAttachmentsListProps extends UiComponentProps {
    useFiles?: [File[], React.Dispatch<React.SetStateAction<File[]>>];
    staticAttachments?: string[] | File[];
}

export const AttachmentsList: React.FC<ChatAttachmentsListProps> = ({
    useFiles = [[], noop],
    staticAttachments,
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

    const iterableData = staticAttachments ?? files;
    const isStaticAttachments = !!staticAttachments;

    const filesLayout = iterableData.map((file, index) => {
        return (
            <Attachment
                onRemoveClick={onRemoveClick.bind(this, index)}
                key={index + new Date().getUTCSeconds()}
                file={file}
                isStatic={isStaticAttachments}
            ></Attachment>
        );
    });

    const getContainerClasses = () => {
        const backgroundColorClass = isStaticAttachments
            ? ''
            : styles.chatAttachListAddAttach;
        return [styles.chatAttachList, backgroundColorClass].join(' ');
    };

    return (
        <Container
            direction={'vertical'}
            classes={filesLayout?.length ? getContainerClasses() : ''}
            layout={'sub'}
        >
            {filesLayout}
        </Container>
    );
};
