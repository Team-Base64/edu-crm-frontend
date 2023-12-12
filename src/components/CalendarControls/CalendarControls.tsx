import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import styles from './CalendarControls.module.scss';
import Container from '@ui-kit/Container/Container.tsx';
import { CalendarAddEvent } from '@components/CalendatAddEvent/CalendatAddEvent.tsx';
import { CalendarEventsList } from '@components/CalendarEventsList/CalendarEventsList.tsx';

interface CalendarControlsProps extends UiComponentProps {
    iframeRef: React.RefObject<HTMLIFrameElement>;
    classID?: number;
}

export const CalendarControls: React.FC<CalendarControlsProps> = ({
    classes,
    iframeRef,
    classID,
}) => {
    return (
        <Container
            layout={'defaultBase'}
            classes={[classes].join(' ')}
            direction={'vertical'}
        >
            <CalendarAddEvent iframeRef={iframeRef} />
            <CalendarEventsList
                iframeRef={iframeRef}
                classID={classID}
            />
        </Container>
    );
};
