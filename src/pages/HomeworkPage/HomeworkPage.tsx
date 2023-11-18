import Container from "@ui-kit/Container/Container";
import { Navigate, useParams } from "react-router-dom";
import styles from './HomeworkPage.module.scss';
import Text from "@ui-kit/Text/Text";
import { useGetHomeworkQuery } from "@app/features/homework/homeworkSlice";
import Spinner from "@ui-kit/Spinner/Spinner";

const HomeworkPage: React.FC = () => {
    const params = useParams();
    const id = Number(params.id);


    if (Number.isNaN(id)) {
        return (
            <Navigate
                to="/page404"
                state={{ from: location }}
            />
        );
    }

    const hwData = useGetHomeworkQuery({
        id: id,
    });

hwData.data?.homework;
    const title = (
        <>
            {hwData.isLoading && <Spinner />}
            {hwData.isError && 'Не удалось получить заголовок класса'}
            {hwData.isSuccess && (
                <Text type='h' size={3}>
                    {hwData.data.homework.title}
                </Text>
            )}
        </>
    );


    return (
        <Container direction='vertical' classes={styles.page}>
            <Container classes={styles.header} layout='defaultBase'>
                {title}
            </Container>
        </Container>
    );
}

export default HomeworkPage;