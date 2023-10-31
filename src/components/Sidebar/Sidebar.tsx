import { UiComponentProps } from '@ui-kit/interfaces';
import styles from './Sidebar.module.scss';
import Container from '@ui-kit/Container/Container';
import SidebarButton from '@components/SidebarButton/SidebarButton';
import config from './SidebarConfig';

interface SidebarProps extends UiComponentProps {
}

const Sidebar: React.FC<SidebarProps> = () => {
    return (
        <Container
            classes={styles.sidebar}
            direction="vertical"
        >
            {
                config.map(group => (
                    <Container
                        classes={styles.group}
                        direction="vertical"
                    >
                        {group.map(({ title, path, iconName }) => (
                            <SidebarButton
                                title={title}
                                iconName={iconName}
                                path={path}
                            />
                        ))}
                    </Container>
                ))
            }
        </Container>
    );
};

export default Sidebar;
