import React, { KeyboardEventHandler, useEffect, useId } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import styles from '@ui-kit/TextArea/TextArea.module.scss';
import Container from '@ui-kit/Container/Container';
import { useThrottle } from '@ui-kit/_hooks/useThrottle';
import Label, { LabelProps } from '@ui-kit/Label/Label';
import { noop } from '@app/const/consts.ts';

const borderType = {
    thin: styles.textareaBorderThin,
    default: styles.textareaBorderDefault,
    thick: styles.textareaBorderThick,
    none: '',
};

type BorderType = keyof typeof borderType;

interface TextAreaProps extends UiComponentProps {
    name?: string;
    textareaText?: string;
    placeholder?: string;
    spellcheck?: boolean;
    border?: BorderType;
    label?: LabelProps;
    autoResize?: boolean;
    minRows?: number;
    focusRows?: number;
    maxRows?: number;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeydownCallback?: () => void;
    textareaRef: React.RefObject<HTMLTextAreaElement>;
    maxLength?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
    name,
    textareaText,
    placeholder,
    label,
    spellcheck,
    border = 'default',
    autoResize = false,
    minRows = 1,
    focusRows = 2,
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
        } else {
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
        <Container
            direction="vertical"
            classes={classes}
        >
            {label && <Label {...label} />}
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
                className={[styles.textarea, borderType[border]].join(' ')}
                {...rest}
            />
        </Container>
    );
};

export default TextArea;
