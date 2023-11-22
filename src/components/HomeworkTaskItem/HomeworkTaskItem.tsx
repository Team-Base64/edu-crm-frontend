import Button from '@ui-kit/Button/Button';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import Text from '@ui-kit/Text/Text';
import { UiComponentProps } from '@ui-kit/interfaces';
import styles from './HomeworkTaskItem.module.scss';
import { HomeworkTask } from '@app/features/homeworkTask/homeworkTaskModel';
import CheckBox from '@ui-kit/CheckBox/CheckBox';
import { useEffect, useState } from 'react';
import { Attachment } from '@ui-kit/Attachment/Attachment';
import { noop } from '@app/const/consts';

interface HomeworkTaskItemProps extends UiComponentProps {
    title?: string;
    task: HomeworkTask;
    onDelete?: (id: number) => void;
    onSelect?: (task: HomeworkTask) => void;
    onDeselect?: (task: HomeworkTask) => void;
}

const HomeworkTaskItem: React.FC<HomeworkTaskItemProps> = ({
    task,
    title,
    onDeselect,
    onDelete,
    onSelect,
}) => {
    const { id, description, attach } = task;
    const [state, setState] = useState<boolean>(false);
    useEffect(() => {
        if (state) {
            onSelect?.(task);
        } else {
            onDeselect?.(task);
        }
    }, [onDeselect, onSelect, state, task]);
    return (
        <Container
            direction="horizontal"
            layout="defaultBase"
            classes={styles.item}
            gap="l"
        >
            {onSelect && <CheckBox state={[state, setState]} />}
            <Container direction="vertical">
                {title && (
                    <Text
                        type="h"
                        size={4}
                        weight="bold"
                    >
                        {title}
                    </Text>
                )}
                <Text
                    type="p"
                    size={1}
                >
                    {description}
                </Text>
                {attach && attach.length && (
                    <Attachment
                        file={attach}
                        onRemoveClick={noop}
                        isStatic={true}
                    />
                )}
                {onDelete && (
                    <Button
                        onClick={() => onDelete(id)}
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
    );
};

export default HomeworkTaskItem;
