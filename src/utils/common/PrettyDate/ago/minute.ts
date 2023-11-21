export default function minutesAgo(offset: number): string {
    if (offset == 0) return 'только что';
    if (offset == 1) return 'минуту назад';

    if (offset < 5) return offset + ' минуты назад';

    if (offset < 20) return offset + ' минут назад';

    const lastDigit = offset % 10;

    if (lastDigit == 0) return offset + ' минут назад';
    if (lastDigit == 1) return offset + ' минуту назад';
    if (lastDigit < 5) return offset + ' минуты назад';

    return offset + ' минут назад';
}
