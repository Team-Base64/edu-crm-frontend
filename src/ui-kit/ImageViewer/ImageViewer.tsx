import React, { useCallback, useState } from 'react';

interface ImageViewerProps {
    src: string[];
}
const ImageViewer: React.FC<ImageViewerProps> = ({ src }) => {
    const [index, setIndex] = useState<number>(0);

    const nextImage = useCallback(() => {
        if (index < src.length - 1) {
            setIndex(index + 1);
        }
    }, [index]);

    const prevIndex = useCallback(() => {
        if (index > 1) {
            setIndex(index - 1);
        }
    }, [index]);

    return <div></div>;
};

export default ImageViewer;
