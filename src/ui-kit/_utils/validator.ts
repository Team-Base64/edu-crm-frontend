import getDate from 'utils/common/PrettyDate/common/date';
import getTime from 'utils/common/PrettyDate/common/time';

export interface Rule {
    min?: number;
    max?: number;
    email?: boolean;
    date?: {
        minISO: string;
    };
    noSpaces?: boolean;
    noNumbers?: boolean;
    trim?: boolean;
    noEmpty?: boolean;
}

const emailRE = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/gi;
const numberRE = /[0-9]+/gi;

export const validator = (value: string, rules: Rule): string[] => {
    const errors: string[] = [];

    if (rules.trim) value = value.trim();

    if (rules.date) {
        try {
            new Date(Date.parse(value)).toISOString();
        } catch {
            errors.push('Неверная дата');
        }
        if (rules.date.minISO && value < rules.date.minISO) {
            errors.push(
                `Минимальное значение: ${getDate(rules.date.minISO)} ${getTime(
                    rules.date.minISO,
                )}`,
            );
        }
    }

    if (rules.noEmpty && !value.length) {
        errors.push(`Обязательное поле`);
    }

    if (rules.min && value.length < rules.min) {
        errors.push(`Минимальная длина ${rules.min} символов`); //hdua wdbwa bhdaw bdhw abd awyhd bwahd bwahd bhwadb haw dbhwa dbhhbdw bhad bhhbw dbhdwb hbh
    }

    if (rules.max && value.length > rules.max) {
        errors.push(`Максимальная длина ${rules.max} символов`);
    }

    if (rules.email && !emailRE.test(value)) {
        errors.push(`Email имеет некорректный формат`);
    }

    if (rules.noSpaces && value.includes(' ')) {
        errors.push(`Пробелы запрещены`);
    }

    if (rules.noNumbers && numberRE.test(value)) {
        errors.push(`Цифры запрещены`);
    }

    return errors;
};
