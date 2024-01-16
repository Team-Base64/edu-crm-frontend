// --- Данные

import { ContainerProps } from '@ui-kit/Container/Container';
import { UiComponentProps } from '@ui-kit/interfaces';
import React from 'react';

// Необходимые поля
export interface IItem {
    uuid: string;
    selected: boolean;
}

// Данные элемента списка
export type Item<Data extends {}> = Data & IItem;

// --- Компонент рендера элемента списка
// Общие пропы
export interface ListItemFCBaseProps<Data extends {}> {
    item: Item<Data>;
    index: number;
    onSelect: (uuid: string, newState: boolean) => void;
    onDelete: (uuid: string) => void;
}

// Компонент рендера элемента списка
export type ListItemFC<Data extends {}, ItemFCProps extends {}> = React.FC<
    ItemFCProps & ListItemFCBaseProps<Data>
>;

// --- Компонент рендера списка
// Пропсы
export interface ListFCProps<Data extends {}, ItemFCProps extends {}>
    extends UiComponentProps {
    itemsState: [
        Item<Data>[],
        React.Dispatch<React.SetStateAction<Item<Data>[]>>,
    ];
    renderItem: ListItemFC<Data, ItemFCProps>;
    renderItemProps: ItemFCProps;
    children?: React.ReactNode;
    containerProps?: ContainerProps;
}
