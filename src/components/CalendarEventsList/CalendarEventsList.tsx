import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Container from '@ui-kit/Container/Container.tsx';
import {
    useDeleteEventMutation,
    useGetEventsQuery,
} from '@app/features/calendar/calendarSlice.ts';
import { CalendarEvent } from '@components/CalendarEvent/CalendarEvent.tsx';
import styles from './CalendarEventsList.module.scss';
import ShowQueryState from '@components/ShowQueryState/ShowQueryState';

interface CalendarEventsListProps extends UiComponentProps {
    iframeRef: React.RefObject<HTMLIFrameElement>;
}

export const CalendarEventsList: React.FC<CalendarEventsListProps> = ({
    iframeRef,
}) => {
    const { data, isSuccess, ...status } = useGetEventsQuery(null);
    const [deleteEvent] = useDeleteEventMutation();

    return (
        <Container
            direction={'vertical'}
            classes={styles.calendarEventsList}
        >
            <ShowQueryState status={status} />
            {isSuccess &&
                Object.values(data.calendarEvents).map((eventData, index) => (
                    <CalendarEvent
                        eventData={eventData}
                        key={`${eventData.id}-${eventData.classid}-${index}`}
                        onDeleteClick={() => deleteEvent({ id: eventData.id })}
                        iframeRef={iframeRef}
                    />
                ))}
        </Container>
    );
};
