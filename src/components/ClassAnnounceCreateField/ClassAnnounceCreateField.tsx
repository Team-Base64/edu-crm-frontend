// import Avatar from '@ui-kit/Avatar/Avatar';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import TextArea from '@ui-kit/TextArea/TextArea';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import styles from './ClassAnnounceCreateField.module.scss';
import { useCreateAnnouncementMutation } from '@app/features/announcement/announcementSlice';
import Button from '@ui-kit/Button/Button';
import Spinner from '@ui-kit/Spinner/Spinner';
import Hint from '@ui-kit/Hint/Hint';

interface ClassAnnounceCreateFieldProps {
    // avatarSrc: string;
    classID: number | string;
    disabled: boolean;
}

const ClassAnnounceCreateField: React.FC<ClassAnnounceCreateFieldProps> = ({
    // avatarSrc,
    classID,
    disabled,
}) => {
    const [lock, setLock] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [submit, submitStatus] = useCreateAnnouncementMutation();
    const [hint, toggleHint] = useState<boolean>(disabled);

    useEffect(() => {
        if (submitStatus.isLoading) {
            setLock(true);
        } else {
            setLock(false);
        }
    }, [submitStatus.isLoading]);

    const handleSubmit = () => {
        const form = formRef.current;
        if (!form) return;

        const text: string = form.announce.value;

        if (!text.length) return;

        submit({
            class_id: classID,
            payload: {
                text: text,
                attaches: [],
            },
        })
            .then(() => {
                form.announce.value = '';
                localStorage.setItem(`${classID}/announce`, '');
            })
            .catch((e) => {
                console.log('Create feed err ', e);
            });
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        localStorage.setItem(`${classID}/announce`, e.target.value);
    };
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    return (
        <Container
            classes={styles.card}
            direction="horizontal"
            layout="defaultBase"
        >
            {/*
            <Avatar
                classes={styles.avatar}
                src={avatarSrc}
                alt="Your avatar"
            />
            */}
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
                />
                <Hint text='Сообщения доступны, если в классе есть ученики' state={[hint, toggleHint]} />

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
                            classes={[styles.btnIcon, disabled ? styles.btnIconDisabled : ''].join(' ')}
                            name="chatSend"
                        />
                    )}
                </Button>
            </form>
        </Container>
    );
};

export default ClassAnnounceCreateField;
