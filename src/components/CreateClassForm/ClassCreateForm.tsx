import React, { useEffect, useRef } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import Input from '@ui-kit/Input/Input';
import Button from '@ui-kit/Button/Button';
import Spinner from '@ui-kit/Spinner/Spinner';
import Icon from '@ui-kit/Icon/Icon';
import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import TextArea from '@ui-kit/TextArea/TextArea';
import { useCreateClassMutation } from '@app/features/class/classSlice';
import { useNavigate } from 'react-router-dom';
import styles from './ClassCreateForm.module.scss';

interface ClassCreateFormProps extends UiComponentProps {
    onSuccess?: () => void;
}

const ClassCreateForm: React.FC<ClassCreateFormProps> = ({ classes }) => {
    const [createClass, { data, isLoading, isSuccess }] = useCreateClassMutation();

    const navigate = useNavigate();

    const titleRef = useRef<HTMLInputElement>(null);
    const descrRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isSuccess && data) {
            return navigate(data.class.id.toString());
        }
    }, [isLoading])

    const handleSubmit = () => {
        if (!titleRef.current || !descrRef.current) {
            return;
        }

        const title = titleRef.current.value;
        const descr = descrRef.current.value;
        if (!title) {
            return;
        }


        createClass({
            payload: {
                title: title,
                description: descr,
            }
        });
    }

    return (
        <>
            <Container
                direction={'vertical'}
                layout={'defaultBase'}
                gap={'l'}
                classes={classes}
            >
                <Text
                    type={'h'}
                    size={3}
                    weight={'bold'}
                >
                    Создание класса
                </Text>
                <form>
                    <Container direction={'vertical'}>
                        <Input
                            inputRef={titleRef}
                            label={'Название'}
                            placeholder={'Например: Даша Математика'}
                            type={'text'}
                        />
                        <TextArea
                            textareaRef={descrRef}
                            minRows={2}
                            maxRows={6}
                            border='border'
                            labelText='Описание'
                        />
                    </Container>
                </form>
                <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading && <Spinner />}
                    <Icon name='addLine' classes={styles.btnIcon} />
                    Создать
                </Button>
            </Container>
        </>
    );
};

export default ClassCreateForm;
