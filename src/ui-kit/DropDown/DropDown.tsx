import React from 'react';
import styles from './DropDown.module.scss';

interface DropDownProps extends React.InputHTMLAttributes<HTMLSelectElement> {
    options: string[];
    classes: string;
    isSelected: (index: number) => boolean;
}

export const DropDown: React.FC<DropDownProps> = ({
    options,
    classes,
    onChange,
    isSelected,
}) => {
    const optionsElements = options.map((option, index) => (
        <option
            key={option + index}
            className={styles.dropDownOption}
            selected={isSelected(index)}
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
            >
                {optionsElements}
            </select>
        </div>
    );
};
