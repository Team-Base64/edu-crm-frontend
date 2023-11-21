import React from 'react';
import styles from './Input.module.scss';
import Container from '@ui-kit/Container/Container';
import Label, { LabelProps } from '@ui-kit/Label/Label';
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
    label?: LabelProps;
    errorHint?: string;
    success?: boolean;
    sizeType?: InputSizeType;
    border?: BorderType;
    classes?: string;
    icon?: React.JSX.Element;
    button?: React.JSX.Element;
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
            {label && <Label {...label} />}

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
        </Container>
    );
};

export default Input;
