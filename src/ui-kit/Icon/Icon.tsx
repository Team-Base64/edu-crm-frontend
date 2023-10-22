import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import styles from './Icon.module.scss';
import * as Icons from './svg';

const iconName = {
    settingsLine: Icons.SettingsLine,
    homeLine: Icons.HomeLine,
    calendarLine: Icons.CalendarLine,
    logoutLine: Icons.LogoutLine,
    chatLine: Icons.ChatLine,
    layoutLine: Icons.LayoutLine,
};
export type IconName = keyof typeof iconName;

const iconSize = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
};
export type IconSize = keyof typeof iconSize;

interface IconProps extends UiComponentProps {
    name: IconName;
    color?: string;
    background?: string;
    size?: IconSize;
}

const Icon: React.FC<IconProps> = ({
    name,
    color = 'black',
    background = 'none',
    size = 'medium',
    onClick,
    classes,
}) => {
    const SelectedIcon = iconName[name];

    return (
        <SelectedIcon
            onClick={onClick}
            className={[
                iconSize[size],
                onClick ? styles.clickable : '',
                classes,
            ].join(' ')}
            style={{
                fill: color,
                background: background,
            }}
        ></SelectedIcon>
    );
};

export default Icon;
