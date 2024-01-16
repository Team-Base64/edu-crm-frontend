import {
    CalendarEventType,
    calendarGetID,
} from '../../src/app/features/calendar/calendarModel';

export const getEventsFirstMockData: CalendarEventType = {
    title: 'title',
    description: 'description',
    startDate: '2023-11-30T19:45:00+03:00',
    endDate: '2023-11-30T20:45:00+03:00',
    id: 'n5tf8sek94ofs65sc3pfn6k0lk',
    classid: 1,
};

export const getEventsSecondMockData: CalendarEventType = {
    title: 'title long long adasdasjndaskjdnaksndkasndnjasjdkasndkjansdkjasndkjasnkjdans',
    description:
        'description long long ajndkjndjasnkjdnaskdifbwirfbiuwEAIUWENDIWUNDAIEUDN',

    startDate: new Date('August 9, 2024 23:15:30').toISOString(),
    endDate: new Date('August 20, 2024 00:01').toISOString(),
    id: '124',
    classid: 2,
};

export const calendarIdMock: calendarGetID = {
    googleid:
        '611a7b115cb31d14e41c9909e07db425548dd3b5fa76a145f3c93ae7410bc142@group.calendar.google.com',
    id: 1,
};
