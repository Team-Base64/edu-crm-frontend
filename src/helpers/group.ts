export function groupByValueReturnObject<Item extends Object, Key extends Extract<keyof Item, PropertyKey>, Value extends PropertyKey>(items: Item[], key: Key) {
    return items.reduce((groups, item) => {
        const targVal = item[key];
        if (!(['string', 'symbol', 'number'].includes(typeof targVal))) {
            throw new Error(`Type of value shold be string|number|symbol { val: ${targVal}, type: ${typeof targVal}}`);
        }
        (groups[targVal as Value] ||= []).push(item);
        return groups;
    }, {} as Record<Value, Item[]>);
}

export function groupByValueReturnMap<Item extends Object, Key extends Extract<keyof Item, PropertyKey>, Value = PropertyKey>(items: Item[], key: Key) {
    const map = new Map<Value, Item[]>();
    items.map(item => {
        const targVal = item[key];
        if (!(['string', 'symbol', 'number'].includes(typeof targVal))) {
            throw new Error(`Type of value shold be string|number|symbol { val: ${targVal}, type: ${typeof targVal}}`);
        }
        const group = map.get(targVal as Value) || [];
        map.set(targVal as Value, [...group, item]);
    });
    return map;
}

export function groupByValuesReturnMap<Item extends Object, Key extends Extract<keyof Item, PropertyKey>>(items: Item[], keys: Key[]) {
    const map = new Map<string, Item[]>();
    items.map(item => {
        const mapKey = '{' + keys.map(key => {
            const targVal = item[key];
            if (!(['string', 'symbol', 'number'].includes(typeof targVal))) {
                throw new Error(`Type of value shold be string|number|symbol { val: ${targVal}, type: ${typeof targVal}}`);
            }
            return [key, targVal].join(': ');
        }).join(', ') + '}';

        const group = map.get(mapKey) || [];
        map.set(mapKey, [...group, item]);
    });
    return map;
}