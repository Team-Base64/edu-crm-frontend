import { UiComponentProps } from '@ui-kit/interfaces.ts';
import React, { useRef } from 'react';
import styles from './AttachFile.module.scss';
import Button from '@ui-kit/Button/Button.tsx';

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
    const [settedFiles, setFilesState] = useFiles;
    const inputRef = useRef<HTMLInputElement>(null);
    const templateHandler = (
        handler: (files: FileList) => void,
        { target }: React.FormEvent<HTMLInputElement>,
    ) => {
        if (target instanceof HTMLInputElement && target.files) {
            handler(target.files);
            target.files = null;
        }
    };

    const handleOnChange = templateHandler.bind(this, (files) => {
        if (files && files.length + settedFiles.length <= maxFilesToAttach) {
            setFilesState([...settedFiles, ...Array.from(files ?? [])]);
        } else {
            console.warn(
                `too many files : ${files.length + settedFiles.length}`,
            );
        }
    });

    return (
        <>
            <label
                htmlFor={'attach-input'}
                className={styles.attachFileLabel}
            >
                <Button
                    disabled={disabled}
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
                multiple={true}
            ></input>
        </>
    );
};
