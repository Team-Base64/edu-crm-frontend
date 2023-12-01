export default function getTime(iso: number | string | Date): string {
    return new Date(iso).toLocaleTimeString('ru-RU').slice(0, -3);
}
