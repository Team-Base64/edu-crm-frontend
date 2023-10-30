import Button, { ButtonSize } from "@ui-kit/Button/Button";
import Icon, { IconName, IconSize } from "@ui-kit/Icon/Icon";
import Text from "@ui-kit/Text/Text";
import { UiComponentProps } from "@ui-kit/interfaces";
import styles from './SidebarItem.module.scss';

interface SidebarButtonProps extends UiComponentProps {
    iconName: IconName;
    title: string;
    isActive: boolean;
    btnSize?: ButtonSize;
    iconSize?: IconSize;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ btnSize = 's', iconSize = 'small', onClick, title, iconName, isActive }) => {

    return (
        <li className={styles.item}>
            <Button size={btnSize} classes={styles.button} type="link">
                <Icon classes={styles.icon} size={iconSize} name={iconName} />
                <Text classes={styles.title} type="h6" weight="bold">{title}</Text>
            </Button>
        </li>
    );
}

export default SidebarButton;