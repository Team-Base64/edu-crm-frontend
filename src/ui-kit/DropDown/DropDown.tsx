import React from 'react';
import styles from './DropDown.module.scss';
interface DropDownProps extends React.InputHTMLAttributes<HTMLSelectElement> {
    options: string[];
    classes: string;
}

export const DropDown: React.FC<DropDownProps> = ({
    options,
    classes,
    onChange,
}) => {
    const optionsElements = ['', ...options].map((option, index) => (
        <option key={option + index}>{option}</option>
    ));
    return (
        <select
            id={options.toString()}
            className={[styles.dropDownDataList, classes].join(' ')}
            onChange={onChange}
        >
            {optionsElements}
        </select>
    );
};
