import { v4 as uuid } from 'uuid';
import { Item } from './types';

export const objToItem = <Data extends {}>(item: Data): Item<Data> => {
    return {
        ...item,
        uuid: uuid(),
        selected: false,
    };
};

export const arrayToItem = <Data extends {}>(items: Data[]): Item<Data>[] => {
    return items.map((item) => objToItem(item));
};
