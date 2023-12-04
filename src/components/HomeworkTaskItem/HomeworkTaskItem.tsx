import Button from '@ui-kit/Button/Button';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import Text from '@ui-kit/Text/Text';
import { UiComponentProps } from '@ui-kit/interfaces';
import styles from './HomeworkTaskItem.module.scss';
import { HomeworkTask } from '@app/features/homeworkTask/homeworkTaskModel';
import CheckBox from '@ui-kit/Checkbox/Checkbox';
import { Attachment } from '@ui-kit/Attachment/Attachment';
import { noop } from '@app/const/consts';
import { ListItemFC } from '@ui-kit/List/types';
import { AttachmentsList } from '@ui-kit/AttachmentsList/AttachmentsList';
import EmptyItem from '@components/EmptyItem/EmptyItem';

interface HomeworkTaskItemProps extends UiComponentProps {
    title?: string;
    allowSelect?: boolean;
    allowDelete?: boolean;
}

const HomeworkTaskItem: ListItemFC<HomeworkTask, HomeworkTaskItemProps> = ({
    classes,
    item,
    title,
    onDelete,
    onSelect,
    allowDelete = false,
    allowSelect = false,
}) => {
    const { description, attaches, selected, uuid, id } = item;
    return (
        <li className={[styles.li, classes].join(' ')}>
            <Container
                direction="horizontal"
                layout="defaultBase"
                classes={styles.item}
                gap="l"
            >
                {allowSelect && (
                    <CheckBox
                        checked={selected}
                        onChange={() => onSelect(uuid, !selected)}
                    />
                )}
                <Container direction="vertical">
                    <Text
                        type="h"
                        size={4}
                        weight="bold"
                    >
                        {title ? title : `Задача #${id}`}
                    </Text>
                    {description.length > 0 && (
                        <Text
                            type="p"
                            size={1}
                        >
                            {description}
                        </Text>
                    )}
                    {attaches.length > 0 &&  (
                        <AttachmentsList
                            staticAttachments={attaches}
                        />
                    )}
                    {allowDelete && (
                        <Button
                            onClick={() => onDelete(uuid)}
                            type="link"
                            classes={styles.btnRemove}
                        >
                            <Icon
                                name="close"
                                classes={styles.btnRemoveIcon}
                            />
                        </Button>
                    )}
                </Container>
            </Container>
        </li>
    );
};

export default HomeworkTaskItem;
