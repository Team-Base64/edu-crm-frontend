import Avatar from "@ui-kit/Avatar/Avatar";
import Button from "@ui-kit/Button/Button";
import Container from "@ui-kit/Container/Container";
import Icon from "@ui-kit/Icon/Icon";
import { UiComponentProps } from "@ui-kit/interfaces";
import React from "react";
import Text from "@ui-kit/Text/Text";

import styles from './ClassMemberItem.module.scss';


interface ClassMemberItemProps extends UiComponentProps {
    firstName: string;
    lastName: string;
    avatarSrc: string;
    role: string;
    onMessageClick?: () => void;
}

const ClassMemberItem: React.FC<ClassMemberItemProps> = ({ firstName, lastName, avatarSrc, role, onMessageClick, onClick, classes }) => {

    return (
        <Container classes={[styles.card, classes].join(' ')} direction="horizontal" onClick={onClick}>
            <Container classes={styles.profile} direction="horizontal">
            <Avatar classes={styles.avatar} src={avatarSrc} alt={firstName + 'avatar'} />
                <Container direction="vertical">
                    <Text classes={styles.name} type="h6" weight="bold">{firstName} {lastName}</Text>
                    <Text classes={styles.role} type="p2" weight="regular">{role}</Text>
                </Container>
            </Container>
            <Button classes={styles.btn} onClick={onMessageClick}
                type="link">
                <Icon classes={styles.icon} name="chatRightFill" />
            </Button>
        </Container>

    );
}

export default ClassMemberItem;