import { useAddEventMutation } from '@app/features/calendar/calendarSlice.ts';

export type CalendarCreateEventType = {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    classid: number;
};

export interface CalendarEventType extends CalendarCreateEventType {
    id: number;
}

export interface CalendarEventSelectByIDType {
    [index: number]: CalendarEventType;
}

export type CalendarEventDeleteType = { id: CalendarEventType['id'] };

export type eventMutationsType = typeof useAddEventMutation;

export type calendarGetID = {
    googleid: string;
    id: number;
};
