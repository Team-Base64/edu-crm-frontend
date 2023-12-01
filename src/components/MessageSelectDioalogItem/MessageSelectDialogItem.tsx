import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Text from '@ui-kit/Text/Text.tsx';
import Button from '@ui-kit/Button/Button.tsx';
import styles from './MessageSelectDialogItem.module.scss';
import Avatar from '@ui-kit/Avatar/Avatar.tsx';
import { getDialogDate } from '../../utils/common/dateRepresentation.ts';
import { dialogSelectType } from '@app/features/dialog/dialogModel';

interface MessageSelectDialogItemProps extends UiComponentProps {
    data: dialogSelectType;
    selectDialog: () => void;
    isSelected: boolean;
}

const MessageSelectDialogItem: React.FC<MessageSelectDialogItemProps> = ({
    data,
    selectDialog,
    isSelected,
}) => {
    return (
        <Button
            type={'static'}
            onClick={selectDialog}
            size={'l'}
            border={''}
            classes={
                isSelected
                    ? styles.messageSelectDialogItemSelected
                    : styles.messageSelectDialogItem
            }
        >
            <Avatar
                src={data.cover}
                alt={`аватар диалога с ${data.studentName}`}
            ></Avatar>
            <div className={styles.messageSelectDialogItemText}>
                <Text
                    type={'h'}
                    size={5}
                    classes={styles.messageSelectDialogItemTextTitle}
                >
                    {data.studentName}
                </Text>
                <Text
                    type={'p'}
                    size={2}
                    color={'light'}
                    classes={styles.messageSelectDialogItemTextMessage}
                >
                    {data.text ? data.text : 'Вложения'}
                </Text>
                <Text
                    type={'p'}
                    size={2}
                    color={'light'}
                    classes={styles.messageSelectDialogItemTextDate}
                >
                    {getDialogDate(data.date)}
                </Text>
            </div>
        </Button>
    );
};

export default MessageSelectDialogItem;
