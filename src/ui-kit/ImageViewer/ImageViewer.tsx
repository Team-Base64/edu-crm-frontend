import React, { useCallback, useEffect, useState } from 'react';
import Container from '@ui-kit/Container/Container';
import Button from '@ui-kit/Button/Button';
import Image from '@ui-kit/Image/Image';

import styles from './ImageViewer.module.scss';

interface ImageViewerProps {
    src: string[];
}
const ImageViewer: React.FC<ImageViewerProps> = ({ src }) => {
    const [index, setIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [rightArrow, setRightArrow] = useState(false);
    const [leftArrow, setLeftArrow] = useState(false);

    const handleLoad = useCallback(() => {
        setLoading(false);
    }, []);

    const nextImage = useCallback(() => {
        if (index < src.length - 1) {
            setIndex(index + 1);
        }
    }, [index]);

    const prevImage = useCallback(() => {
        if (index > 0) {
            setIndex(index - 1);
        }
    }, [index]);

    useEffect(() => {
        setLeftArrow(index > 0 ? true : false);
        setRightArrow(index < src.length - 1 ? true : false);
    }, [index]);

    const handleKeydown = useCallback(
        (e: KeyboardEvent) => {
            const { code } = e;
            if (code === 'ArrowLeft') {
                prevImage();
            }
            if (code === 'ArrowRight') {
                nextImage();
            }
        },
        [prevImage, nextImage],
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    });

    return (
        <Container
            direction={'horizontal'}
            classes={[styles.viewer].join(' ')}
        >
            <Button
                disabled={loading || !leftArrow}
                onClick={prevImage}
            >
                {'<'}
            </Button>
            {src.length > 0 && (
                <Image
                    src={src[index]}
                    onLoad={handleLoad}
                    classes={[styles.viewer__image].join(' ')}
                />
            )}
            {!src.length && <div>No images</div>}
            <Button
                disabled={loading || !rightArrow}
                onClick={nextImage}
            >
                {'>'}
            </Button>
        </Container>
    );
};

export default ImageViewer;
