import React, { useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import styles from './CalendatAddEvent.module.scss';
import Button from '@ui-kit/Button/Button.tsx';
import Text from '@ui-kit/Text/Text.tsx';
import Overlay from '@ui-kit/Overlay/Overlay.tsx';

import { CalendarEventForm } from '@components/CalendarEventForm/CalendarEventForm.tsx';
import { useAddEventMutation } from '@app/features/calendar/calendarSlice.ts';
import Icon from '@ui-kit/Icon/Icon';

interface CalendarAddEventProps extends UiComponentProps {}
export const CalendarAddEvent: React.FC<CalendarAddEventProps> = ({}) => {
    const [isAddEventWindowShowing, setAddEventWindowShowing] = useState(false);

    const handleOverlayClose = () => {
        setAddEventWindowShowing(false);
    };

    return (
        <>
            <Button
                type={'primary'}
                onClick={() => setAddEventWindowShowing(true)}
                classes={styles.btn}
            >
                <Icon
                    name="addLine"
                    classes={styles.icon}
                />
                <Text
                    type={'p'}
                    size={1}
                    weight="bold"
                    classes={styles.text}
                >
                    Добавить занятие
                </Text>
            </Button>
            <Overlay
                isShowing={isAddEventWindowShowing}
                closeOverlay={() => setAddEventWindowShowing(false)}
            >
                <CalendarEventForm
                    useMutation={useAddEventMutation}
                    onSuccess={handleOverlayClose}
                    onClose={handleOverlayClose}
                />
            </Overlay>
        </>
    );
};
