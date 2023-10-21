import React from 'react';
import Button from '@ui-kit/Button/Button';
import styles from './App.module.scss';
import Text from '@ui-kit/Text/Text';
import Container from '@ui-kit/Container/Container';

const App: React.FC = () => {
    return (
        <div className={styles.app}>
            Test button types:
            <Button>Test Primary</Button>
            <Button type={'secondary'}>Test Secondary</Button>
            <Button type={'link'}>Test Link</Button>
            Test button sizes:
            <Button size={'s'}>Test S</Button>
            <Button size={'m'}>Test M</Button>
            <Button size={'l'}>Test L</Button>
            <Text type={'h1'}>H1 test</Text>
            <Text type={'h2'}>H2 test</Text>
            <Text
                type={'p'}
                weight={'bold'}
            >
                p1 test
            </Text>
            <Text type={'p2'}>p2 test</Text>
            <Container
                direction={'horizontal'}
                gap={'l'}
                classes={styles.app__container}
            >
                <div>Elem 1</div>
                <div>Elem 2</div>
                <div>Elem 3</div>
            </Container>
            <Container
                direction={'vertical'}
                gap={'s'}
                classes={styles.app__container}
            >
                <div>Elem 1</div>
                <div>Elem 2</div>
                <div>Elem 3</div>
            </Container>
        </div>
    );
};

export default App;
