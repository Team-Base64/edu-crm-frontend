import { UiComponentProps } from '@ui-kit/interfaces.ts';
import React, { useEffect, useRef } from 'react';

interface IframeViewerProps extends UiComponentProps {
    blob: Blob;
}

export const IframeViewer: React.FC<IframeViewerProps> = ({ blob }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const objectUrl = URL.createObjectURL(blob);
        if (iframeRef.current) {
            iframeRef.current.src = objectUrl;
        }

        return () => URL.revokeObjectURL(objectUrl);
    }, [iframeRef]);

    return <iframe ref={iframeRef}></iframe>;
};
