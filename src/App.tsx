import React from 'react';
import Button from '@ui-kit/Button/Button';
import styles from './App.module.scss';
import Text from '@ui-kit/Text/Text';
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
            <Text type={'h1'}>H1 test</Text>
            <Text type={'h2'}>H2 test</Text>
            <Text
                type={'p'}
                weight={'bold'}
            >
                p1 test
            </Text>
            <Text type={'p2'}>p2 test</Text>
        </div>
    );
};

export default App;
