import { useAddEventMutation } from '@app/features/calendar/calendarSlice.ts';

export type CalendarCreateEventType = {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    classid: number;
    id: string;
};

export interface CalendarEventType extends CalendarCreateEventType {}

export interface CalendarEventSelectByIDType {
    [index: string]: CalendarEventType;
}

export type CalendarEventDeleteType = { id: CalendarEventType['id'] };

export type eventMutationsType = typeof useAddEventMutation;

export type calendarGetID = {
    googleid: string;
    id: number;
};
