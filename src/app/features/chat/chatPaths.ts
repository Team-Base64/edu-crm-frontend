import { dialogPaths } from '@app/features/dialog/dialogPaths.ts';

export const chatPaths = {
    dialog: (id: string | number) => `${dialogPaths.dialogs}/${id}`,
};
