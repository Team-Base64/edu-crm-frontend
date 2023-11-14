import React, { useRef } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import styles from './CalendarPage.module.scss';
import { Calendar } from '@components/Calendar/Calendar.tsx';
import { CalendarControls } from '@components/CalendarControls/CalendarControls.tsx';
import Container from '@ui-kit/Container/Container.tsx';
// import Container from '@ui-kit/Container/Container.tsx';

interface CalendarPageProps extends UiComponentProps {}

export const CalendarPage: React.FC<CalendarPageProps> = () => {
    const calendarRef = useRef<HTMLIFrameElement>(null);
    return (
        <Container
            direction={'grid'}
            classes={styles.calendarPage}
        >
            <Calendar classes={styles.calendarPageCalendar}></Calendar>
            <CalendarControls
                classes={styles.calendarPageControls}
            ></CalendarControls>
        </Container>
    );
};
