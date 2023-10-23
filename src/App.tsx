import React from 'react';
import Button from '@ui-kit/Button/Button';
import styles from './App.module.scss';
import Text from '@ui-kit/Text/Text';
import Container from '@ui-kit/Container/Container';
import Input from '@ui-kit/Input/Input';
import Icon from '@ui-kit/Icon/Icon';
import Avatar from '@ui-kit/Avatar/Avatar';
import MessageItem from '@components/MessageItem/MessageItem';
import Chat from '@components/Chat/Chat';

const App: React.FC = () => {
    const short_msg = 'Hello world!';
    const long_msg =
        'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.';
    const man_photo_src =
        'https://flirtic.com/media/photos/1/e/7/1e733948480.jpg';
    const man_2 =
        'https://i.pinimg.com/736x/04/40/ae/0440ae4c93dcea46323ace9051185636--face-photography-my-fashion.jpg';
    return (
        <div className={styles.app}>
            <br />
            Test Chat
            <br />
            <Chat id={1} />
            <br />
            Test Message item
            <br />
            <MessageItem
                isMine={false}
                text={short_msg}
                time={'18:09'}
                authorAvatarSrc={man_photo_src}
            />
            <MessageItem
                isMine={true}
                text={long_msg}
                time={'18:09'}
                authorAvatarSrc={man_photo_src}
            />
            <br />
            Test Avatarr
            <br />
            <Avatar
                src={man_photo_src}
                size={'small'}
            />
            <Avatar
                src={man_2}
                size={'medium'}
            />
            <Avatar
                src={man_2}
                size={'large'}
            />
            <br />
            Test Icons
            <br />
            <Container direction={'horizontal'}>
                <Icon name={'homeLine'} />
                <Icon name={'layoutLine'} />
                <Icon name={'chatLine'} />
                <Icon name={'calendarLine'} />
                <Icon name={'settingsLine'} />
                <Icon name={'logoutLine'} />
                <Icon name={'archiveLine'} />
                <Icon name={'chatRightFill'} />
                <Icon name={'chatSend'} />
                <Icon name={'pencilLine'} />
                <Icon name={'addLine'} />
                <Icon name={'arrowRight'} />
                <Icon name={'closeCircle'} />
                <Icon name={'copyLine'} />
                <Icon name={'deleteBinLine'} />
            </Container>
            <br />
            Test Icon sizes
            <br />
            <Icon
                name={'settingsLine'}
                size={'small'}
            />
            <Icon
                name={'settingsLine'}
                size={'medium'}
            />
            <Icon
                name={'settingsLine'}
                size={'large'}
            />
            <br />
            Test Icon coloring
            <br />
            <Icon
                name={'settingsLine'}
                size={'large'}
                color={'red'}
            />
            <br />
            Test Icon Clickable
            <br />
            <Icon
                name={'settingsLine'}
                size={'large'}
                onClick={() => {}}
            />
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
