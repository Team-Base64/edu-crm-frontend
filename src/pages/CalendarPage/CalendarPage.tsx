import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import styles from './CalendarPage.module.scss';
import { MyCalendar } from '@components/Calendar/Calendar.tsx';
import { CalendarControls } from '@components/CalendarControls/CalendarControls.tsx';
import Container from '@ui-kit/Container/Container.tsx';

interface CalendarPageProps extends UiComponentProps {}

export const CalendarPage: React.FC<CalendarPageProps> = () => {
    return (
        <Container
            // direction={'grid'}
            // classes={styles.calendarPage}
            classes={styles.page}
        >
            <MyCalendar
                // classes={styles.calendarPageCalendar}
                viewMode={'month'}
                classes={styles.calendar}
            />
            <CalendarControls
                // classes={styles.calendarPageControls}
                classes={styles.controls}
            />
        </Container>
    );
};
