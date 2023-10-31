import { Outlet } from "react-router-dom";
import styles from './MainLayout.module.scss';

const MainLayout: React.FC = () => {

    return (
        <div className={styles.mainLayout}>
            <nav>
                navbar
            </nav>
            <main>
                content: 
                <Outlet />
            </main>

        </div>
    );
}

export default MainLayout;