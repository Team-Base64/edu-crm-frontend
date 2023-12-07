import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import Text, { TextProps } from '@ui-kit/Text/Text';
import { UiComponentProps } from '@ui-kit/interfaces';
import React from 'react';

import styles from './ClassAnnounceCard.module.scss';
import prettyDate from 'utils/common/PrettyDate/datePrettify';
import { Announcement } from '@app/features/announcement/announcementModel';
import Updatable from '@ui-kit/Updatable/Updatable';
import { AttachmentsList } from '@ui-kit/AttachmentsList/AttachmentsList';

interface ClassAnnounceCardProps extends UiComponentProps {
    data: Announcement;
    onEdit?: () => void;
    onDelete?: () => void;
}

const ClassAnnounceCard: React.FC<ClassAnnounceCardProps> = ({
    classes,
    onClick,
    onDelete,
    onEdit,
    data,
}) => {
    const { text, createTime, attaches } = data;
    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit?.();
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete?.();
    };

    return (
        <Container
            classes={[styles.card, classes].join(' ')}
            direction="vertical"
            layout="defaultBase"
            onClick={onClick}
        >
            <Container
                classes={[styles.header].join(' ')}
                direction="horizontal"
            >
                <Container
                    classes={[styles.info].join(' ')}
                    direction="horizontal"
                >
                    <Updatable
                        element={Text}
                        updateProps={(): TextProps => ({
                            classes: [styles.date].join(' '),
                            type: 'p',
                            size: 1,
                            weight: 'regular',
                            children: prettyDate(createTime),
                        })}
                        interval={1}
                    />
                </Container>
                <Container
                    classes={[styles.toolbar].join(' ')}
                    direction="horizontal"
                >
                    {onEdit && (
                        <Icon
                            classes={[styles.tool].join(' ')}
                            name="pencilLine"
                            onClick={handleEdit}
                        />
                    )}
                    {onEdit && (
                        <Icon
                            classes={[styles.tool].join(' ')}
                            name="deleteBinLine"
                            onClick={handleDelete}
                        />
                    )}
                </Container>
            </Container>
            <Container
                classes={[styles.content].join(' ')}
                direction="vertical"
            >
                <Text
                    classes={[styles.text].join(' ')}
                    type="p"
                    size={1}
                    weight="regular"
                >
                    {text}
                </Text>
                <AttachmentsList
                    staticAttachments={attaches}
                    classes={styles.attaches}
                />
            </Container>
        </Container>
    );
};

export default ClassAnnounceCard;
