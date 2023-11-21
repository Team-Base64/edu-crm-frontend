export function groupByValueReturnObject<
    Item extends Object,
    Key extends Extract<keyof Item, PropertyKey>,
    Value extends PropertyKey,
>(items: Item[], key: Key) {
    return items.reduce(
        (groups, item) => {
            const targVal = item[key];
            if (!['string', 'symbol', 'number'].includes(typeof targVal)) {
                throw new Error(
                    `Type of value shold be string|number|symbol { val: ${targVal}, type: ${typeof targVal}}`,
                );
            }
            (groups[targVal as Value] ||= []).push(item);
            return groups;
        },
        {} as Record<Value, Item[]>,
    );
}

export function groupByValueReturnMap<
    Item extends Object,
    Key extends Extract<keyof Item, PropertyKey>,
    Value = PropertyKey,
>(items: Item[], key: Key) {
    const map = new Map<Value, Item[]>();
    items.map((item) => {
        const targVal = item[key];
        if (!['string', 'symbol', 'number'].includes(typeof targVal)) {
            throw new Error(
                `Type of value shold be string|number|symbol { val: ${targVal}, type: ${typeof targVal}}`,
            );
        }
        const group = map.get(targVal as Value) || [];
        map.set(targVal as Value, [...group, item]);
    });
    return map;
}

export function groupByValues<
    Item extends Object,
    Key extends Extract<keyof Item, PropertyKey>,
>(items: Item[], keys: Key[]) {
    const map = new Map<string, Item[]>();
    items.map((item) => {
        const mapKey = JSON.stringify(
            Object.assign(
                {},
                ...keys.map((key) => {
                    if (typeof item[key] === 'function')
                        throw new Error(
                            `Functions not allowed as keys. key is ${JSON.stringify(
                                key,
                            )}`,
                        );
                    return { [key]: item[key] };
                }),
            ),
        );
        const group = map.get(mapKey) || [];
        map.set(mapKey, [...group, item]);
    });

    return map;
}

export function groupByValuesObjectKeys<
    Item extends Object,
    Key extends Extract<keyof Item, PropertyKey>,
>(items: Item[], keys: Key[]) {
    const ret = new Map<
        { [key in Key]: Extract<Item[Key], Item[key]> },
        Item[]
    >();
    const map = groupByValues(items, keys);
    map.forEach((v, k) => {
        ret.set(JSON.parse(k), v);
        map.delete(k);
    });
    return ret;
}
