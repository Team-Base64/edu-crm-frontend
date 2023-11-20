import React, { useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
// import styles from './CalendatAddEvent.module.scss';
import Button from '@ui-kit/Button/Button.tsx';
import Text from '@ui-kit/Text/Text.tsx';
import Overlay from '@ui-kit/Overlay/Overlay.tsx';
import { CalendarEventForm } from '@components/CalendarEventForm/CalendarEventForm.tsx';
import { useAddEventMutation } from '@app/features/calendar/calendarSlice.ts';

interface CalendarAddEventProps extends UiComponentProps {}
export const CalendarAddEvent: React.FC<CalendarAddEventProps> = () => {
    const [isAddEventWindowShowing, setAddEventWindowShowing] = useState(false);

    return (
        <>
            <Button
                type={'primary'}
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
                <CalendarEventForm
                    setIsShowingState={setAddEventWindowShowing}
                    useMutation={useAddEventMutation}
                    title={'Создание события'}
                ></CalendarEventForm>
            </Overlay>
        </>
    );
};
