import React from 'react';
import styles from './Input.module.scss';
import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import Tooltip, { placementOfTooltip } from '@ui-kit/TooltipKit/Tooltip.tsx';

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
    none: '',
};

type BorderType = keyof typeof borderType;

export type InputErrorType = { text: string; position: placementOfTooltip };

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
    error?: InputErrorType;
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
    error,
    ...rest
}) => {
    return (
        <Container
            direction={'vertical'}
            gap={sizeType}
            classes={[
                inputSizeType[sizeType],
                classes,
                styles.baseContainer,
            ].join(' ')}
        >
            {label && (
                <label className={styles.title}>
                    <Text
                        type={'h'}
                        size={5}
                    >
                        {label}
                    </Text>
                </label>
            )}

            <Tooltip
                text={error?.text ?? ''}
                place={error ? error.position : 'right'}
                visibility={error?.text ? 'visible' : 'hidden'}
            >
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
            </Tooltip>
            {errorHint && <div className={styles.errorHint}>{errorHint}</div>}
        </Container>
    );
};

export default Input;
