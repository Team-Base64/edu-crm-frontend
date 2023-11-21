import Text, { TextProps } from '@ui-kit/Text/Text';
import React from 'react';

export interface LabelProps extends TextProps {
    htmlFor?: string;
    text: string;
}

const Label: React.FC<LabelProps> = ({ htmlFor, text, ...rest }) => {
    return (
        <label htmlFor={htmlFor}>
            <Text {...rest}>{text}</Text>
        </label>
    );
};

export default Label;
