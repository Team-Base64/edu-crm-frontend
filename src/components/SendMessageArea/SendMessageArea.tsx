import Container from '@ui-kit/Container/Container.tsx';
import TextArea from '@ui-kit/TextArea/TextArea.tsx';
import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Button from '@ui-kit/Button/Button.tsx';
import Icon from '@ui-kit/Icon/Icon.tsx';
import styles from './SendMessageArea.module.scss';
import { AttachFile } from '@ui-kit/AttachFile/AttachFile.tsx';
import { AttachmentsList } from '@ui-kit/AttachmentsList/AttachmentsList.tsx';
import { useSendMessageMutation } from '@app/features/chat/chatSlice';
import { useGetDialogsQuery } from '@app/features/dialog/dialogSlice.ts';
import useSendAttaches from '../../hooks/useSendAttaches.ts';
import { SerializeAttachesFromBackend } from '../../utils/attaches/attachesSerializers.ts';
import { localStoragePath, unselectedId } from '@app/const/consts.ts';

interface SendMessageAreaProps extends UiComponentProps {
    id: number;
    name: string;
}

const SendMessageArea: React.FC<SendMessageAreaProps> = ({ id, name }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const [isDisabledSend, setIsDisabledSend] = useState(true);

    const [sendMessage] = useSendMessageMutation();

    const dialogData = useGetDialogsQuery(null);

    const { attaches, setAttaches, attachesSendPromise } =
        useSendAttaches('chat');

    const toSendMessage = (text: string, attaches: string[]) => {
        if (dialogData.data && id !== unselectedId) {
            sendMessage({
                message: {
                    chatID: id,
                    text: text.trim(),
                    ismine: true,
                    date: new Date().toISOString(),
                    socialType: dialogData.data.dialogs[id].socialType,
                    attaches,
                },
            });
        }
    };

    const sendMessageHandler = () => {
        if (!textAreaRef.current) {
            return;
        }

        if (attaches.length) {
            attachesSendPromise()
                .then((result) => {
                    const attaches = SerializeAttachesFromBackend(result);
                    toSendMessage(textAreaRef.current?.value ?? '', attaches);
                })
                .then(() => {
                    setAttaches([]);
                    if (textAreaRef.current) {
                        textAreaRef.current.value = '';
                    }
                })
                .catch((error) => console.error('sendAttaches: ', error));
        } else {
            setAttaches([]);
            toSendMessage(textAreaRef.current.value, []);
            textAreaRef.current.value = '';
        }
        localStorage.setItem(`${localStoragePath.chatArea}${id}`, '');
    };

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        sendMessageHandler();
    };

    useEffect(() => {
        const savedMsg =
            localStorage.getItem(`${localStoragePath.chatArea}/${id}`) ?? '';
        if (!textAreaRef.current) return;
        textAreaRef.current.value = savedMsg;
        setIsDisabledSend(!textAreaRef.current.value && !attaches.length);
    }, [id, setIsDisabledSend, attaches]);

    const handleMessageChange: ChangeEventHandler<HTMLTextAreaElement> = ({
        target,
    }) => {
        localStorage.setItem(`${localStoragePath.chatArea}${id}`, target.value);
        setIsDisabledSend(!target.value && !attaches.length);
    };

    return (
        <Container
            classes={styles.sendMessageArea}
            direction={'vertical'}
        >
            <form
                className={styles.form}
                name={'sendMessage form'}
                method={'post'}
                onSubmit={(e) => e.preventDefault()}
            >
                <AttachFile
                    useFiles={[attaches, setAttaches]}
                    maxFilesToAttach={5}
                >
                    <Icon
                        name={'attachIcon'}
                        size={'large'}
                    ></Icon>
                </AttachFile>
                <TextArea
                    name={name}
                    spellcheck={true}
                    textareaText={''}
                    border={'border'}
                    minRows={1}
                    maxRows={5}
                    autoResize
                    onChange={handleMessageChange}
                    onKeydownCallback={sendMessageHandler}
                    textareaRef={textAreaRef}
                    maxLength={1500}
                ></TextArea>

                <Button
                    onClick={handleClick}
                    type={'link'}
                    disabled={isDisabledSend}
                >
                    <Icon
                        name={'chatSend'}
                        classes={styles.sendMessageAreaButton}
                        size={'large'}
                    />
                </Button>
            </form>
            <AttachmentsList
                useFiles={[attaches, setAttaches]}
            ></AttachmentsList>
        </Container>
    );
};

export default SendMessageArea;
