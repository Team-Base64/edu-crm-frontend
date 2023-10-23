import Container from '@ui-kit/Container/Container.tsx';
import TextArea from '@ui-kit/TextArea/TextArea.tsx';
import React, { ChangeEventHandler, useRef, useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Button from '@ui-kit/Button/Button.tsx';
import Icon from '@ui-kit/Icon/Icon.tsx';
import styles from './SendMessageArea.module.scss';

interface SendMessageArea extends UiComponentProps {
    id: string;
    name: string;
}

const SendMessageArea: React.FC<SendMessageArea> = ({ id, name }) => {
    const [message, setMessage] = useState('');

    const handleClick = () => {
        console.log(message);
    };
    const handleMessageChange: ChangeEventHandler<HTMLTextAreaElement> = (
        event,
    ) => {
        setMessage(event.target.value);
    };

    return (
        <Container>
            <TextArea
                name={name}
                spellcheck={true}
                id={id}
                textareaText={''}
                border={'border'}
                rows={4}
                onChange={handleMessageChange}
            ></TextArea>
            <Button onClick={handleClick}>
                <Icon
                    name={'chatSend'}
                    classes={styles.sendMessageArea__button}
                />
            </Button>
        </Container>
    );
};

export default SendMessageArea;
