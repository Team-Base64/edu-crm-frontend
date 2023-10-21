import React from 'react';
import Button from '@ui-kit/Button/Button';
import styles from './App.module.scss';
import Text from '@ui-kit/Text/Text';
import Container from '@ui-kit/Container/Container';
import Input from '@ui-kit/Input/Input';

const App: React.FC = () => {
    return (
        <div className={styles.app}>
            <br />
            Test button types:
            <br />
            <Button>Test Primary</Button>
            <Button type={'secondary'}>Test Secondary</Button>
            <Button type={'link'}>Test Link</Button>
            <br />
            Test button sizes:
            <br />
            <Button size={'s'}>Test S</Button>
            <Button size={'m'}>Test M</Button>
            <Button size={'l'}>Test L</Button>
            <br />
            Test Input
            <br />
            <Input
                label={'Title Default'}
                placeholder={'Placeholder example'}
            />
            <Input
                label={'Title Error'}
                errorHint={'error message example'}
                placeholder={'Placeholder example'}
            />
            <Input
                label={'Title Success'}
                placeholder={'Placeholder example'}
                success
            />
            <Input
                label={'Title Small'}
                placeholder={'Placeholder example'}
                sizeType={'s'}
            />
            <Input
                label={'Title Medium'}
                sizeType={'m'}
                placeholder={'Placeholder example'}
            />
            <Input
                label={'Title Large'}
                placeholder={'Placeholder example'}
                sizeType={'l'}
            />
            <br />
            Test Headers:
            <br />
            <Text type={'h1'}>H1 test</Text>
            <Text type={'h2'}>H2 test</Text>
            <Text type={'h3'}>H3 test</Text>
            <Text type={'h4'}>H4 test</Text>
            <Text type={'h5'}>H5 test</Text>
            <Text type={'h6'}>H6 test</Text>
            <br />
            Test Paragraphs
            <br />
            <Text type={'p'}>P test</Text>
            <Text type={'p2'}>P2 test</Text>
            <br />
            Test Bold
            <br />
            <Text
                type={'h4'}
                weight={'regular'}
            >
                regular
            </Text>
            <Text
                type={'h4'}
                weight={'bold'}
            >
                Bold
            </Text>
            <br />
            Test Containers
            <br />
            Hor gap = medium
            <Container
                direction={'horizontal'}
                gap={'m'}
                classes={styles.app__container}
            >
                <div>Elem 1</div>
                <div>Elem 2</div>
                <div>Elem 3</div>
            </Container>
            Vert gap = large
            <Container
                direction={'vertical'}
                gap={'l'}
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
