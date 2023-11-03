import React, { useEffect, useId, useRef } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import styles from '@ui-kit/TextArea/TextArea.module.scss';

interface TextAreaProps extends UiComponentProps {
    name?: string;
    textareaText?: string;
    placeholder?: string;
    spellcheck?: boolean;
    border?: BorderType;
    labelText?: string;
    autoResize?: boolean;
    minRows?: number;
    maxRows?: number;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeydown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    textareaRef?: React.RefObject<HTMLTextAreaElement>;
}

const borderType = {
    border: styles.textareaBorder,
    noBorder: '',
};
type BorderType = keyof typeof borderType;

const TextArea: React.FC<TextAreaProps> = ({
    name,
    textareaText,
    placeholder,
    labelText,
    spellcheck,
    border = 'noBorder',
    autoResize = false,
    minRows = 1,
    maxRows = 10,
    onChange,
    onKeydown,
    textareaRef,
    classes,
}) => {
    const id = useId();

    //@eslint-ignore
    if (!textareaRef) {
        textareaRef = useRef<HTMLTextAreaElement>(null);
    }

    const resizeTextarea = () => {
        const area = textareaRef?.current;
        if (!autoResize || !area) {
            return;
        }

        const areaStyles = window.getComputedStyle(area);
        const lineHeight = parseInt(areaStyles.lineHeight);
        const padding =
            parseInt(areaStyles.paddingTop) +
            parseInt(areaStyles.paddingBottom);
        const border =
            parseFloat(areaStyles.borderTopWidth) +
            parseFloat(areaStyles.borderBottomWidth);

        area.style.height = border + padding + minRows * lineHeight + 'px';

        if (area === document.activeElement) {
            area.style.height =
                Math.min(
                    border + area.scrollHeight,
                    border + padding + lineHeight * maxRows,
                ) + 'px';
        }
    };

    useEffect(() => {
        resizeTextarea();
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        resizeTextarea();
        onChange?.(e);
    };

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
                onKeyDown={onKeydown}
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
