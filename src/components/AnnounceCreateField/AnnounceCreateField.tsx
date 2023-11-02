import Avatar from '@ui-kit/Avatar/Avatar';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import TextArea from '@ui-kit/TextArea/TextArea';
import React from 'react';
import styles from './AnnounceCreateField.module.scss';
import { Form } from 'react-router-dom';

interface AnnounceCreateFieldProps {
    avatarSrc: string;
    submit?: (text: string) => void;
}

const AnnounceCreateField: React.FC<AnnounceCreateFieldProps> = ({
    submit,
    avatarSrc,
}) => {
    return (
        <Container
            classes={styles.card}
            direction="horizontal"
        >
            <Avatar
                classes={styles.avatar}
                src={avatarSrc}
            />
            <TextArea
                classes={styles.area}
                name="announce"
                spellcheck={true}
                placeholder={'Напишите что-нибудь всему классу...'}
                textareaText={'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio corporis fugit vel ipsum ullam dolorem perspiciatis, explicabo sed eius consectetur quia non? Quisquam distinctio animi doloribus, fuga quis laudantium. Eligendi!            '
                }
                border={'noBroder'}
                autoResize={true}
            />
            <Icon
                classes={styles.btn}
                name="chatSend"
            />
        </Container>
    );
};

export default AnnounceCreateField;
