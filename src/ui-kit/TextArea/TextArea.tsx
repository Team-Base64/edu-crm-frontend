import React, { ChangeEventHandler } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import styles from '@ui-kit/TextArea/TextArea.module.scss';

interface TextAreaProps extends UiComponentProps {
    name: string;
    spellcheck: boolean;
    id: string;
    textareaText: string;
    border: BorderType;
    rows: number;
    onChange: ChangeEventHandler<HTMLTextAreaElement>;
    labelText?: string;
    textAreaRef: React.Ref<HTMLTextAreaElement>;
}

const borderType = {
    border: styles.textareaBorder,
    noBroder: '',
};
type BorderType = keyof typeof borderType;

const TextArea: React.FC<TextAreaProps> = ({
    labelText = '',
    name,
    spellcheck,
    id,
    textareaText,
    border,
    rows,
    onChange,
    textAreaRef,
    classes
}) => {
    return (
        <>
            {labelText && <label htmlFor={id}>labelText</label>}

            <textarea
                name={name}
                spellCheck={spellcheck}
                id={id}
                className={[styles.textarea, borderType[border], classes].join(' ')}
                defaultValue={textareaText}
                rows={rows}
                onChange={onChange}
                ref={textAreaRef}
            ></textarea>
        </>
    );
};

export default TextArea;
