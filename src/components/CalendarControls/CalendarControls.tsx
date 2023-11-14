import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
// import styles from './CalendarControls.moduke.scss';
import Container from '@ui-kit/Container/Container.tsx';
import { CalendarAddEvent } from '@components/CalendatAddEvent/CalendatAddEvent.tsx';

interface CalendarControlsProps extends UiComponentProps {
    calendarRef: React.RefObject<HTMLIFrameElement>;
}

export const CalendarControls: React.FC<CalendarControlsProps> = ({
    classes,
    calendarRef,
}) => {
    return (
        <Container
            layout={'defaultBase'}
            classes={classes}
            direction={'vertical'}
        >
            <CalendarAddEvent calendarRef={calendarRef}></CalendarAddEvent>
        </Container>
    );
};