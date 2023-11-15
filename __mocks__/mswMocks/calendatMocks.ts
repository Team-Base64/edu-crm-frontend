import { http, HttpResponse } from 'msw';
import appPaths from '../../src/app/appPaths';
import { defaultHeadersMock } from '../const/constMocks';
import { calendarPaths } from '../../src/app/features/calendar/calendarPaths.ts';
import {
    getEventsFirstMockData,
    getEventsSecondMockData,
} from '../const/calendarConstMocks';

export const calendarHandlers = [
    http.get(`${appPaths.basePath}${calendarPaths.getEvents}`, () =>
        HttpResponse.json(
            [
                getEventsFirstMockData,
                getEventsSecondMockData,
                getEventsSecondMockData,
                getEventsSecondMockData,
                getEventsSecondMockData,
                getEventsSecondMockData,
                getEventsSecondMockData,
            ],
            {
                status: 200,
                headers: { ...defaultHeadersMock },
            },
        ),
    ),
    http.post(`${appPaths.basePath}${calendarPaths.addEvent}`, () => {
        HttpResponse.json(
            {},
            {
                status: 200,
                headers: { ...defaultHeadersMock },
            },
        );
    }),
    http.delete(`${appPaths.basePath}${calendarPaths.deleteEvent}`, () => {
        HttpResponse.json(
            {},
            {
                status: 200,
                headers: { ...defaultHeadersMock },
            },
        );
    }),
];
