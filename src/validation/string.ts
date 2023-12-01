export const isNotEmptyString = (text: string | undefined) => !!text;

export const getEmptyStringValidation = (text: string | undefined) =>
    getValidationMessage(text, 'Поле должно быть заполнено', isNotEmptyString);

export const getValidationMessage = (
    text: string | undefined,
    errorText: string,
    validate: (text: string | undefined) => boolean,
) => (validate(text?.trim()) ? '' : errorText);
