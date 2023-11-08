import { UiComponentProps } from '@ui-kit/interfaces.ts';
import React, { useRef } from 'react';
import styles from './AttachFile.module.scss';
import Button from '@ui-kit/Button/Button.tsx';

interface AttachFileProps extends UiComponentProps {
    setFilesState: React.Dispatch<React.SetStateAction<File[] | undefined>>;
    maxFilesToAttach: number;
}

export const AttachFile: React.FC<AttachFileProps> = ({
    setFilesState,
    maxFilesToAttach,
    children,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const templateHandler = (
        handler: (target: HTMLInputElement) => void,
        { target }: React.FormEvent<HTMLInputElement>,
    ) => {
        if (
            target instanceof HTMLInputElement &&
            target.files &&
            target.files.length <= maxFilesToAttach
        ) {
            handler(target);
        } else {
            console.warn('too many files attached');
        }
    };

    const handleOnChange = templateHandler.bind(this, (target) => {
        console.log('asdas');
        setFilesState(Array.from(target.files ?? []));
        target.files = null;
    });

    return (
        <>
            <label
                htmlFor={'attach-input'}
                className={styles.attachFileLabel}
            >
                <Button
                    type={'link'}
                    size={'m'}
                    onClick={() => inputRef.current?.click()}
                >
                    {children}
                </Button>
            </label>
            <input
                className={styles.attachFile}
                type={'file'}
                id={'attach-input'}
                accept={'.pdf, image/*'}
                onChange={handleOnChange}
                ref={inputRef}
            ></input>
        </>
    );
};
