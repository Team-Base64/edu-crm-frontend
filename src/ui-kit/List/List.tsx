import React from 'react';
import { ListFCProps } from './types';
import EmptyItem from '@components/EmptyItem/EmptyItem';
import Container from '@ui-kit/Container/Container';

const ListFC = <Data extends {}, ListItemFCProps extends {}>(
    props: ListFCProps<Data, ListItemFCProps>,
) => {
    const {
        itemsState: [items, changeItems],
        renderItem,
        renderItemProps,
        children,
        containerProps,
        classes,
    } = props;
    const Item = renderItem;

    const handleSelect = (uuid: string, newState: boolean) => {
        changeItems((prev) =>
            prev.map((item) =>
                item.uuid === uuid ? { ...item, selected: newState } : item,
            ),
        );
    };

    const handleDelete = (uuid: string) => {
        changeItems((prev) => prev.filter((item) => item.uuid !== uuid));
    };

    return (
        <ul className={classes}>
            <Container
                direction="vertical"
                {...containerProps}
            >
                {items.length ? (
                    items.map((item, index) => (
                        <React.Fragment key={item.uuid}>
                            <Item
                                item={item}
                                index={index}
                                onDelete={handleDelete}
                                onSelect={handleSelect}
                                {...renderItemProps}
                            />
                        </React.Fragment>
                    ))
                ) : children ? (
                    children
                ) : (
                    <EmptyItem text="Пустой список" />
                )}
            </Container>
        </ul>
    );
};

export default ListFC;
