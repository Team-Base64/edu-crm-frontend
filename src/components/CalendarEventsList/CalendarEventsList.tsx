import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Container from '@ui-kit/Container/Container.tsx';
import {
    useDeleteEventMutation,
    useGetEventsQuery,
} from '@app/features/calendar/calendarSlice.ts';
import { CalendarEvent } from '../../CalendarEvent/CalendarEvent.tsx';
import { CalendarEventType } from '@app/features/calendar/calendarModel.ts';
import styles from './CalendarEventsList.module.scss';

interface CalendarEventsListProps extends UiComponentProps {}

export const CalendarEventsList: React.FC<CalendarEventsListProps> = () => {
    const { data } = useGetEventsQuery(null);
    const [deleteEvent] = useDeleteEventMutation();

    const calendarEvents = Object.values(data?.calendarEvents ?? {}).map(
        (eventData: CalendarEventType, index: number) => (
            <CalendarEvent
                eventData={eventData}
                key={`${eventData.id}-${eventData.classid}-${index}`}
                onDeleteClick={() => deleteEvent({ id: eventData.id })}
            ></CalendarEvent>
        ),
    );

    return (
        <Container
            direction={'vertical'}
            classes={styles.calendarEventsList}
        >
            {calendarEvents}
        </Container>
    );
};
