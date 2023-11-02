import Container from '@ui-kit/Container/Container.tsx';
import TextArea from '@ui-kit/TextArea/TextArea.tsx';
import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
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

    useEffect(() => {
        const savedMsg = localStorage.getItem(`chatArea/${id}`) ?? '';
        if(!textAreaRef.current) return;
        textAreaRef.current.value = savedMsg;
    });

    const handleClick = () => {
            if(!textAreaRef.current){
                return;
            }
            onMessageSend( textAreaRef.current.value);

            textAreaRef.current.value = '';
            localStorage.setItem(`chatArea/${id}`, '');
    };
    const handleMessageChange: ChangeEventHandler<HTMLTextAreaElement> = (
        event,
    ) => {
        const val = event.target.value;
        localStorage.setItem(`chatArea/${id}`, val);
    };

  

    return (
        <Container>
            <TextArea
                name={name}
                spellcheck={true}
                textareaText={''}
                border={'border'}
                minRows={4}
                autoResize={false}
                onChange={handleMessageChange}
                textareaRef={textAreaRef}
            ></TextArea>
            <Button
                onClick={handleClick}
                type={'link'}
            >
                <Icon
                    name={'chatSend'}
                    classes={styles.sendMessageArea__button}
                />
            </Button>
        </Container>
    );
};

export default SendMessageArea;
