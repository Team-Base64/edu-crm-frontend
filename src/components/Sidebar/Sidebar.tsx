import { UiComponentProps } from '@ui-kit/interfaces';
import styles from './Sidebar.module.scss';
import Container from '@ui-kit/Container/Container';
import SidebarButton from '@components/SidebarButton/SidebarButton';

interface SidebarProps extends UiComponentProps {}

const Sidebar: React.FC<SidebarProps> = () => {
    return (
        <Container
            classes={styles.sidebar}
            direction="vertical"
        >
            <Container
                classes={styles.group}
                direction="vertical"
            >
                <SidebarButton
                    title="tes23232t"
                    iconName="homeLine"
                    path="/test"
                />
                <SidebarButton
                    title="test"
                    iconName="homeLine"
                    path="/test2"
                />
                <SidebarButton
                    title="home"
                    iconName="homeLine"
                    path="/"
                />
            </Container>
            <Container
                classes={styles.group}
                direction="vertical"
            >
                <SidebarButton
                    title="login"
                    iconName="homeLine"
                    path="/login"
                />
            </Container>
        </Container>
    );
};

export default Sidebar;
