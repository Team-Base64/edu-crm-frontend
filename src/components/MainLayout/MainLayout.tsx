import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import Sidebar from '@components/Sidebar/Sidebar';

const MainLayout: React.FC = () => {
    return (
        <div className={styles.mainLayout}>
            <nav>
                <Sidebar />
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
