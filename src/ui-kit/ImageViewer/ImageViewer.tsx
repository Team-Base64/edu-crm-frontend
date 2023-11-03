import React, { useCallback, useEffect, useState } from 'react';

import styles from './ImageViewer.module.scss';
import Container from '@ui-kit/Container/Container';
import Button from '@ui-kit/Button/Button';
import Image from '@ui-kit/Image/Image';
import { UiComponentProps } from '@ui-kit/interfaces';

interface ImageViewerProps extends UiComponentProps {
    src: string[];
}
const ImageViewer: React.FC<ImageViewerProps> = ({ src, classes }) => {
    const [index, setIndex] = useState<number>(0);
    const [leftArrow, setLeftArrow] = useState<boolean>(false);
    const [rightArrow, setRightArrow] = useState<boolean>(false);

    useEffect(() => {
        setLeftArrow(index > 0 ? true : false);
        setRightArrow(index < src.length - 1 ? true : false);
    }, [src, index, setLeftArrow, setRightArrow]);

    const prev = useCallback(() => {
        if (index > 0) {
            setIndex(index - 1);
        }
    }, [setIndex, index]);

    const next = useCallback(() => {
        if (index < src.length - 1) {
            setIndex(index + 1);
        }
    }, [src, setIndex, index]);

    const handleKeydown = useCallback(
        (e: KeyboardEvent) => {
            const { code } = e;
            if (code === 'ArrowLeft') {
                prev();
            }
            if (code === 'ArrowRight') {
                next();
            }
        },
        [prev, next],
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        return () => document.removeEventListener('keydown', handleKeydown);
    }, [handleKeydown]);

    return (
        <Container
            direction="horizontal"
            classes={[classes, styles.viewer].join(' ')}
        >
            <Button
                type="link"
                classes={styles.navBtn}
                disabled={!leftArrow}
                onClick={prev}
            >
                {'<'}
            </Button>
            <div className={styles.content}>
                <Image
                    classes={styles.image}
                    src={src[index]}
                    alt={`image-${index}`}
                />
            </div>
            <Button
                type="link"
                classes={styles.navBtn}
                disabled={!rightArrow}
                onClick={next}
            >
                {'>'}
            </Button>
        </Container>
    );
};

export default ImageViewer;
