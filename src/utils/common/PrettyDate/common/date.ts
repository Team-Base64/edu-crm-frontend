export default function getDate(iso: number | string | Date, showYear: boolean = true): string {
    const date = new Date(iso).toLocaleDateString('ru-RU');

    if(!showYear) {
        return date.slice(0, -5);
    }

    return date;
}