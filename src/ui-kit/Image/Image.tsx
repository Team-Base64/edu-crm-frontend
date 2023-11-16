import React, { useCallback, useEffect, useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import styles from './Image.module.scss';
import Spinner from '@ui-kit/Spinner/Spinner';
import Icon from '@ui-kit/Icon/Icon';

const loadTimeoutMS = 2000;

interface ImageProps extends UiComponentProps {
    src: string;
    alt: string;
    onLoad?: () => void;
    onError?: () => void;
    // imgRef?: React.LegacyRef<HTMLImageElement>;
}

enum ImageState {
    loading,
    loaded,
    error,
}

const Image: React.FC<ImageProps> = ({
    src,
    alt,
    onClick,
    onLoad,
    onError,
    classes,
    // imgRef,
}) => {
    const [state, setState] = useState<ImageState>(ImageState.loading);

    useEffect(() => {
        setState(ImageState.loading);

        setTimeout(() => {
            if(state === ImageState.loading) {
                setState(ImageState.error);
            }
        }, loadTimeoutMS);

    }, [src, setState]);

    const handleLoad = useCallback(() => {
        setState(ImageState.loaded);
        onLoad?.();
    }, [setState, onLoad]);

    const handleError = useCallback(() => {
        setState(ImageState.error);
        onError?.();
    }, [setState, onError]);

    return (
        <div className={[classes, styles.wrapper].join(' ')}>
            {state === ImageState.loading && <Spinner classes={styles.spinner} />}
            {state === ImageState.error && <Icon classes={styles.error} name='alert'/>}
            <img
                // ref={imgRef}
                className={styles.image}
                style={{
                    display: state === ImageState.loaded ? 'block' : 'none',
                }}
                onClick={onClick}
                onLoad={handleLoad}
                onError={handleError}
                src={src}
                alt={alt}
            />
        </div>
    );
};

export default Image;
