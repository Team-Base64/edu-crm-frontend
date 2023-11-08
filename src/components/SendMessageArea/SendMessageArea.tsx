import Container from '@ui-kit/Container/Container.tsx';
import TextArea from '@ui-kit/TextArea/TextArea.tsx';
import React, {
    ChangeEventHandler,
    KeyboardEventHandler,
    useEffect,
    useRef,
    useState,
} from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Button from '@ui-kit/Button/Button.tsx';
import Icon from '@ui-kit/Icon/Icon.tsx';
import styles from './SendMessageArea.module.scss';
import { AttachFile } from '@ui-kit/AttachFile/AttachFile.tsx';
import { ChatAttachmentsList } from '@components/ChatAttachmentsList/ChatAttachmentsList.tsx';
import {
    useSendChatAttachesMutation,
    useSendMessageMutation,
} from '@app/features/chat/chatSlice';
import { useGetDialogsQuery } from '@app/features/dialog/dialogSlice.ts';

interface SendMessageAreaProps extends UiComponentProps {
    id: string;
    name: string;
    onMessageSend: (text: string) => void;
}

const SendMessageArea: React.FC<SendMessageAreaProps> = ({
    id,
    name,
    onMessageSend,
}) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const [attaches, setAttaches] = useState<File[]>();

    const [isDisabledSend, setIsDisabledSend] = useState(true);

    const [sendAttaches] = useSendChatAttachesMutation();

    const [sendMessage] = useSendMessageMutation();

    const dialogData = useGetDialogsQuery(null);

    const sendMessageHandler = () => {
        if (!textAreaRef.current) {
            return;
        }

        console.log('attaches', attaches?.toString());
        if (attaches?.length) {
            sendAttaches({
                attaches,
                type: 'chat',
            })
                .then((result) => {
                    if ('data' in result && dialogData.data) {
                        sendMessage({
                            message: {
                                text: textAreaRef.current?.value ?? '',
                                chatid: Number(id),
                                ismine: true,
                                date: new Date().toISOString(),
                                attaches: [result.data.file],
                                socialtype:
                                    dialogData.data.dialogs[Number(id)]
                                        .socialtype,
                            },
                        });
                    }
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
            onMessageSend(textAreaRef.current.value);
            textAreaRef.current.value = '';
        }

        localStorage.setItem(`chatArea/${id}`, '');
    };

    useEffect(() => {
        const savedMsg = localStorage.getItem(`chatArea/${id}`) ?? '';
        if (!textAreaRef.current) return;
        textAreaRef.current.value = savedMsg;
        setIsDisabledSend(!textAreaRef.current.value && !attaches);
    }, [id, setIsDisabledSend, attaches]);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        sendMessageHandler();
    };

    const handleMessageChange: ChangeEventHandler<HTMLTextAreaElement> = ({
        target,
    }) => {
        localStorage.setItem(`chatArea/${id}`, target.value);
        setIsDisabledSend(!target.value && !attaches);
    };

    const handleAreaKeydown: KeyboardEventHandler<HTMLTextAreaElement> = (
        event,
    ) => {
        if (event.code === 'Enter' && event.ctrlKey) {
            sendMessageHandler();
        }
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
                    setFilesState={setAttaches}
                    maxFilesToAttach={1}
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
                    onKeydown={handleAreaKeydown}
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
            <ChatAttachmentsList
                useFiles={[attaches, setAttaches]}
            ></ChatAttachmentsList>
        </Container>
    );
};

export default SendMessageArea;
