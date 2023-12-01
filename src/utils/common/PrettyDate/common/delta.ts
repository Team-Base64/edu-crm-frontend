export function getDelta(l: number | string | Date, r: number | string | Date) {
    return (
        Date.parse(new Date(l).toISOString()) -
        Date.parse(new Date(r).toISOString())
    );
}

export function getDeltaNow(t: number | string | Date) {
    return Date.now() - Date.parse(new Date(t).toISOString());
}
