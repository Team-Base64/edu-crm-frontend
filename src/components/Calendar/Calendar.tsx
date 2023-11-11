import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import styles from './Calendar.module.scss';

interface CalendarProps extends UiComponentProps {
    calendarRef: React.RefObject<HTMLIFrameElement>;
}

export const Calendar: React.FC<CalendarProps> = ({ classes, calendarRef }) => {
    const timeZone = 'Europe%2FMoscow';
    const showTimeZone = '1';
    const src =
        // 'a7710d0da9bee0635aa37debf678be1295ad61bbaeff1c7248052b65deb7d91b@group.calendar.google.com';
        '611a7b115cb31d14e41c9909e07db425548dd3b5fa76a145f3c93ae7410bc142@group.calendar.google.com';

    // mode=AGENDA
    return (
        <iframe
            src={`https://calendar.google.com/calendar/embed?ctz=${timeZone}&hl=ru&showTz=${showTimeZone}&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&src=${src}`}
            className={[styles.calendar, classes].join(' ')}
            ref={calendarRef}
        ></iframe>
    );
};
