export const dateToLocalISO = (date: Date) => {
    const off = date.getTimezoneOffset();
    const absoff = Math.abs(off);
    const res =
        new Date(date.getTime() - off * 60 * 1000).toISOString().substr(0, 23) +
        (off > 0 ? '-' : '+') +
        Math.floor(absoff / 60)
            .toFixed(0)
            .padStart(2, '0') +
        ':' +
        (absoff % 60).toString().padStart(2, '0');
    return res;
};
