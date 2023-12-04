import React, { KeyboardEventHandler, useEffect } from 'react';
import styles from '@ui-kit/TextArea/TextArea.module.scss';
import basestyles from '../InputBase/InputBase.module.scss';
import { useThrottle } from '@ui-kit/_hooks/useThrottle';
import { noop } from '@app/const/consts.ts';
import InputBase, { InputBaseProps } from '@ui-kit/InputBase/InputBase';

interface TextAreaProps extends InputBaseProps {
    name?: string;
    textareaText?: string;
    placeholder?: string;
    spellcheck?: boolean;
    autoResize?: boolean;
    collapseOnBlur ?: boolean;
    minRows?: number;
    focusRows?: number;
    maxRows?: number;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeydownCallback?: () => void;
    textareaRef: React.RefObject<HTMLTextAreaElement>;
    disabled?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
    name,
    textareaText,
    placeholder,
    spellcheck,
    autoResize = false,
    minRows = 1,
    focusRows = minRows,
    maxRows = 10,
    onChange,
    onKeydownCallback = noop,
    textareaRef,
    disabled = false,
    collapseOnBlur = false,
    ...rest
}) => {
    const handleAreaKeydown: KeyboardEventHandler<HTMLTextAreaElement> = (
        event,
    ) => {
        if (event.code === 'Enter' && event.ctrlKey) {
            event.preventDefault();
            if (!textareaRef.current) return;
            textareaRef.current.value += '\r\n';
            textareaRef.current.dispatchEvent(
                new Event('input', { bubbles: true }),
            );
            return;
        }
        if (event.code === 'Enter' && !event.ctrlKey) {
            event.preventDefault();
            onKeydownCallback();
            return;
        }
    };

    const resizeTextarea = () => {
        const area = textareaRef.current;
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

        if (area === document.activeElement) {
            area.style.height =
                border + padding + focusRows * lineHeight + 'px';
            area.style.height =
                Math.min(
                    border + area.scrollHeight,
                    border + padding + lineHeight * maxRows,
                ) + 'px';
        } else if(collapseOnBlur) {
            area.style.height = border + padding + minRows * lineHeight + 'px';
        }
    };

    const resizeTextareaThrottled = useThrottle(resizeTextarea, 200);

    useEffect(() => {
        resizeTextarea();
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        resizeTextareaThrottled(null);
        onChange?.(e);
    };

    return (
        <InputBase {...rest}>
            <textarea
                className={[styles.textarea, basestyles.input].join(' ')}
                name={name}
                value={textareaText}
                placeholder={placeholder}
                disabled={disabled}
                spellCheck={spellcheck}
                onChange={handleChange}
                onKeyDown={handleAreaKeydown}
                onFocusCapture={resizeTextarea}
                onBlur={resizeTextarea}
                ref={textareaRef}
            />
        </InputBase>
    );
};

export default TextArea;
