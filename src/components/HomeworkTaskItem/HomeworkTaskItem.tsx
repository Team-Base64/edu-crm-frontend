import Button from "@ui-kit/Button/Button";
import Container from "@ui-kit/Container/Container";
import Icon from "@ui-kit/Icon/Icon";
import Text from "@ui-kit/Text/Text";
import { UiComponentProps } from "@ui-kit/interfaces";
import styles from './HomeworkTaskItem.module.scss';
import { HomeworkTask } from "@app/features/homeworkTask/homeworkTaskModel";

interface HomeworkTaskItemProps extends UiComponentProps {
    title?: string;
    task: HomeworkTask;
    onDelete?: (id : number) => void;
}


const HomeworkTaskItem: React.FC<HomeworkTaskItemProps> = ({ task, title, onDelete }) => {
    const { id, description } = task;
    return (
        <Container direction='vertical' layout='defaultBase' classes={styles.task}>
            {title && (
                <Text type='h' size={5}>
                    {title}
                </Text>
            )}
            <Text type='p' size={1}>
                {description}
            </Text>
            {onDelete && (
                <Button onClick={() => onDelete(id)} type='link' classes={styles.btnRemove}>
                    <Icon name='close' classes={styles.btnRemoveIcon} />
                </Button>
            )}
        </Container>
    );
};

export default HomeworkTaskItem;
