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
import { useValidation } from '@ui-kit/_hooks/useValidation.ts';
import Spinner from '@ui-kit/Spinner/Spinner.tsx';
import ShowQueryState from '@components/ShowQueryState/ShowQueryState.tsx';

interface SendMessageAreaProps extends UiComponentProps {
    id: number;
}

const SendMessageArea: React.FC<SendMessageAreaProps> = ({ id }) => {
    const [sendMessage] = useSendMessageMutation();
    const { data: dialogData, isSuccess, ...status } = useGetDialogsQuery(null);
    const { attaches, setAttaches, attachesSendPromise } =
        useSendAttaches('chat');
    const [message, setMessage] = useState<string>(
        localStorage.getItem(`${localStoragePath.chatArea}/${id}`) || '',
    );

    const formRef = useRef<HTMLFormElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const [disabled, setDisabled] = useState(true);
    const [lock, setLock] = useState(false);
    const [names, handlers, errors, isValid] = useValidation({
        area: {
            max: 4090,
            trim: true,
        },
    });

    useEffect(() => {
        localStorage.setItem(`${localStoragePath.chatArea}/${id}`, message);
    }, [message]);

    const handleMessageChange: ChangeEventHandler<HTMLTextAreaElement> = (
        e,
    ) => {
        handlers.area(e);
        localStorage.setItem(
            `${localStoragePath.chatArea}${id}`,
            e.target.value,
        );
        setMessage(e.target.value);
    };

    useEffect(() => {
        setDisabled(!message.trim().length && !attaches.length);
    }, [message, attaches]);

    const handleMessageSend = async () => {
        if (
            !isValid ||
            disabled ||
            lock ||
            id === unselectedId ||
            !dialogData
        ) {
            return;
        }

        setLock(true);

        try {
            let loaded: string[] = [];

            if (attaches) {
                const resp = await attachesSendPromise();
                loaded = SerializeAttachesFromBackend(resp);
            }

            await sendMessage({
                message: {
                    chatID: id,
                    text: message.trim(),
                    ismine: true,
                    date: new Date().toISOString(),
                    socialType: dialogData.dialogs[id].socialType,
                    attaches: loaded,
                },
            });

            setMessage('');
            setAttaches([]);
        } catch (e) {
            console.log(e);
        } finally {
            setLock(false);
        }
    };

    return (
        <Container
            classes={styles.sendMessageArea}
            direction={'vertical'}
        >
            <ShowQueryState status={status} />
            {isSuccess && (
                <form
                    className={styles.form}
                    onSubmit={(e) => e.preventDefault()}
                    ref={formRef}
                >
                    <AttachFile
                        useFiles={[attaches, setAttaches]}
                        maxFilesToAttach={10}
                    >
                        <Icon
                            name={'attachIcon'}
                            size={'large'}
                        />
                    </AttachFile>
                    <TextArea
                        classes={styles.sendMessageAreaInput}
                        spellcheck={true}
                        minRows={2}
                        focusRows={3}
                        maxRows={5}
                        autoResize
                        onChange={handleMessageChange}
                        onKeydownCallback={handleMessageSend}
                        textareaRef={textAreaRef}
                        name={names.area}
                        textareaText={message}
                        errors={errors.area.msgs}
                    />

                    <Button
                        onClick={handleMessageSend}
                        // type={'link'}
                        disabled={!isValid || disabled || lock}
                    >
                        {lock ? (
                            <Spinner classes={styles.spinner} />
                        ) : (
                            <Icon
                                name={'chatSend'}
                                classes={styles.sendMessageAreaButton}
                                size={'large'}
                            />
                        )}
                    </Button>
                </form>
            )}
            <AttachmentsList useFiles={[attaches, setAttaches]} />
        </Container>
    );
};

export default SendMessageArea;
