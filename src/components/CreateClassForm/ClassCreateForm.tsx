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
import useForm from '@ui-kit/_hooks/useForm';

interface ClassCreateFormProps extends UiComponentProps {
    onSuccess?: (id: string | number) => void;
}

const ClassCreateForm: React.FC<ClassCreateFormProps> = ({
    classes,
    onSuccess,
}) => {
    const [createClass] = useCreateClassMutation();
    const [lock, setLock] = useState<boolean>(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [form, isValid, clear] = useForm({
        title: {
            rules: {
                min: 5,
                max: 100,
                trim: true,
            },
            initial: '',
        },
        description: {
            rules: {
                trim: true,
            },
            initial: '',
        },
    });

    const handleSubmit = () => {
        if (!isValid) return;

        setLock(true);

        createClass({
            payload: {
                title: form.title.value,
                description: form.description.value,
            },
        })
            .then((resp) => {
                if ('error' in resp)
                    throw new Error(JSON.stringify(resp.error));

                clear();

                onSuccess?.(resp.data.class.id);
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setLock(false);
            });
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
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
                <Container
                    direction={'vertical'}
                    gap="l"
                >
                    <Input
                        disabled={lock}
                        label={{
                            text: 'Название',
                            type: 'h',
                            size: 4,
                        }}
                        placeholder={'Например: ЕГЭ математика'}
                        errors={form.title.errors}
                        onChange={form.title.changeMiddleware()}
                    />
                    <TextArea
                        disabled={lock}
                        textareaRef={textareaRef}
                        minRows={2}
                        focusRows={5}
                        maxRows={6}
                        autoResize
                        label={{
                            text: 'Описание',
                            type: 'h',
                            size: 4,
                        }}
                        placeholder="Можно оставить пустым"
                        errors={form.description.errors}
                        onChange={form.description.changeMiddleware()}
                    />
                </Container>

                <Button
                    onClick={handleSubmit}
                    disabled={lock || !isValid}
                >
                    {lock ? (
                        <Spinner classes={styles.btnSpinner} />
                    ) : (
                        <>
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
