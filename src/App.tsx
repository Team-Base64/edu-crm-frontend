import React from 'react';
import Button from '@ui-kit/Button/Button';
import styles from './App.module.scss';
const App: React.FC = () => {
    return (
        <div className={styles.app}>
            Hello app!
            <Button
                size={'m'}
                type={'primary'}
            >
                Test
            </Button>
        </div>
    );
};

export default App;
