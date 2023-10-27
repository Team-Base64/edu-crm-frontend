import React from 'react';
import Icon, { IconSize } from '@ui-kit/Icon/Icon';
import styles from './Spinner.module.scss';

interface SpinnerProps {
    classes?: string;
    size?: IconSize;
}

const Spinner: React.FC<SpinnerProps> = ({ classes, size = 'medium' }) => {
    return (
        <Icon
            name="loading"
            classes={[classes, styles.spinner].join(' ')}
            size={size}
        />
    );
};

export default Spinner;
