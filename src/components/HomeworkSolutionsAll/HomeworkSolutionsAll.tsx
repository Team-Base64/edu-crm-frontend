import { useGetHomeworkSolutionsQuery } from '@app/features/homeworkSolution/homeworkSolutionSlice';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import Spinner from '@ui-kit/Spinner/Spinner';
import Text from '@ui-kit/Text/Text';
import { UiComponentProps } from '@ui-kit/interfaces';
import styles from './HomeworkSolutionsAll.module.scss';
import SolutionsGroup from '@components/SolutionsGroup/SolutionsGroup';
import ShowQueryState from '@components/ShowQueryState/ShowQueryState';

interface HomeworkSolutionsAllProps extends UiComponentProps {
    homeworkID: number;
}

const HomeworkSolutionsAll: React.FC<HomeworkSolutionsAllProps> = ({
    homeworkID,
    classes,
}) => {
    const { data, isSuccess, ...status } =
        useGetHomeworkSolutionsQuery({ homeworkID: homeworkID });
    return (
        <>
            <ShowQueryState status={status}/>
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
