import React, { Suspense } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import styles from './Calendar.module.scss';
import Spinner from '@ui-kit/Spinner/Spinner.tsx';
import { useGetCalendarIDQuery } from '@app/features/calendar/calendarSlice.ts';
import Text from '@ui-kit/Text/Text.tsx';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';

interface CalendarProps extends UiComponentProps {
    mode: 'WEEK' | 'MONTH';
    iframeRef: React.RefObject<HTMLIFrameElement>;
}

export const MyCalendar: React.FC<CalendarProps> = ({
    classes,
    mode,
    iframeRef,
}) => {
    const timeZone = 'Europe%2FMoscow';
    const showTimeZone = '1';
    const { data, isSuccess } = useGetCalendarIDQuery(null);

    const API_ID =
        // 'a7710d0da9bee0635aa37debf678be1295ad61bbaeff1c7248052b65deb7d91b@group.calendar.google.com';
        '611a7b115cb31d14e41c9909e07db425548dd3b5fa76a145f3c93ae7410bc142@group.calendar.google.com';

    return (
        <Suspense
            fallback={
                <div className={[styles.calendar, classes].join(' ')}>
                    {}
                    <Spinner></Spinner>
                </div>
            }
        >
            {API_ID ? (
                <div className={[styles.calendar, classes].join(' ')}>
                    <FullCalendar
                        plugins={[dayGridPlugin, googleCalendarPlugin]}
                        initialView="dayGridMonth"
                        googleCalendarApiKey={import.meta.env.VITE_API_GOOGLE}
                        events={[{ googleCalendarId: API_ID }]}
                        height={'100%'}
                        expandRows={true}
                    />
                </div>
            ) : (
                <Text
                    type={'h'}
                    size={3}
                    classes={[
                        styles.calendar,
                        styles.calendarErrorId,
                        classes,
                    ].join(' ')}
                >
                    Ошибка при загрузке календаря
                </Text>
            )}
        </Suspense>
    );
};
