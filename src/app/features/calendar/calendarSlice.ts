import appApi from '@app/appApi';
import { calendarPaths } from '@app/features/calendar/calendarPaths.ts';
import {
    CalendarCreateEventType,
    CalendarEventDeleteType,
    CalendarEventSelectByIDType,
    CalendarEventType,
    calendarGetID,
} from '@app/features/calendar/calendarModel.ts';
import appPaths from '@app/appPaths';

export const calendarSlice = appApi.injectEndpoints({
    endpoints: (build) => ({
        addEvent: build.mutation<unknown, CalendarCreateEventType>({
            query: (eventData) => {
                return {
                    url: `${appPaths.basePath}${calendarPaths.addEvent}`,
                    method: 'POST',
                    body: eventData,
                };
            },
            invalidatesTags: ['getEvents'],
        }),
        editEvent: build.mutation<unknown, CalendarCreateEventType>({
            query: (eventData) => {
                return {
                    url: `${appPaths.basePath}${calendarPaths.editEvent}`,
                    method: 'POST',
                    body: eventData,
                };
            },
            invalidatesTags: ['getEvents'],
        }),
        getEvents: build.query<
            { calendarEvents: CalendarEventSelectByIDType },
            unknown
        >({
            query: () => {
                return {
                    url: calendarPaths.getEvents,
                    method: 'GET',
                };
            },
            providesTags: ['getEvents'],

            transformResponse(calendarEvents: { events: CalendarEventType[] }) {
                const newDialogs: CalendarEventSelectByIDType = {};

                calendarEvents.events.forEach((event) => {
                    newDialogs[event.id] = event;
                });

                return { calendarEvents: newDialogs };
            },
        }),
        deleteEvent: build.mutation<unknown, CalendarEventDeleteType>({
            query: (deleteEventData) => {
                return {
                    url: `${appPaths.basePath}${calendarPaths.deleteEvent}`,
                    method: 'DELETE',
                    body: deleteEventData,
                };
            },
            invalidatesTags: ['getEvents'],
        }),
        getCalendarID: build.query<calendarGetID, unknown>({
            query: () => {
                return {
                    url: `${appPaths.basePath}${calendarPaths.getCalendarID}`,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const {
    useAddEventMutation,
    useGetEventsQuery,
    useDeleteEventMutation,
    useEditEventMutation,
    useGetCalendarIDQuery,
} = calendarSlice;
