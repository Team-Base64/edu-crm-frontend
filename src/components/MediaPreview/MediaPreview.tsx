import { checkIfImageByExtension } from '../../utils/attaches/attachesExtensions.ts';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import React from 'react';
import { IframeViewer } from '@ui-kit/IframeViewer/IframeViewer.tsx';
import ImageViewer from '@ui-kit/ImageViewer/ImageViewer.tsx';

interface MediaPreviewProps extends UiComponentProps {
    linkToFile: string;
    fileName?: string;
}

export const MediaPreview: React.FC<MediaPreviewProps> = ({
    linkToFile,
    fileName,
}) => {
    const isImage = checkIfImageByExtension(fileName ?? '');

    console.log(fileName, isImage);
    if (isImage) {
        return <ImageViewer src={[linkToFile]}></ImageViewer>;
    } else {
        return <IframeViewer linkToFile={linkToFile}></IframeViewer>;
    }
};
