import Container from '@ui-kit/Container/Container.tsx';
import MessageSelector from '@components/MessageSelector/MessageSelector.tsx';
import Messenger from '@components/Messenger/Messenger.tsx';
import React from 'react';
import styles from './ChatPage.module.scss';
import { MessengerHeader } from '@components/MessangerHeader/MessengerHeader.tsx';
import { unselectedId } from '@app/const/consts.ts';
import { useSearchParams } from 'react-router-dom';
import { routerQueryParams } from '@router/routes.ts';
import Text from '@ui-kit/Text/Text.tsx';
export const ChatPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const getChatIdParam = () =>
        searchParams.has('chatid')
            ? Number(searchParams.get(routerQueryParams.messenger.chatid))
            : unselectedId;

    const messengerPlaceholder = (
        <Text
            type={'h'}
            size={3}
            classes={styles.chatUnselectedMessangerText}
        >
            Выберете чат, чтобы начать общаться
        </Text>
    );

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
            {getChatIdParam() !== unselectedId ? (
                <Messenger
                    chatID={getChatIdParam()}
                    classes={styles.messenger}
                ></Messenger>
            ) : (
                messengerPlaceholder
            )}
        </Container>
    );
};
