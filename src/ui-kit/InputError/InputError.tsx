import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import { UiComponentProps } from '@ui-kit/interfaces';
import React, { useId } from 'react';
import styles from './InputError.module.scss';

interface InputErrorProps extends UiComponentProps {
    errors?: string[];
}

const InputError: React.FC<InputErrorProps> = ({ errors, classes }) => {
    const key = useId();

    return errors?.length ? (
        <ul className={[styles.list, classes].join(' ')}>
            <Container
                direction="vertical"
                classes={styles.container}
            >
                {errors.map((err, idx) => (
                    <li
                        key={`${key}-${idx}`}
                        className={styles.item}
                    >
                        <Text
                            type="p"
                            size={1}
                            classes={styles.text}
                        >
                            {err}
                        </Text>
                    </li>
                ))}
            </Container>
        </ul>
    ) : null;
};

export default InputError;
