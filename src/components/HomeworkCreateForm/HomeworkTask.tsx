import { HomeworkTask } from "@app/features/homework/homeworkModel";
import Button from "@ui-kit/Button/Button";
import Container from "@ui-kit/Container/Container";
import Icon from "@ui-kit/Icon/Icon";
import Text from "@ui-kit/Text/Text";
import { UiComponentProps } from "@ui-kit/interfaces";
import styles from './HomeworkTask.module.scss';

interface TaskItemProps extends UiComponentProps {
    index: number
    task: HomeworkTask;
    onDelete?: () => void;
}


const TaskItem: React.FC<TaskItemProps> = ({ task, index, onDelete }) => {
    return (
        <Container direction='vertical' layout='defaultBase' classes={styles.task}>
            <Text type='h' size={5}>
                {`Задание №${index + 1}`}
            </Text>
            <Text type='p' size={1}>
                {task.description}
            </Text>
            {onDelete && (
                <Button onClick={onDelete} type='link' classes={styles.btnRemove}>
                    <Icon name='close' classes={styles.btnRemoveIcon} />
                </Button>
            )}
        </Container>
    );
}

export default TaskItem