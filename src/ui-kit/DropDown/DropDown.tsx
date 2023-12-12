import React, { useId, useMemo, useRef, useState } from 'react';
import styles from './DropDown.module.scss';
import InputBase, { InputBaseProps } from '@ui-kit/InputBase/InputBase';
import basestyles from '../InputBase/InputBase.module.scss';
import Icon from '@ui-kit/Icon/Icon';
import Button from '@ui-kit/Button/Button';
import Text from '@ui-kit/Text/Text';
import Container from '@ui-kit/Container/Container';

interface DropDownProps extends Omit<InputBaseProps, 'button'> {
    values: (number | string)[];
    placeholder?: number | string;
    initial?: number | string;
    name?: string;
    formatTitle?: (value: number | string) => number | string;
    disabled?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const DropDown: React.FC<DropDownProps> = ({
    formatTitle,
    values,
    initial,
    placeholder = 'Выберите значение',
    disabled = false,
    classes,
    name,
    onChange,
    ...rest
}) => {
    const [showList, setShowList] = useState<boolean>(false);
    const key = useId();
    const fakeInput = useRef<HTMLInputElement>(null);
    const [current, setCurrent] = useState<{ value: string; title: string }>(
        initial
            ? {
                  value: initial.toString(),
                  title: formatTitle
                      ? formatTitle(initial).toString()
                      : placeholder.toString(),
              }
            : {
                  value: 'initial',
                  title: placeholder.toString(),
              },
    );

    const options = useMemo(
        () =>
            values.map((value) => {
                const title = formatTitle ? formatTitle(value) : value;
                return (
                    <li
                        className={styles.item}
                        key={`${key}-${value}`}
                        value={value}
                        onClick={() => {
                            setCurrent({
                                value: value.toString(),
                                title: title.toString(),
                            });
                            setShowList(false);

                            if (!fakeInput.current) return;

                            Object.getOwnPropertyDescriptor(
                                window.HTMLInputElement.prototype,
                                'value',
                            )?.set?.call(fakeInput.current, value.toString());

                            fakeInput.current.dispatchEvent(
                                new Event('change', { bubbles: true }),
                            );
                        }}
                    >
                        <Text
                            type="p"
                            size={1}
                        >
                            {title}
                        </Text>
                    </li>
                );
            }),
        [values, setCurrent, setShowList],
    );

    return (
        <InputBase
            {...rest}
            classes={styles.select}
            button={
                <Button
                    type="link"
                    classes={styles.btn}
                    onClick={() => setShowList((st) => !st)}
                >
                    <Icon
                        name={showList ? 'arrowUp' : 'arrowDown'}
                        classes={styles.icon}
                    />
                </Button>
            }
        >
            <Text
                onClick={() => setShowList((st) => !st)}
                type="p"
                size={1}
                classes={[basestyles.input, styles.current].join(' ')}
            >
                {current.title}
            </Text>
            <input
                style={{ display: 'none' }}
                ref={fakeInput}
                value={current.value}
                onChange={onChange}
            />
            <ul
                className={[
                    styles.ul,
                    showList ? styles.visible : styles.hidden,
                ].join(' ')}
            >
                <Container
                    direction="vertical"
                    layout="defaultBase"
                    classes={styles.container}
                >
                    {options}
                </Container>
            </ul>
        </InputBase>
    );
};
