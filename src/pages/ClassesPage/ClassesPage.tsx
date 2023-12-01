import React, { useEffect, useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import Container from '@ui-kit/Container/Container';
import styles from './ClassesPage.module.scss';
import Text from '@ui-kit/Text/Text';
import Button from '@ui-kit/Button/Button';
import Icon from '@ui-kit/Icon/Icon';
import Overlay from '@ui-kit/Overlay/Overlay';
import ClassCreateForm from '@components/CreateClassForm/ClassCreateForm';
import { useNavigate } from 'react-router-dom';
import ListFC from '@ui-kit/List/List';
import EmptyItem from '@components/EmptyItem/EmptyItem';
import { useGetClassesQuery } from '@app/features/class/classSlice';
import { useListItems } from '@ui-kit/List/hooks';
import { ClassData } from '@app/features/class/classModel';
import { arrayToItem } from '@ui-kit/List/helpers';
import { ClassListItem } from '@components/ClassItem/ClassItem';
import ShowQueryState from '@components/ShowQueryState/ShowQueryState';

interface ClassesPageProps extends UiComponentProps {}

const ClassesPage: React.FC<ClassesPageProps> = () => {
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
    const navigate = useNavigate();
    const { data, isSuccess, ...status } = useGetClassesQuery(null);
    const [items, setItems] = useListItems([] as ClassData[]);

    useEffect(() => {
        if (!data) return;
        setItems(arrayToItem(data.classes));
    }, [setItems, data]);

    const handleSuccessCreate = (id: string | number) => {
        setShowCreateForm(false);
        return navigate(id.toString());
    };

    return (
        <>
            <Container
                direction={'vertical'}
                classes={styles.page}
                layout={'defaultBase'}
                gap={'l'}
            >
                <Container
                    direction="horizontal"
                    classes={styles.header}
                >
                    <Text
                        type={'h'}
                        size={3}
                        weight={'bold'}
                    >
                        Ваши классы:
                    </Text>
                    <Button onClick={() => setShowCreateForm(true)}>
                        <Icon
                            name="addLine"
                            classes={styles.btnIcon}
                        />
                        <Text
                            type="p"
                            size={1}
                            weight="bold"
                            classes={styles.btnText}
                        >
                            Создать класс
                        </Text>
                    </Button>
                </Container>

                <ShowQueryState status={status} />
                {isSuccess && (
                    <ListFC
                        itemsState={[items, setItems]}
                        renderItem={ClassListItem}
                        renderItemProps={{}}
                        containerProps={{
                            direction: 'grid',
                            classes: styles.listContainer,
                        }}
                    >
                        <EmptyItem text="У вас пока нет классов" />
                    </ListFC>
                )}
            </Container>
            <Overlay
                isShowing={showCreateForm}
                closeOverlay={() => setShowCreateForm(false)}
            >
                <ClassCreateForm
                    classes={styles.createForm}
                    onSuccess={handleSuccessCreate}
                />
            </Overlay>
        </>
    );
};

export default ClassesPage;
