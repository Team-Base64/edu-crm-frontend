import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
// import styles from './CalendarControls.module.scss';
import Container from '@ui-kit/Container/Container.tsx';
import { CalendarAddEvent } from '@components/CalendatAddEvent/CalendatAddEvent.tsx';
import { CalendarEventsList } from '@components/CalendarEventsList/CalendarEventsList.tsx';

interface CalendarControlsProps extends UiComponentProps {
    classID?: number;
}

export const CalendarControls: React.FC<CalendarControlsProps> = ({
    classes,
    classID,
}) => {
    return (
        <Container
            layout={'defaultBase'}
            classes={[classes].join(' ')}
            direction={'vertical'}
        >
            <CalendarAddEvent />
            <CalendarEventsList classID={classID} />
        </Container>
    );
};
