import { UiComponentProps } from "@ui-kit/interfaces";
import styles from './Sidebar.module.scss';
import Container from "@ui-kit/Container/Container";
import SidebarButton from "@components/SidebarButton/SidebarButton";

interface SidebarProps extends UiComponentProps {
}

const Sidebar: React.FC<SidebarProps> = ({ }) => {

    return (
        <Container classes={styles.sidebar} direction="vertical">
            <Container classes={styles.group} direction="vertical">
                <SidebarButton isActive={false} title='test' iconName='homeLine' onClick={() => { }} />
                <SidebarButton isActive={false} title='test' iconName='homeLine' onClick={() => { }} />
                <SidebarButton isActive={false} title='test' iconName='homeLine' onClick={() => { }} />
                <SidebarButton isActive={false} title='test' iconName='homeLine' onClick={() => { }} />
                <SidebarButton isActive={false} title='test' iconName='homeLine' onClick={() => { }} />

            </Container>
            <Container classes={styles.group} direction="vertical">
                <SidebarButton isActive={false} title='test' iconName='homeLine' onClick={() => { }} />

            </Container>
        </Container>
    );
}

export default Sidebar;