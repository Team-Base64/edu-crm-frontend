import Container from "@ui-kit/Container/Container";
import Icon from "@ui-kit/Icon/Icon";
import Text from "@ui-kit/Text/Text";
import { UiComponentProps } from "@ui-kit/interfaces";
import { useEffect, useState } from "react";
import styles from './Hint.module.scss';

interface HintProps extends UiComponentProps {
    timeoutSec?: number;
    text: string;
}

const Hint: React.FC<HintProps> = ({ text, classes, timeoutSec }) => {
    const [hint, showHint] = useState(true);

    if (timeoutSec) {
        useEffect(() => {
            setTimeout(() => showHint(false), timeoutSec * 1000);
        }, []);
    }

    return (
        <>
            {hint && (
                <Container layout='defaultBase' classes={[styles.hint, classes].join(' ')}>
                    <Icon name='infoCircle' size="small" classes={styles.hintIcon} />
                    <Text type="p" size={2} classes={styles.hintText}>
                        {text}
                    </Text>
                    <Icon name='close' size="small" classes={styles.hintClose} onClick={() => showHint(false)} />
                </Container>
            )}
        </>
    );
}

export default Hint;