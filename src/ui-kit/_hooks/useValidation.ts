import { Rule, validator } from '@ui-kit/_utils/validator';
import { useCallback, useEffect, useState } from 'react';

type ChangeHandler = React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
>;

export function useValidation<Schema = Record<string, Rule>>(
    schema: Schema,
): [
    names: Record<keyof Schema, string>,
    handlers: Record<keyof Schema, ChangeHandler>,
    errors: Record<keyof Schema, { msgs: string[]; initial: boolean }>,
    isValid: boolean,
    clear: () => void,
] {
    // eslint-disable-next-line
    const handlers: any = {};
    // eslint-disable-next-line
    const names: any = {};
    // eslint-disable-next-line
    const initErrors: any = {};

    Object.getOwnPropertyNames(schema).forEach((name) => {
        const handler: ChangeHandler = (e) => {
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    [name]: {
                        msgs: validator(
                            e.target.value,
                            schema[name as keyof Schema] as Rule,
                        ),
                        initial: false,
                    },
                };
            });
        };
        handlers[name] = handler;
        names[name] = name;
        initErrors[name] = { msgs: [], initial: true };
    });

    const [errors, setErrors] =
        useState<Record<keyof Schema, { msgs: string[]; initial: boolean }>>(
            initErrors,
        );
    const [valid, setValid] = useState<boolean>(false);

    useEffect(() => {
        setValid(
            (
                Object.values(errors) as { msgs: string[]; initial: boolean }[]
            ).every((item) => !item.msgs.length && !item.initial),
        );
    }, [errors]);

    const clear = useCallback(() => {
        setErrors(initErrors);
    }, [setErrors]);

    useEffect(() => {
        clear();
    }, [clear]);

    return [
        names as Record<keyof Schema, string>,
        handlers as Record<keyof Schema, ChangeHandler>,
        errors,
        valid,
        clear,
    ];
}
