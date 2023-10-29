import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Text from '@ui-kit/Text/Text.tsx';
import Button from '@ui-kit/Button/Button.tsx';
import { dialogSelectType } from '../../app/features/api/chat/dialogSlice.ts';
import styles from './MessageSelectDialogItem.module.scss';
import Avatar from '@ui-kit/Avatar/Avatar.tsx';
import { getDialogDate } from '../../utils/common/dateRepresentation.ts';

interface MessageSelectDialogItemProps extends UiComponentProps {
    data: dialogSelectType;
    selectDialog: () => void;
}

const MessageSelectDialogItem: React.FC<MessageSelectDialogItemProps> = ({
    data,
    selectDialog,
}) => {
    return (
        <Button
            type={'link'}
            onClick={selectDialog}
            size={'l'}
            classes={styles.messageSelectDialogItem}
        >
            <Avatar
                src={data.cover}
                alt={`аватар диалога с ${data.name}`}
            ></Avatar>
            <div className={styles.messageSelectDialogItemText}>
                <Text
                    type={'h'}
                    size={5}
                    classes={styles.messageSelectDialogItemTextTitle}
                >
                    {data.name}
                </Text>
                <Text
                    type={'p'}
                    size={2}
                    classes={styles.messageSelectDialogItemTextMessage}
                >
                    {data.lastmessage.text}
                </Text>
                <Text
                    type={'p'}
                    size={2}
                    classes={styles.messageSelectDialogItemTextDate}
                >
                    {getDialogDate(data.lastmessage.date)}
                </Text>
            </div>
        </Button>
    );
};

export default MessageSelectDialogItem;
