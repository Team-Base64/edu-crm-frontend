import React, {
    MouseEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import styles from './Overlay.module.scss';
import Button from '@ui-kit/Button/Button';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
interface OverpayProps {
    isOpen: boolean;
    closeOverlay: () => void;

    children?: React.ReactNode;
}

const overlayStateStyle = {
    open: styles.open,
    closed: styles.closed,
    opening: styles.opening,
    closing: styles.closing,
    hidden: styles.hidden,
};
type OverlayState = keyof typeof overlayStateStyle;

const DEFAULT_ANIMATION_TIME_MS = 500;

const Overlay: React.FC<OverpayProps> = ({
    isOpen,
    closeOverlay,
    children,
}) => {
    const [state, setState] = useState<OverlayState>('closed');
    const prevState_ref = useRef<OverlayState>('closed');

    useEffect(() => {
        prevState_ref.current = state;
    }, [state]);

    useEffect(() => {
        if (isOpen && prevState_ref.current !== 'open') {
            setState('opening');
            document.body.classList.add(styles.noscroll);
            setTimeout(() => {
                setState('open');
            }, DEFAULT_ANIMATION_TIME_MS);
            return;
        }
        if (!isOpen && prevState_ref.current !== 'closed') {
            setState('closing');
            document.body.classList.remove(styles.noscroll);
            setTimeout(() => {
                setState('closed');
            }, DEFAULT_ANIMATION_TIME_MS);
        }
    }, [isOpen]);

    const handleKeydown = useCallback((e: KeyboardEvent) => {
        console.log(e.target);
        e.stopPropagation();
        const { code } = e;
        if (code === 'Escape') {
            closeOverlay();
        }
        // e.stopPropagation();
    }, []);

    const handleCloseEvent = useCallback(
        (e: MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();
            closeOverlay();
        },
        [closeOverlay],
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, []);

    return (
        <Container
            direction={'vertical'}
            classes={[styles.overlay, overlayStateStyle[state]].join(' ')}
            onClick={handleCloseEvent}
        >
            <Button
                type={'link'}
                onClick={handleCloseEvent}
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
