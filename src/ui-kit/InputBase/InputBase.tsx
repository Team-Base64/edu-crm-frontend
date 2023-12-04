import InputError from '@ui-kit/InputError/InputError';
import Label, { LabelProps } from '@ui-kit/Label/Label';
import React from 'react';
import Container from '@ui-kit/Container/Container';
import styles from './InputBase.module.scss';

const sizes = {
    s: styles.small,
    m: styles.medium,
    l: styles.large,
};

type Size = keyof typeof sizes;

const borders = {
    thin: styles.borderThin,
    default: styles.borderDefault,
    thick: styles.borderThick,
    none: '',
};

type Border = keyof typeof borders;

export interface InputBaseProps {
    label?: LabelProps;
    sizeType?: Size;
    border?: Border;
    classes?: string;
    icon?: React.JSX.Element;
    button?: React.JSX.Element;
    errors?: string[];
    children?: React.ReactNode;
}

const InputBase: React.FC<InputBaseProps> = ({
    label,
    sizeType = 'm',
    border = 'default',
    classes = '',
    icon,
    button,
    children,
    errors,
}) => {
    return (
        <Container
            direction={'vertical'}
            gap={sizeType}
            classes={[sizes[sizeType], styles.container, classes].join(' ')}
        >
            {label && (
                <Label
                    {...label}
                    classes={[label.classes, styles.label].join(' ')}
                />
            )}

            <Container
                direction={'horizontal'}
                gap={sizeType}
                classes={[
                    errors?.length ? styles.invalid : '',
                    styles.wrapper,
                    borders[border],
                ].join(' ')}
            >
                {icon && icon}
                {children}
                {button && button}
            </Container>

            <InputError
                errors={errors}
                classes={styles.errors}
            />
        </Container>
    );
};

export default InputBase;
