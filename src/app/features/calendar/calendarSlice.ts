import appApi from '@app/appApi';
import { calendarPaths } from '@app/features/calendar/calendarPaths.ts';
import { CalendarEvent } from '@app/features/calendar/calendarModel.ts';
import appPaths from '@app/appPaths';

export const calendarSlice = appApi.injectEndpoints({
    endpoints: (build) => ({
        addEvent: build.mutation<unknown, CalendarEvent>({
            query: (eventData) => {
                return {
                    url: `${appPaths.basePath}${calendarPaths.addEvent}`,
                    method: 'POST',
                    body: eventData,
                };
            },
        }),
    }),
});

export const { useAddEventMutation } = calendarSlice;
