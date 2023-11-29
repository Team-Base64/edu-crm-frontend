import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import TextArea from '@ui-kit/TextArea/TextArea';
import React, { ChangeEvent, useRef, useState } from 'react';

import styles from './ClassAnnounceCreateField.module.scss';
import { useCreateAnnouncementMutation } from '@app/features/announcement/announcementSlice';
import Button from '@ui-kit/Button/Button';
import Spinner from '@ui-kit/Spinner/Spinner';
import Hint from '@ui-kit/Hint/Hint';
import { AttachFile } from '@ui-kit/AttachFile/AttachFile';
import { AttachmentsList } from '@ui-kit/AttachmentsList/AttachmentsList';
import useSendAttaches from 'hooks/useSendAttaches';
import { SerializeAttachesFromBackend } from 'utils/attaches/attachesSerializers';

interface ClassAnnounceCreateFieldProps {
    classID: number | string;
    disabled: boolean;
}

const ClassAnnounceCreateField: React.FC<ClassAnnounceCreateFieldProps> = ({
    classID,
    disabled,
}) => {
    const [lock, setLock] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [submit, _] = useCreateAnnouncementMutation();
    const [hint, toggleHint] = useState<boolean>(disabled);
    const { attaches, setAttaches, attachesSendPromise } = useSendAttaches('chat');

    const handleSubmit = async () => {
        const form = formRef.current;
        if (!form) return;

        const text: string = form.announce.value;

        if (!text.length) return;

        setLock(true);


        try {
            let loaded: string[] = [];

            if (attaches) {
                const result = await attachesSendPromise();
                loaded = SerializeAttachesFromBackend(result);
            }

            setAttaches([]);

            const resp = await submit({
                class_id: classID,
                payload: {
                    text: text,
                    attaches: loaded,
                },
            });

            if (!('data' in resp)) {
                throw new Error(JSON.stringify(resp.error));
            }

            form.announce.value = '';
            localStorage.setItem(`${classID}/announce`, '');
        } catch (e) {
            console.log(e);
        } finally {
            setLock(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        localStorage.setItem(`${classID}/announce`, e.target.value);
    };
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    return (
        <Container
            classes={styles.card}
            direction='vertical'
            layout="defaultBase"
        >
            <form
                onSubmit={(e) => e.preventDefault()}
                ref={formRef}
                className={styles.form}
            >
                <TextArea
                    classes={styles.area}
                    textareaRef={textareaRef}
                    name="announce"
                    spellcheck={true}
                    placeholder={'Напишите что-нибудь всему классу...'}
                    textareaText={
                        localStorage.getItem(`${classID}/announce`) || undefined
                    }
                    border={'noBorder'}
                    autoResize={true}
                    onChange={handleChange}
                    onKeydownCallback={handleSubmit}
                    minRows={1}
                    focusRows={3}
                    maxRows={5}
                />
                <Hint
                    text="Сообщения доступны, если в классе есть ученики"
                    state={[hint, toggleHint]}
                />
                <Container
                    direction='vertical'
                    classes={styles.nav}
                >
                    <AttachFile
                        maxFilesToAttach={10}
                        useFiles={[attaches, setAttaches]}
                        disabled={lock || disabled}
                    >
                        <Icon
                            name='attachIcon'
                            classes={[
                                styles.btnIcon,
                                disabled ? styles.btnIconDisabled : '',
                            ].join(' ')} />
                    </AttachFile>
                    <Button
                        disabled={lock || disabled}
                        type="link"
                        onClick={handleSubmit}
                        classes={styles.btn}
                    >
                        {lock ? (
                            <Spinner classes={styles.spinner} />
                        ) : (
                            <Icon
                                classes={[
                                    styles.btnIcon,
                                    disabled ? styles.btnIconDisabled : '',
                                ].join(' ')}
                                name="chatSend"
                            />
                        )}
                    </Button>
                </Container>
            </form>
            <AttachmentsList
                useFiles={[attaches, setAttaches]}
                classes={styles.attaches}
            />
        </Container>
    );
};

export default ClassAnnounceCreateField;
