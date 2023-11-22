import { useGetHomeworkSolutionsQuery } from '@app/features/homeworkSolution/homeworkSolutionSlice';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import Spinner from '@ui-kit/Spinner/Spinner';
import Text from '@ui-kit/Text/Text';
import { UiComponentProps } from '@ui-kit/interfaces';
import styles from './HomeworkSolutionsAll.module.scss';
import SolutionsGroup from '@components/SolutionsGroup/SolutionsGroup';

interface HomeworkSolutionsAllProps extends UiComponentProps {
    homeworkID: number;
}

const HomeworkSolutionsAll: React.FC<HomeworkSolutionsAllProps> = ({
    homeworkID,
    classes,
}) => {
    const { data, isLoading, isError, isSuccess } =
        useGetHomeworkSolutionsQuery({ homeworkID: homeworkID });
    return (
        <>
            {isLoading && (
                <Container classes={styles.status}>
                    <Spinner classes={styles.statusSpinner} />
                    <Text
                        type="p"
                        size={1}
                        classes={styles.statusText}
                    >
                        Загрузка...
                    </Text>
                </Container>
            )}
            {isError && (
                <Container classes={styles.status}>
                    <Icon
                        name="alert"
                        classes={styles.statusIcon}
                    />
                    <Text
                        type="p"
                        size={1}
                        classes={styles.statusText}
                    >
                        Произошла ошибка...
                    </Text>
                </Container>
            )}
            {isSuccess && (
                <SolutionsGroup
                    solutions={data.solutions}
                    keys={['status', 'studentID']}
                    classes={classes}
                />
            )}
        </>
    );
};

export default HomeworkSolutionsAll;
