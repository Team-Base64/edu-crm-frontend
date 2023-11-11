import React, { useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
// import styles from './CalendatAddEvent.module.scss';
import Button from '@ui-kit/Button/Button.tsx';
import Text from '@ui-kit/Text/Text.tsx';
import Overlay from '@ui-kit/Overlay/Overlay.tsx';
import { AddEvenForm } from '@components/AddEventForm/AddEventForm.tsx';

interface CalendarAddEventProps extends UiComponentProps {}
export const CalendarAddEvent: React.FC<CalendarAddEventProps> = () => {
    const [isAddEventWindowShowing, setAddEventWindowShowing] = useState(false);
    return (
        <>
            <Button
                type={'secondary'}
                // classes={styles.calendarControlsAddEvent}
                onClick={() => setAddEventWindowShowing(true)}
            >
                <Text
                    type={'h'}
                    size={5}
                >
                    Добавить занятие
                </Text>
            </Button>
            <Overlay
                isShowing={isAddEventWindowShowing}
                closeOverlay={() => setAddEventWindowShowing(false)}
            >
                <AddEvenForm
                    setIsShowingState={setAddEventWindowShowing}
                ></AddEvenForm>
            </Overlay>
        </>
    );
};
