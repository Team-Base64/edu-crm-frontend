import { useAddEventMutation } from '@app/features/calendar/calendarSlice.ts';

export type CalendarEventType = {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    id: number;
    classid: number;
};

export interface CalendarEventSelectByIDType {
    [index: number]: CalendarEventType;
}

export type CalendarEventDeleteType = { id: CalendarEventType['id'] };

export type eventMutationsType = typeof useAddEventMutation;
