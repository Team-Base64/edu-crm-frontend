import React, { useRef } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import styles from './CalendarPage.module.scss';
import { Calendar } from '@components/Calendar/Calendar.tsx';
import { CalendarControls } from '@components/CalendarControls/CalendarControls.tsx';
import Container from '@ui-kit/Container/Container.tsx';

interface CalendarPageProps extends UiComponentProps {}

export const CalendarPage: React.FC<CalendarPageProps> = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    return (
        <Container
            direction={'grid'}
            classes={styles.calendarPage}
        >
            <Calendar
                classes={styles.calendarPageCalendar}
                mode={'MONTH'}
                iframeRef={iframeRef}
            ></Calendar>
            <CalendarControls
                classes={styles.calendarPageControls}
                iframeRef={iframeRef}
            ></CalendarControls>
        </Container>
    );
};
