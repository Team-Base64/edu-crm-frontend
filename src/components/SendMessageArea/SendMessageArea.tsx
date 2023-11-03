import Container from '@ui-kit/Container/Container.tsx';
import TextArea from '@ui-kit/TextArea/TextArea.tsx';
import React, {
    ChangeEventHandler,
    KeyboardEventHandler,
    useEffect,
    useRef,
} from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Button from '@ui-kit/Button/Button.tsx';
import Icon from '@ui-kit/Icon/Icon.tsx';
import styles from './SendMessageArea.module.scss';

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

    const sendMessage = () => {
        if (!textAreaRef.current) {
            return;
        }

        onMessageSend(textAreaRef.current.value);

        textAreaRef.current.value = '';
        localStorage.setItem(`chatArea/${id}`, '');
    };

    useEffect(() => {
        const savedMsg = localStorage.getItem(`chatArea/${id}`) ?? '';
        if (!textAreaRef.current) return;
        textAreaRef.current.value = savedMsg;
    });

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        sendMessage();
    };

    const handleMessageChange: ChangeEventHandler<HTMLTextAreaElement> = (
        event,
    ) => {
        const val = event.target.value;
        localStorage.setItem(`chatArea/${id}`, val);
    };

    const handleAreaKeydown: KeyboardEventHandler<HTMLTextAreaElement> = (
        e,
    ) => {
        if (e.code === 'Enter' && e.ctrlKey) {
            sendMessage();
        }
    };

    return (
        <Container classes={styles.sendMessageArea}>
            <form
                className={styles.form}
                name={'sendMessage form'}
                method={'post'}
                onSubmit={(e) => e.preventDefault()}
            >
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
                ></TextArea>

                <Button
                    onClick={handleClick}
                    type={'link'}
                    // disabled={!textAreaValue}
                >
                    <Icon
                        name={'chatSend'}
                        classes={styles.sendMessageArea__button}
                    />
                </Button>
            </form>
        </Container>
    );
};

export default SendMessageArea;
