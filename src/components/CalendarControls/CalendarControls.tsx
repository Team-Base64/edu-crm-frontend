import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import styles from './CalendarControls.module.scss';
import Container from '@ui-kit/Container/Container.tsx';
import { CalendarAddEvent } from '@components/CalendatAddEvent/CalendatAddEvent.tsx';
import { CalendarEventsList } from '@components/CalendarEventsList/CalendarEventsList.tsx';

interface CalendarControlsProps extends UiComponentProps {
    iframeRef: React.RefObject<HTMLIFrameElement>;
}

export const CalendarControls: React.FC<CalendarControlsProps> = ({
    classes,
    iframeRef,
}) => {
    return (
        <Container
            layout={'defaultBase'}
            classes={[classes, styles.calendarControls].join(' ')}
            direction={'vertical'}
        >
            <CalendarAddEvent iframeRef={iframeRef}></CalendarAddEvent>
            <CalendarEventsList iframeRef={iframeRef}></CalendarEventsList>
        </Container>
    );
};
