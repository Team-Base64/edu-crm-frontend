export const commentStorePath = '/review/ta/';

export const getComment = (
    form: React.RefObject<HTMLFormElement>,
    taskID: number | string,
): string | undefined => {
    if (!form.current) return undefined;

    return form.current[`${taskID}comment`].value;
};

export const clearComment = (
    form: React.RefObject<HTMLFormElement>,
    taskID: number | string,
): boolean => {
    if (!form.current) return false;

    if (!form.current[`${taskID}comment`].value) return false;

    form.current[`${taskID}comment`].value = '';
    localStorage.setItem(commentStorePath + taskID, '');

    return true;
};
