import React, { Suspense, useRef } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import styles from './Calendar.module.scss';
import Spinner from '@ui-kit/Spinner/Spinner.tsx';
// import { useGetCalendarIDQuery } from '@app/features/calendar/calendarSlice.ts';
import Text from '@ui-kit/Text/Text.tsx';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Calendar } from '@fullcalendar/core';

interface CalendarProps extends UiComponentProps {
    viewMode: viewModeType;
    iframeRef: React.RefObject<HTMLIFrameElement>;
}

const ViewMode = {
    week: 'timeGridWeek',
    month: 'dayGridMonth',
};

type viewModeType = keyof typeof ViewMode;

export const MyCalendar: React.FC<CalendarProps> = ({
    classes,
    viewMode,
    // iframeRef,
}) => {
    // const { data } = useGetCalendarIDQuery(null);
    const isSuccess = true;

    const calendarRef = useRef<HTMLDivElement>(null);

    if (calendarRef.current && isSuccess) {
        const shadowBase = document.createElement('div');
        const shadowInner = document.createElement('main');
        const shadowElement = shadowBase.attachShadow({
            mode: 'closed',
        });
        shadowElement.appendChild(shadowInner);
        shadowInner.classList.add(styles.calendarShadowDom);

        calendarRef.current.innerHTML = '';
        calendarRef.current.appendChild(shadowBase);

        const calendar = new Calendar(shadowInner, {
            plugins: [dayGridPlugin, timeGridPlugin, googleCalendarPlugin],
            locale: 'ru',
            firstDay: 1,
            initialView: ViewMode[viewMode],
            googleCalendarApiKey: import.meta.env.VITE_API_GOOGLE,
            events: {
                // googleCalendarId: data.googleid,
                googleCalendarId: import.meta.env
                    .VITE_CALENDAR_GOOGLE_SAMPLE_TOKEN,
            },
            height: '100%',
            expandRows: true,
            eventColor: 'var(--ui-kit-btn-secondary-border-color-default)',
            eventTextColor: 'var(--color-bg-default)',
            buttonText: {
                today: 'сегодня',
                allDay: 'весь день',
            },
            slotDuration: '02:00',
        });
        calendar.render();
    }

    return (
        <Suspense
            fallback={
                <div className={[styles.calendar, classes].join(' ')}>
                    {}
                    <Spinner></Spinner>
                </div>
            }
        >
            {isSuccess ? (
                <div
                    className={[styles.calendar, classes].join(' ')}
                    ref={calendarRef}
                ></div>
            ) : (
                <Text
                    type={'h'}
                    size={3}
                    classes={[styles.calendarErrorId, classes].join(' ')}
                >
                    Ошибка при загрузке календаря
                </Text>
            )}
        </Suspense>
    );
};
