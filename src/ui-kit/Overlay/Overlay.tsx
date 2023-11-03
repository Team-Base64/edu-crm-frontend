import React, { useCallback, useEffect, useId, useState } from 'react';
import styles from './Overlay.module.scss';
import Button from '@ui-kit/Button/Button';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';

interface OverpayProps {
    isShowning: boolean;
    closeOverlay: () => void;
    children?: React.ReactNode;
}

const overlayStateStyle = {
    opened: styles.opened,
    closed: styles.closed,
    opening: styles.opening,
    closing: styles.closing,
};

type OverlayState = keyof typeof overlayStateStyle;

const ANIMATION_TIME_MS = 490;

const overlays: string[] = [];

const Overlay: React.FC<OverpayProps> = ({
    isShowning,
    closeOverlay,
    children,
}) => {
    const [state, setState] = useState<OverlayState>('closed');
    const [prevState, setPrevState] = useState<OverlayState>('closed');
    const id = useId();

    useEffect(() => {
        setPrevState(state);
    }, [state]);

    useEffect(() => {
        if (isShowning && prevState !== 'opened' && prevState !== 'opening') {
            setState('opening');
            setTimeout(() => {
                setState('opened');
                overlays.push(id);
                if (!document.body.classList.contains(styles.noscroll)) {
                    document.body.classList.add(styles.noscroll);
                }
            }, ANIMATION_TIME_MS);
            return;
        }

        if (!isShowning && prevState !== 'closed' && prevState !== 'closing') {
            setState('closing');
            setTimeout(() => {
                setState('closed');
                overlays.pop();
                if (!overlays.length) {
                    document.body.classList.remove(styles.noscroll);
                }
            }, ANIMATION_TIME_MS);
            return;
        }
    }, [id, prevState, isShowning]);

    const handleKeydown = useCallback(
        (e: KeyboardEvent) => {
            const { code } = e;
            if (code === 'Escape' && overlays) {
                if (id === overlays.at(-1)) {
                    closeOverlay();
                }
            }
        },
        [closeOverlay, id],
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        return () => document.removeEventListener('keydown', handleKeydown);
    }, [handleKeydown]);

    return (
        <Container
            direction={'vertical'}
            classes={[styles.overlay, overlayStateStyle[state]].join(' ')}
            onClick={closeOverlay}
        >
            <Button
                type={'link'}
                onClick={closeOverlay}
                classes={styles.closeButton}
            >
                <Icon
                    classes={styles.closeButton__icon}
                    name={'closeCircle'}
                    size={'large'}
                />
            </Button>

            <Container
                direction={'vertical'}
                classes={styles.content}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </Container>
        </Container>
    );
};

export default Overlay;

/*

<div
            className={[styles.overlay, overlayStateStyle[state]].join(' ')}
            onClick={() => console.log('cl')}
        >
            <Button
                onClick={closeOverlay}
                classes={styles.closeButton}
            >
                X
            </Button>
            <Container
                direction={'vertical'}
                classes={styles.content}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </Container>
        </div>




   const handleKeydown = useCallback((e: KeyboardEvent) => {
        const { code } = e;
        if (code === 'Escape') {
            closeOverlay();
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, []);

 */
