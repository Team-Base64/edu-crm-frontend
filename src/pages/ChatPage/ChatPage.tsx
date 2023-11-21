import Container from '@ui-kit/Container/Container.tsx';
import MessageSelector from '@components/MessageSelector/MessageSelector.tsx';
import Messenger from '@components/Messenger/Messenger.tsx';
import React from 'react';
import styles from './ChatPage.module.scss';
import { MessengerHeader } from '@components/MessangerHeader/MessengerHeader.tsx';
import { unselectedId } from '@app/const/consts.ts';
import { useSearchParams } from 'react-router-dom';
import { routerQueryParams } from '@router/routes.ts';
export const ChatPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const getChatIdParam = () =>
        searchParams.has('chatid')
            ? Number(searchParams.get(routerQueryParams.messenger.chatid))
            : unselectedId;

    return (
        <Container
            direction={'grid'}
            classes={styles.chat}
        >
            <MessageSelector
                useQueryParams={[searchParams, setSearchParams]}
                classes={styles.dialogList}
            ></MessageSelector>
            <MessengerHeader
                chatID={getChatIdParam()}
                classes={styles.messengerHeader}
            ></MessengerHeader>
            <Messenger
                chatID={getChatIdParam()}
                classes={styles.messenger}
            ></Messenger>
        </Container>
    );
};
