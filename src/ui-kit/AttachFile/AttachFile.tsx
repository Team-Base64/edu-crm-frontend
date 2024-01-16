import { UiComponentProps } from '@ui-kit/interfaces.ts';
import React, { useEffect, useRef, useState } from 'react';
import styles from './AttachFile.module.scss';
import Button from '@ui-kit/Button/Button.tsx';
import Hint from '@ui-kit/Hint/Hint';

interface AttachFileProps extends UiComponentProps {
    useFiles: [File[], React.Dispatch<React.SetStateAction<File[]>>];
    maxFilesToAttach: number;
    disabled?: boolean;
}

export const AttachFile: React.FC<AttachFileProps> = ({
    useFiles,
    maxFilesToAttach,
    children,
    disabled = false,
}) => {
    const [lock, setLock] = useState<boolean>(false);
    const [hint, setHint] = useState<boolean>(false);
    const [files, changeFiles] = useFiles;
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = () => {
        if (!inputRef.current) return;

        const inputFiles = Array.from(inputRef.current.files ?? []);
        inputRef.current.value = '';

        changeFiles((current) =>
            [...current, ...inputFiles].slice(0, maxFilesToAttach),
        );
    };

    useEffect(() => {
        setLock(files.length >= maxFilesToAttach);
        setHint(files.length >= maxFilesToAttach);
    }, [files, maxFilesToAttach, setLock]);

    return (
        <>
            <label htmlFor={'attach-input'}>
                <Button
                    disabled={disabled || lock}
                    type={'link'}
                    size={'m'}
                    onClick={() => inputRef.current?.click()}
                    classes={styles.btn}
                >
                    {children}
                </Button>
                <Hint
                    classes={styles.hint}
                    state={[hint, setHint]}
                    timeoutSec={5}
                    text={`Можно прикрепить не более ${maxFilesToAttach} файлов`}
                />
            </label>
            <input
                className={styles.input}
                type={'file'}
                id={'attach-input'}
                accept={'.pdf, image/*'}
                onChange={handleChange}
                ref={inputRef}
                multiple={maxFilesToAttach > 1}
            ></input>
        </>
    );
};
