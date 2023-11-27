import React from 'react';
import styles from './DropDown.module.scss';
import Text from '@ui-kit/Text/Text.tsx';

interface DropDownProps extends React.InputHTMLAttributes<HTMLSelectElement> {
    options: string[];
    classes: string;
    values: number[];
    selectedValue?: number;
    label: string;
}

export const DropDown: React.FC<DropDownProps> = ({
    options,
    classes,
    onChange,
    values,
    selectedValue,
    label,
}) => {
    console.log(selectedValue, values);

    const optionsElements = options.map((option, index) => (
        <option
            key={option + index}
            className={styles.dropDownOption}
            value={values[index]}
        >
            {option}
        </option>
    ));
    return (
        <div className={[styles.dropDown, classes].join(' ')}>
            <label className={styles.dropDownLabel}>
                <Text
                    type={'h'}
                    size={5}
                >
                    {label}
                </Text>
            </label>
            <select
                id={options.toString()}
                className={[styles.dropDownDataList].join(' ')}
                onChange={onChange}
                defaultValue={selectedValue}
            >
                {optionsElements}
            </select>
        </div>
    );
};
