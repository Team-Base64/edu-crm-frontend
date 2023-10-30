import Avatar from "@ui-kit/Avatar/Avatar";
import Container from "@ui-kit/Container/Container";
import Icon from "@ui-kit/Icon/Icon";
import Text from "@ui-kit/Text/Text";
import { UiComponentProps } from "@ui-kit/interfaces";
import React, { useCallback } from "react";

import styles from './AnnounceCard.module.scss';


interface AnnounceCardProps extends UiComponentProps {
    firstName: string;
    lastName?: string;
    avatarSrc: string;
    time: number;
    onEdit?: () => void;
    onDelete?: () => void;
    text: string;

}

const AnnounceCard: React.FC<AnnounceCardProps> = ({
    classes,
    onClick,
    onDelete,
    onEdit,
    firstName,
    lastName,
    avatarSrc,
    time,
    text,
}) => {

    const handleEdit = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit?.();
    }, [onEdit])


    const handleDelete = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete?.();
    }, [onDelete])

    return (
        <Container classes={[styles.card].join(' ')} direction="vertical">
            <Container classes={[styles.header].join(' ')} direction="horizontal">
                <Container classes={[styles.info].join(' ')} direction="horizontal">
                    <Avatar classes={[styles.avatar].join(' ')} src={avatarSrc} alt={firstName + ' avatar'} />
                    <Text classes={[styles.name].join(' ')} type="h5" weight="bold">{firstName + (lastName ? ' ' + lastName : '')}</Text>
                    <Text classes={[styles.date].join(' ')} type="p2" weight="regular">{new Date(time).toLocaleString('ru-RU')}</Text>
                </Container>
                <Container classes={[styles.toolbar].join(' ')} direction="horizontal">
                    {onEdit && <Icon classes={[styles.tool].join(' ')} name="pencilLine" onClick={handleEdit} />}
                    {onEdit && <Icon classes={[styles.tool].join(' ')} name="deleteBinLine" onClick={handleDelete} />}
                </Container>
            </Container>
            <Container classes={[styles.content].join(' ')} direction="vertical">
                <Text classes={[styles.text].join(' ')} type="p" weight="regular">{text}</Text>
            </Container>
        </Container>
    );
}

export default AnnounceCard;