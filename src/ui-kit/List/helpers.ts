import { v4 as uuid } from 'uuid';
import { Item } from './types';

export const objToItem = <Data extends {}>(item: Data, selected: boolean = false): Item<Data> => {
    return {
        ...item,
        uuid: uuid(),
        selected: selected,
    };
};

export const arrayToItem = <Data extends {}>(items: Data[], selected : boolean = false): Item<Data>[] => {
    return items.map((item) => objToItem(item, selected));
};
