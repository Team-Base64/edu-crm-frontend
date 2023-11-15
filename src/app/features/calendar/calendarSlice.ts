import appApi from '@app/appApi';
import { calendarPaths } from '@app/features/calendar/calendarPaths.ts';
import {
    CalendarEventDeleteType,
    CalendarEventSelectByIDType,
    CalendarEventType,
} from '@app/features/calendar/calendarModel.ts';
import appPaths from '@app/appPaths';

export const calendarSlice = appApi.injectEndpoints({
    endpoints: (build) => ({
        addEvent: build.mutation<unknown, CalendarEventType>({
            query: (eventData) => {
                return {
                    url: `${appPaths.basePath}${calendarPaths.addEvent}`,
                    method: 'POST',
                    body: eventData,
                };
            },
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
            transformResponse(calendarEvents: CalendarEventType[]) {
                const newDialogs: CalendarEventSelectByIDType = {};

                calendarEvents.forEach((event) => {
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
    }),
});

export const {
    useAddEventMutation,
    useGetEventsQuery,
    useDeleteEventMutation,
} = calendarSlice;
