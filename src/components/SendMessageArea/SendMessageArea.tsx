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
import { useSendChatAttachesMutation } from '../../app/features/api/chat/messageSlice.ts';

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

    const [sendAttaches, { isSuccess, error }] = useSendChatAttachesMutation();

    const sendMessage = () => {
        if (!textAreaRef.current) {
            return;
        }

        if (attaches) {
            sendAttaches({
                attaches,
                message: {
                    text: textAreaRef.current.value,
                    chatid: Number(id),
                    ismine: true,
                    date: new Date().toISOString(),
                },
            });

            if (isSuccess) {
                setAttaches([]);
                textAreaRef.current.value = '';
            } else {
                console.error('error: ', error);
            }
        } else {
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
        sendMessage();
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
            sendMessage();
        }
    };

    return (
        <Container
            classes={styles.sendMessageArea}
            direction={'vertical'}
        >
            <ChatAttachmentsList
                useFiles={[attaches, setAttaches]}
            ></ChatAttachmentsList>
            <form
                className={styles.form}
                name={'sendMessage form'}
                method={'post'}
                onSubmit={(e) => e.preventDefault()}
            >
                <AttachFile
                    setFilesState={setAttaches}
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
        </Container>
    );
};

export default SendMessageArea;
