import { UiComponentProps } from '@ui-kit/interfaces.ts';
import React from 'react';
import styles from './AttachFile.module.scss';

interface AttachFileProps extends UiComponentProps {
    setFilesState: React.Dispatch<React.SetStateAction<File[] | undefined>>;
    maxFilesToAttach: number;
}

export const AttachFile: React.FC<AttachFileProps> = ({
    setFilesState,
    maxFilesToAttach,
    children,
}) => {
    const templateHandler = (
        handler: (target: HTMLInputElement) => void,
        { target }: React.FormEvent<HTMLInputElement>,
    ) => {
        if (
            target instanceof HTMLInputElement &&
            target.files &&
            target.files.length < maxFilesToAttach
        ) {
            handler(target);
        } else {
            console.warn('too many');
        }
    };

    const handleOnChange = templateHandler.bind(this, (target) => {
        setFilesState(Array.from(target.files ?? []));
        target.files = null;
    });

    return (
        <>
            <label
                htmlFor={'attach-input'}
                className={styles.attachFileLabel}
            >
                {children}
            </label>
            <input
                className={styles.attachFile}
                type={'file'}
                id={'attach-input'}
                accept={'.pdf, image/*'}
                onChange={handleOnChange}
                // onLoad={handleOnLoad}
                multiple
            ></input>
        </>
    );
};
