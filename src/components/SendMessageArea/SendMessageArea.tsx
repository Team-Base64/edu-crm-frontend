import Container from '@ui-kit/Container/Container.tsx';
import TextArea from '@ui-kit/TextArea/TextArea.tsx';
import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Button from '@ui-kit/Button/Button.tsx';
import Icon from '@ui-kit/Icon/Icon.tsx';
import styles from './SendMessageArea.module.scss';
import { maxLengthOfMessage } from '../../app/consts.ts';

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

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        if (textAreaRef.current instanceof HTMLTextAreaElement) {
            onMessageSend(textAreaRef.current.value);
            textAreaRef.current.value = '';
            localStorage.setItem(`chatArea/${id}`, '');
        } else {
            console.error('textAreaRef ref/ element not found');
        }
    };
    const handleMessageChange: ChangeEventHandler<HTMLTextAreaElement> = (
        event,
    ) => {
        localStorage.setItem(`chatArea/${id}`, event.target.value);
    };

    useEffect(() => {
        if (textAreaRef.current instanceof HTMLTextAreaElement) {
            textAreaRef.current.value =
                localStorage.getItem(`chatArea/${id}`) ?? '';
        } else {
            console.error('textAreaRef ref/ element not found');
        }
    });

    return (
        <Container classes={styles.sendMessageArea}>
            <form
                className={styles.form}
                name={'sendMessage form'}
                method={'post'}
            >
                <TextArea
                    name={name}
                    spellcheck={true}
                    id={id}
                    textareaText={''}
                    border={'border'}
                    rows={4}
                    onChange={handleMessageChange}
                    textAreaRef={textAreaRef}
                    maxLength={maxLengthOfMessage}
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
