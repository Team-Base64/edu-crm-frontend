import React from 'react';
import styles from './Input.module.scss';
import Container from '@ui-kit/Container/Container';

const inputSizeType = {
    s: styles.small,
    m: styles.medium,
    l: styles.large,
};

type InputSizeType = keyof typeof inputSizeType;

const borderType = {
    thin: styles.containerBorderThin,
    default: styles.containerBorderDefault,
    thick: styles.containerBorderThick,
};

type BorderType = keyof typeof borderType;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    errorHint?: string;
    success?: boolean;
    sizeType?: InputSizeType;
    border?: BorderType;
    classes?: string;
    icon?: JSX.Element;
    button?: JSX.Element;
    inputRef?: React.LegacyRef<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
    label,
    errorHint,
    success,
    disabled,
    sizeType = 'm',
    border = 'default',
    classes = '',
    icon,
    button,
    inputRef,
    ...rest
}) => {
    return (
        <>
            <Container
                direction={'vertical'}
                gap={sizeType}
                classes={[inputSizeType[sizeType], classes].join(' ')}
            >
                {label && <label className={styles.title}>{label}</label>}

                <Container
                    direction={'horizontal'}
                    gap={sizeType}
                    classes={[
                        styles.container,
                        errorHint ? styles.containerError : '',
                        success ? styles.containerSuccess : '',
                        borderType[border],
                    ].join(' ')}
                >
                    {icon && icon}
                    <input
                        ref={inputRef}
                        disabled={disabled || false}
                        className={styles.input}
                        {...rest}
                    />
                    {button && button}
                </Container>
                {errorHint && (
                    <div className={styles.errorHint}>{errorHint}</div>
                )}
            </Container>
        </>
    );
};

export default Input;
