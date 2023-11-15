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
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    id: 124,
    classid: 2,
};
