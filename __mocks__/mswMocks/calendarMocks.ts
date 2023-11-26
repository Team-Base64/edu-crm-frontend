import { http, HttpResponse } from 'msw';
import appPaths from '../../src/app/appPaths';
import { defaultHeadersMock } from '../const/constMocks';
import { calendarPaths } from '../../src/app/features/calendar/calendarPaths.ts';
import {
    calendarIdMock,
    getEventsFirstMockData,
    getEventsSecondMockData,
} from '../const/calendarConstMocks';

export const calendarHandlers = [
    http.get(`${appPaths.basePath}${calendarPaths.getEvents}`, () =>
        HttpResponse.json(
            {
                events: [getEventsFirstMockData, getEventsSecondMockData],
            },
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
    http.post(`${appPaths.basePath}${calendarPaths.editEvent}`, () => {
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
    http.get(`${appPaths.basePath}${calendarPaths.getCalendarID}`, () => {
        HttpResponse.json(
            { calendarIdMock },
            {
                status: 200,
                headers: { ...defaultHeadersMock },
            },
        );
    }),
];
