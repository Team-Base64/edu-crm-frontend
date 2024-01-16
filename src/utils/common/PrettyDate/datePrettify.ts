import daysAgo from './ago/day';
import hoursAgo from './ago/hour';
import minutesAgo from './ago/minute';
import getDate from './common/date';
import getTime from './common/time';

interface Params {
    maxMins: number;
    maxHrs: number;
    maxDays: number;
}

const def: Params = {
    maxMins: 59,
    maxHrs: 23,
    maxDays: 7,
};

export default function prettyDate(
    iso: number | string | Date,
    format: Params = def,
): string {
    const { maxMins, maxDays, maxHrs } = format;

    const target = Date.parse(iso.toString()) / 1000;
    const now = Date.now() / 1000;
    const delta = now - target;

    const mins = Math.floor(delta / 60);
    const hrs = Math.floor(mins / 60);
    const days = Math.floor(hrs / 24);

    if (days > maxDays) {
        return getDate(iso) + ' в ' + getTime(iso);
    }

    if (hrs > maxHrs) {
        return daysAgo(days) + ' в ' + getTime(iso);
    }

    if (mins > maxMins) {
        return hoursAgo(hrs);
    }

    return minutesAgo(mins);
}
