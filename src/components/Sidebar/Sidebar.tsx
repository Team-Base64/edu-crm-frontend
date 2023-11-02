import { UiComponentProps } from '@ui-kit/interfaces';
import styles from './Sidebar.module.scss';
import Container from '@ui-kit/Container/Container';
import SidebarButton from '@components/SidebarButton/SidebarButton';
import config from './SidebarConfig';
import React, { useId } from 'react';

interface SidebarProps extends UiComponentProps {}

const Sidebar: React.FC<SidebarProps> = () => {
    const id = useId();
    return (
        <Container
            classes={styles.sidebar}
            direction="vertical"
        >
            {config.map((group, group_idx) => (
                <React.Fragment key={`${id}-group-${group_idx}`}>
                    <ul>
                        <Container
                            classes={styles.group}
                            direction="vertical"
                        >
                            {group.map(
                                ({ title, path, iconName, dangerous }, item_idx) => (
                                    <React.Fragment key={`${id}-item-${group_idx}-${item_idx}`}>
                                        <SidebarButton
                                            title={title}
                                            iconName={iconName}
                                            path={path}
                                            dangerous={dangerous}
                                        />
                                    </React.Fragment>
                                ),
                            )}
                        </Container>
                    </ul>
                </React.Fragment>
            ))}
        </Container>
    );
};

export default Sidebar;
