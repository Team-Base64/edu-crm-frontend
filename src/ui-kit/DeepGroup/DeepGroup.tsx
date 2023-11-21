import { groupByValuesObjectKeys } from '@ui-kit/_utils/group';
import React, { useId } from 'react';

interface DeepGroupProps<
    Item extends object,
    ListProps extends object,
    GroupProps extends object,
    Key = Extract<keyof Item, PropertyKey>,
> {
    items: Item[];
    keys: Key[];
    renderList: ListFC<ListProps, Item>;
    renderListProps: ListProps;
    renderGroup: GroupFC<GroupProps, Item>;
    renderGroupProps: GroupProps;
}

export type ListFC<Props extends object, Item extends object> = React.FC<
    Props & {
        items: Item[];
    }
>;

export type GroupFC<Props extends object, Item extends object> = React.FC<
    Props & {
        keys: {
            [key in Extract<keyof Item, PropertyKey>]: Item[key] | undefined;
        };
        children: React.ReactNode;
    }
>;

type DeepGroupComponent = <
    Item extends object,
    ListProps extends object,
    GroupProps extends object,
>(
    props: DeepGroupProps<Item, ListProps, GroupProps>,
) => React.ReactNode;

const DeepGroup: DeepGroupComponent = (props) => {
    const key = useId();
    const { items, keys } = props;

    if (!keys.length) {
        const { renderList: List, renderListProps: listProps } = props;
        return (
            <List
                {...listProps}
                items={items}
            />
        );
    }
    const { renderGroup: Group, renderGroupProps: groupProps } = props;
    const groups = groupByValuesObjectKeys(items, [keys[0]]);

    return (
        <>
            {Array.from(groups.entries()).map(([groupKey, groupItems]) => (
                <React.Fragment key={`${key}-${JSON.stringify(groupKey)}`}>
                    <Group
                        {...groupProps}
                        keys={groupKey}
                    >
                        <DeepGroup
                            {...props}
                            items={groupItems}
                            keys={keys.slice(1)}
                        />
                    </Group>
                </React.Fragment>
            ))}
        </>
    );
};

export default DeepGroup;
