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
import EmptyItem from '@components/EmptyItem/EmptyItem';

interface CalendarEventsListProps extends UiComponentProps {
    iframeRef: React.RefObject<HTMLIFrameElement>;
    classID?: number;
}

export const CalendarEventsList: React.FC<CalendarEventsListProps> = ({
    iframeRef,
    classID,
}) => {
    const { data, isSuccess, ...status } = useGetEventsQuery(null);
    const [deleteEvent] = useDeleteEventMutation();

    return (
        <Container
            direction={'vertical'}
            classes={styles.calendarEventsList}
        >
            <ShowQueryState status={status} />
            {isSuccess && (
                // Да-да
                (() => {
                    const eventCards: JSX.Element[] = [];
                    Object
                        .values(data.calendarEvents)
                        .forEach((eventData, index) => {
                            if (classID === undefined || (classID === eventData.classid)) {
                                eventCards.push(
                                    <CalendarEvent
                                        eventData={eventData}
                                        key={`${eventData.id}-${eventData.classid}-${index}`}
                                        onDeleteClick={() => deleteEvent({ id: eventData.id })}
                                        iframeRef={iframeRef}
                                    />
                                );
                            }
                        });

                    return eventCards.length ? eventCards : <EmptyItem text='Нет запланированных занятий' />
                })()

            )}
        </Container>
    );
};
