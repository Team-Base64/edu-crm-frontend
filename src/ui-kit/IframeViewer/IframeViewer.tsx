import { UiComponentProps } from '@ui-kit/interfaces.ts';
import React, { useEffect, useRef } from 'react';
import styles from './IframeViewer.module.scss';

interface IframeViewerProps extends UiComponentProps {
    linkToFile: string;
}

export const IframeViewer: React.FC<IframeViewerProps> = ({
    linkToFile,
    classes = '',
}) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (iframeRef.current) {
            iframeRef.current.src = linkToFile;
        }
    }, [linkToFile, iframeRef]);

    return (
        <iframe
            ref={iframeRef}
            className={[classes, styles.fileViewer].join(' ')}
        ></iframe>
    );
};
