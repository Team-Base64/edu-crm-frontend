import Button, { ButtonSize } from '@ui-kit/Button/Button';
import Icon, { IconName, IconSize } from '@ui-kit/Icon/Icon';
import Text from '@ui-kit/Text/Text';
import styles from './SidebarItem.module.scss';
import { NavLink } from 'react-router-dom';

interface SidebarButtonProps {
    iconName: IconName;
    title: string;
    path: string;
    btnSize?: ButtonSize;
    iconSize?: IconSize;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
    btnSize = 's',
    iconSize = 'small',
    title,
    iconName,
    path,
}) => {
    return (
        <li className={styles.li}>
            <NavLink
                to={path}
                className={({ isActive }) =>
                    [styles.a, isActive ? styles.active : ''].join(' ')
                }
            >
                <Button
                    size={btnSize}
                    classes={styles.button}
                    type="link"
                >
                    <Icon
                        classes={styles.icon}
                        size={iconSize}
                        name={iconName}
                    />
                    <Text
                        classes={styles.title}
                        type="h6"
                        weight="bold"
                    >
                        {title}
                    </Text>
                </Button>
            </NavLink>
        </li>
    );
};

export default SidebarButton;
