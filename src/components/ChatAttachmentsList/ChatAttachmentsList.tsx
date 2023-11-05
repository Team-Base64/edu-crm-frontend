import { UiComponentProps } from '@ui-kit/interfaces.ts';
import React from 'react';
import Container from '@ui-kit/Container/Container.tsx';
import { ChatAttachment } from '@components/ChatAttachment/ChatAttachment.tsx';

interface ChatAttachmentsListProps extends UiComponentProps {
    useFiles: [
        File[] | undefined,
        React.Dispatch<React.SetStateAction<File[] | undefined>>,
    ];
}

export const ChatAttachmentsList: React.FC<ChatAttachmentsListProps> = ({
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
            <ChatAttachment
                onRemoveClick={onRemoveClick.bind(this, index)}
                key={index + new Date().getUTCSeconds()}
                file={file}
            ></ChatAttachment>
        );
    });

    return <Container direction={'vertical'}>{filesLayout}</Container>;
};
