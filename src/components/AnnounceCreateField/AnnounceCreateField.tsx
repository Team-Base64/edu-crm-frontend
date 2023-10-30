import Avatar from '@ui-kit/Avatar/Avatar';
import Container from '@ui-kit/Container/Container';
import Icon from '@ui-kit/Icon/Icon';
import TextArea from '@ui-kit/TextArea/TextArea';
import {
    ChangeEvent,
    useCallback,
    useEffect,
    useId,
    useRef,
    useState,
} from 'react';
import styles from './AnnounceCreateField.module.scss';

interface AnnounceCreateFieldProps {
    avatarSrc: string;
    submit?: (text: string) => void;
}

const AnnounceCreateField: React.FC<AnnounceCreateFieldProps> = ({
    submit,
    avatarSrc,
}) => {
    const id = useId();
    const [value, setValue] = useState<string>('');
    const textarea_ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!textarea_ref.current) {
            return;
        }
        textarea_ref.current.style.height = '0px';
        const scrollHeight = textarea_ref.current.scrollHeight;
        textarea_ref.current.style.height = scrollHeight + 'px';
    }, [textarea_ref, value]);

    const handleChagne = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            e.preventDefault();
            e.stopPropagation();
            setValue(e.target.value);
        },
        [setValue],
    );

    const handleSubmit = useCallback(() => {
        const trimmed = value.trim();

        if (textarea_ref.current) {
            textarea_ref.current.value = trimmed.length > 1 ? '' : trimmed;
        }

        if (trimmed.length > 1) {
            submit?.(trimmed);
        }
    }, [submit, value, textarea_ref]);

    const handleSubmitBtnClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
        },
        [handleSubmit],
    );

    const handleKeydown = useCallback(
        (e: KeyboardEvent) => {
            if (
                !textarea_ref.current ||
                textarea_ref.current !== document.activeElement
            ) {
                return;
            }
            const { code, ctrlKey } = e;

            if (code === 'Enter' && ctrlKey) {
                handleSubmit();
            }
        },
        [handleSubmit, textarea_ref],
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        return () => document.removeEventListener('keydown', handleKeydown);
    }, [handleKeydown]);

    return (
        <Container
            classes={styles.card}
            direction="horizontal"
        >
            <Avatar
                classes={styles.avatar}
                src={avatarSrc}
            />
            <TextArea
                classes={styles.area}
                name="announce"
                spellcheck={true}
                id={id}
                placeholder={'Напишите что-нибудь всему классу...'}
                textareaText=""
                border={'noBroder'}
                rows={1}
                onChange={handleChagne}
                textAreaRef={textarea_ref}
            />
            <Icon
                onClick={handleSubmitBtnClick}
                classes={styles.btn}
                name="chatSend"
            />
        </Container>
    );
};

export default AnnounceCreateField;
