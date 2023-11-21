import { CalendarEventType } from '../../src/app/features/calendar/calendarModel';

export const getEventsFirstMockData: CalendarEventType = {
    title: 'title',
    description: 'description',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    id: 123,
    classid: 1,
};

export const getEventsSecondMockData: CalendarEventType = {
    title: 'title long long adasdasjndaskjdnaksndkasndnjasjdkasndkjansdkjasndkjasnkjdans',
    description:
        'description long long ajndkjndjasnkjdnaskdifbwirfbiuwEAIUWENDIWUNDAIEUDN',

    startDate: new Date('August 9, 2024 23:15:30').toISOString(),
    endDate: new Date('August 20, 2024 00:01').toISOString(),
    id: 124,
    classid: 2,
};
