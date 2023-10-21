import React from 'react';
import styles from './Input.module.scss';
import Container, { ContainerGap } from '@ui-kit/Container/Container';

const inputSizeType = {
    s: styles.small,
    m: styles.medium,
    l: styles.large,
};
export type InputSizeType = keyof typeof inputSizeType;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    errorHint?: string;
    success?: boolean;
    rightIcon?: any;
    leftIcon?: any;
    sizeType?: InputSizeType;
}

const Input: React.FC<InputProps> = ({
    label,
    errorHint,
    success,
    disabled,
    leftIcon,
    rightIcon,
    sizeType = 'm',
    ...rest
}) => {
    const gap = sizeType as ContainerGap;

    return (
        <>
            <Container
                direction={'vertical'}
                gap={gap}
                classes={inputSizeType[sizeType]}
            >
                {label && <label className={styles.title}>{label}</label>}

                <Container
                    direction={'horizontal'}
                    gap={gap}
                    classes={[
                        styles.container,
                        errorHint ? styles.containerError : '',
                        success ? styles.containerSuccess : '',
                    ].join(' ')}
                >
                    {leftIcon && 'LICO'}
                    <input
                        disabled={disabled || false}
                        className={styles.input}
                        {...rest}
                    />
                    {rightIcon && 'RICO'}
                </Container>
                {errorHint && (
                    <div className={styles.errorHint}>{errorHint}</div>
                )}
            </Container>
        </>
    );
};

export default Input;
