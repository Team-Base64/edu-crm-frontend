import React, { KeyboardEventHandler, useEffect, useId } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import styles from '@ui-kit/TextArea/TextArea.module.scss';
import Container from '@ui-kit/Container/Container';
import { noop } from '@app/const/consts';

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
    onKeydownCallback?: () => void;
    textareaRef ?: React.RefObject<HTMLTextAreaElement>;
    maxLength?: number;
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
    onKeydownCallback = noop,
    textareaRef,
    classes,
    ...rest
}) => {
    const id = useId();

    const handleAreaKeydown: KeyboardEventHandler<HTMLTextAreaElement> = (
        event,
    ) => {
        if (event.code === 'Enter' && event.ctrlKey) {
            onKeydownCallback();
        }
    };

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
        <Container direction='vertical'>
            {labelText && <label htmlFor={id}>{labelText}</label>}
            <textarea
                id={id}
                ref={textareaRef}
                name={name}
                spellCheck={spellcheck}
                defaultValue={textareaText}
                placeholder={placeholder}
                onChange={handleChange}
                onKeyDown={handleAreaKeydown}
                onFocusCapture={resizeTextarea}
                onBlur={resizeTextarea}
                className={[styles.textarea, borderType[border], classes].join(
                    ' ',
                )}
                {...rest}
            ></textarea>
        </Container>
    );
};

export default TextArea;
