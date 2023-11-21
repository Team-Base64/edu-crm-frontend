export default function daysAgo(offset: number): string {
    if (offset === 0) return 'сегодня';
    if (offset === 1) return 'вчера';
    if (offset === 2) return 'позавчера';

    const lastDigit = offset % 10;

    if (lastDigit == 0) return offset + ' дней назад';
    if (lastDigit == 1) return offset + ' день назад';
    if (lastDigit < 5) return offset + ' дня назад';

    return offset + ' дней назад';
}
