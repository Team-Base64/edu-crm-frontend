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
    archiveLine: Icons.ArchiveLine,
    chatRightFill: Icons.ChatRightFill,
    chatSend: Icons.ChatSendFill,
    pencilLine: Icons.PencilLine,
    addLine: Icons.AddLine,
    arrowRight: Icons.ArrowRight,
    closeCircle: Icons.CloseCircle,
    copyLine: Icons.CopyLine,
    deleteBinLine: Icons.DeleteBinLine,
    searchIcon: Icons.SearchIcon,
    loading: Icons.Loading,
    attachIcon: Icons.AttachIcon,
    fileIcon: Icons.FileIcon,
    user: Icons.UserLine,
    close: Icons.CloseLine,
    eye: Icons.EyeLine,
    eyeCrossed: Icons.EyeCrossedLine,
    lock: Icons.LockLine,
    approve: Icons.ApproveLine,
    save: Icons.SaveLine,
    book: Icons.BookLine,
    ulist: Icons.UList,
    alert: Icons.Alert,
};

export type IconName = keyof typeof iconName;

const iconSize = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
    '': '',
};
export type IconSize = keyof typeof iconSize;

export interface IconProps extends UiComponentProps {
    name: IconName;
    // color?: string;
    // stroke?: string;
    // background?: string;
    size?: IconSize;
}

const Icon: React.FC<IconProps> = ({
    name,
    // stroke = 'black',
    // color = 'black',
    // background = 'none',
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
            // style={{
            // fill: color,
            // background: background,
            // stroke: stroke,
            // }}
        ></SelectedIcon>
    );
};

export default Icon;
