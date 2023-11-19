import React, { useRef, useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import Input from '@ui-kit/Input/Input';
import Button from '@ui-kit/Button/Button';
import Spinner from '@ui-kit/Spinner/Spinner';
import Icon from '@ui-kit/Icon/Icon';
import Container from '@ui-kit/Container/Container';
import Text from '@ui-kit/Text/Text';
import TextArea from '@ui-kit/TextArea/TextArea';
import { useCreateClassMutation } from '@app/features/class/classSlice';
import styles from './ClassCreateForm.module.scss';

interface ClassCreateFormProps extends UiComponentProps {
    onSuccess?: (id: string | number) => void;
}

const ClassCreateForm: React.FC<ClassCreateFormProps> = ({ classes, onSuccess }) => {
    const [createClass] = useCreateClassMutation();
    const formRef = useRef<HTMLFormElement>(null);
    const [lock, setLock] = useState<boolean>(false);

    const handleSubmit = () => {
        const form = formRef.current;
        if (!form) {
            return;
        }

        const title = form.classTitle.value as string;
        const descr = form.classDescription.value as string;
        if (!title.length) {
            return;
        }
        setLock(true);

        createClass({
            payload: {
                title: title,
                description: descr,
            }
        })
            .then(resp => {
                if ('data' in resp) {
                    onSuccess?.(resp.data.class.id);
                }
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                setLock(false);
            });
    }

    return (
        <form
            ref={formRef}
            onSubmit={e => e.preventDefault()}
        >
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
                <Container direction={'vertical'} gap='l'>
                    <Input
                        disabled={lock}
                        label={{
                            text: 'Название',
                            type: 'h',
                            size: 4,
                        }}
                        placeholder={'Например: Даша Математика'}
                        type={'text'}
                        name='classTitle'
                    />
                    <TextArea
                        // TODO disabled={lock}
                        minRows={2}
                        maxRows={6}
                        border='border'
                        name='classDescription'
                        label={{
                            text: 'Описание',
                            type: 'h',
                            size: 4,
                        }}
                    />
                </Container>
                <Button
                    onClick={handleSubmit}
                    disabled={lock}
                >
                    {lock && <Spinner classes={styles.btnSpinner}/>}
                    {!lock && (
                        <>
                            <Icon name='addLine' classes={styles.btnIcon} />
                            <Text type='p' size={1} weight='bold' classes={styles.btnText}>
                                Создать
                            </Text>
                        </>
                    )}
                </Button>
            </Container>
        </form>
    );
};

export default ClassCreateForm;
