import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import Text from '@ui-kit/Text/Text';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useEffect } from 'react';
import styles from './Hint.module.scss';

interface HintProps extends UiComponentProps {
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    timeoutSec?: number;
    text: string;
    onClose?: () => void;
}

const Hint: React.FC<HintProps> = ({
    text,
    classes,
    timeoutSec,
    onClose,
    state,
}) => {
    const [hint, showHint] = state;

    const handleClose: React.MouseEventHandler = (e) => {
        e.stopPropagation();
        showHint(false);
    };

    useEffect(() => {
        if (timeoutSec && hint) {
            setTimeout(() => {
                showHint(false);
                onClose?.();
            }, timeoutSec * 1000);
        }
    }, [hint, onClose, showHint, timeoutSec]);

    return (
        <>
            {hint && (
                <Container
                    layout="defaultBase"
                    classes={[styles.hint, classes].join(' ')}
                >
                    <Icon
                        name="infoCircle"
                        size="small"
                        classes={styles.hintIcon}
                    />
                    <Text
                        type="p"
                        size={2}
                        classes={styles.hintText}
                    >
                        {text}
                    </Text>
                    <Icon
                        name="close"
                        size="small"
                        classes={styles.hintClose}
                        onClick={handleClose}
                    />
                </Container>
            )}
        </>
    );
};

export default Hint;
