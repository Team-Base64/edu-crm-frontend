import { Rule, validator } from '@ui-kit/_utils/validator';
import { useState, useEffect, useCallback } from 'react';

type ChangeHandler = React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

type FormField = {
    name: string;
    changeMiddleware: (func?: ChangeHandler) => ChangeHandler;
    errors: string[];
    value: string;
    valid: boolean;
};

type FormSchemaField = {
    rules: Rule;
    initial: string;
};

export default function useForm<
    FormSchema extends Record<string, FormSchemaField>,
>(
    schema: FormSchema,
): [
    fields: Record<keyof FormSchema, FormField>,
    isFormValid: boolean,
    clear: () => void,
] {
    const [isFormValid, changeValid] = useState(false);

    // eslint-disable-next-line
    const initialState: any = Object.assign(
        {},
        ...Object.entries(schema as Record<string, FormSchemaField>).map(
            ([name, { rules, initial }]): Record<string, FormField> => {
                return {
                    [name]: {
                        name,
                        value: initial,
                        changeMiddleware: (func) => (e) => {
                            const errs = validator(e.target.value, rules);

                            // eslint-disable-next-line
                            changeState((state: any) => {
                                const { ...newState } = state;

                                newState[name].errors = errs;
                                newState[name].value = e.target.value;
                                newState[name].valid = !errs.length;

                                return newState;
                            });

                            func?.(e);
                        },
                        errors: [],
                        valid: !validator(initial, rules).length,
                    },
                };
            },
        ),
    );

    // eslint-disable-next-line
    const [state, changeState] = useState<any>(initialState);

    useEffect(() => {
        changeValid(
            (Object.values(state) as FormField[]).every((field) => field.valid),
        );
    }, [state]);

    const clear = useCallback(() => {
        changeState(initialState);
    }, [changeState, initialState]);

    return [state as Record<keyof FormSchema, FormField>, isFormValid, clear];
}
