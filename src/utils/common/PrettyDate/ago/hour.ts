export default function hoursAgo(offset: number): string {
    if (offset == 0) return 'менее часа назад';
    if (offset == 1) return 'час назад';

    const lastDigit = offset % 10;

    if (lastDigit == 0) return offset + ' часов назад';

    if (offset < 5) {
        return offset + ' часа назад';
    }

    if (offset < 20) {
        return offset + ' часов назад';
    }

    if (lastDigit == 1) return offset + ' час назад';
    if (lastDigit < 5) return offset + ' часа назад';

    return offset + ' часов назад';
}