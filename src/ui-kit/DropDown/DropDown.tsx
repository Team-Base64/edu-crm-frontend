import React from 'react';
import styles from './DropDown.module.scss';

interface DropDownProps extends React.InputHTMLAttributes<HTMLSelectElement> {
    options: string[];
    classes: string;
    values: number[];
    selectedValue?: number;
}

export const DropDown: React.FC<DropDownProps> = ({
    options,
    classes,
    onChange,
    values,
    selectedValue,
}) => {
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
            <select
                id={options.toString()}
                className={[styles.dropDownDataList].join(' ')}
                onChange={onChange}
                value={selectedValue}
            >
                {optionsElements}
            </select>
        </div>
    );
};
