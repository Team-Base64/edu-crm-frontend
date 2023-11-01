import React, { useCallback, useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import styles from './Image.module.scss';
interface ImageProps extends UiComponentProps {
    src: string;
    alt?: string;
    onLoad?: () => any;
    imgRef?: React.LegacyRef<HTMLImageElement>;
}

const Image: React.FC<ImageProps> = ({
    src,
    alt,
    onClick,
    onLoad,
    classes,
    imgRef,
}) => {
    const [loading, setLoading] = useState<boolean>(true);

    const handleLoad = useCallback(() => {
        setLoading(false);
        onLoad?.();
    }, [loading]);

    return (
        <>
            {loading && <div className={styles.spinner}> Spinner </div>}
            <img
                ref={imgRef}
                className={[classes].join(' ')}
                style={loading ? { display: 'none' } : {}}
                onClick={onClick}
                onLoad={handleLoad}
                src={src}
                alt={alt ? alt : ''}
            />
        </>
    );
};

export default Image;
