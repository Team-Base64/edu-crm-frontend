import React, { useCallback, useEffect, useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import styles from './Image.module.scss';
import Spinner from '@ui-kit/Spinner/Spinner';

interface ImageProps extends UiComponentProps {
    src: string;
    alt?: string;
    onLoad?: () => any;
    onError?: () => any;
    imgRef?: React.LegacyRef<HTMLImageElement>;
}

enum ImageState {
    loading,
    loaded,
    error
}

const Image: React.FC<ImageProps> = ({
    src,
    alt,
    onClick,
    onLoad,
    onError,
    classes,
    imgRef,
}) => {
    const [state, setState] = useState<ImageState>(ImageState.loading);

    useEffect(() => {
        setState(ImageState.loading);
    }, [src]);


    const handleLoad = useCallback(() => {
        console.log('Loaded');
        setState(ImageState.loaded);
        onLoad?.();
    }, [setState, onLoad]);

    const handleError = useCallback(() => {
        console.log('NOT Loaded');
        setState(ImageState.error);
        onError?.();
    }, []);
    return (
        <>
            {state === ImageState.loading && <Spinner />}
            {state === ImageState.error && <div>Error</div>}
            <img
                ref={imgRef}
                className={[styles.image, classes].join(' ')}
                style={{ display: state === ImageState.loaded ? 'block' : 'none' }}
                onClick={onClick}
                onLoad={handleLoad}
                onError={handleError}
                src={src}
                alt={alt ? alt : ''}
            />
        </>
    );
};

export default Image;
