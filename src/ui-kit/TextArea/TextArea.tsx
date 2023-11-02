import React, { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import styles from '@ui-kit/TextArea/TextArea.module.scss';
import { delay } from 'msw';

interface TextAreaProps extends UiComponentProps {
    name?: string;
    textareaText?: string;
    placeholder?: string;
    spellcheck?: boolean;
    border?: BorderType;
    labelText?: string;
    autoResize?: boolean;
    minRows ?: number;
    maxRows ?: number;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const borderType = {
    border: styles.textareaBorder,
    noBroder: '',
};
type BorderType = keyof typeof borderType;

const TextArea: React.FC<TextAreaProps> = ({
    name,
    textareaText,
    placeholder,
    labelText,
    spellcheck,
    border = 'noBroder',
    autoResize = false,
    minRows = 1,
    maxRows = 10,
    onChange,
    classes,
}) => {

    const id = useId();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        resizeTextarea();
    }, [textareaRef]);

    const resizeTextarea = () => {
        const area = textareaRef.current;
        if (!autoResize || !area) {
            return;
        }

        const lineHeight = parseInt(window.getComputedStyle(area).lineHeight);

        area.style.height = minRows * lineHeight + 'px';
        if (area === document.activeElement) {
            area.style.height = Math.min(area.scrollHeight, lineHeight * maxRows)  + 'px';
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        resizeTextarea();
        onChange?.(e);
    }

    return (
        <>
            {labelText && <label htmlFor={id}>{labelText}</label>}
            <textarea
                id={id}
                ref={textareaRef}
                name={name}
                spellCheck={spellcheck}
                defaultValue={textareaText}
                placeholder={placeholder}
                onChange={handleChange}
                onFocusCapture={resizeTextarea}
                onBlur={resizeTextarea}
                className={[styles.textarea, borderType[border], classes].join(
                    ' ',
                )}
            ></textarea>
        </>
    );
};

export default TextArea;
