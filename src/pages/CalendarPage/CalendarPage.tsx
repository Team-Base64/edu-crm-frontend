import React, { useRef } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import styles from './CalendarPage.module.scss';
import { MyCalendar } from '@components/Calendar/Calendar.tsx';
import { CalendarControls } from '@components/CalendarControls/CalendarControls.tsx';
import Container from '@ui-kit/Container/Container.tsx';

interface CalendarPageProps extends UiComponentProps {}

export const CalendarPage: React.FC<CalendarPageProps> = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    return (
        <Container
            // direction={'grid'}
            // classes={styles.calendarPage}
            classes={styles.page}
        >
            <MyCalendar
                // classes={styles.calendarPageCalendar}
                viewMode={'month'}
                iframeRef={iframeRef}
                classes={styles.calendar}
            />
            <CalendarControls
                // classes={styles.calendarPageControls}
                iframeRef={iframeRef}
                classes={styles.controls}
            />
        </Container>
    );
};
