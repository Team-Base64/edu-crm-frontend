import { useState } from 'react';
import { arrayToItem } from './helpers';

// хук преобразования данных в данные списка
export const useListItems = <Data extends {}>(items: Data[]) => {
    const state = useState(arrayToItem(items));

    return state;
};
