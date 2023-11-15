import React, { useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
// import styles from './CalendatAddEvent.module.scss';
import Button from '@ui-kit/Button/Button.tsx';
import Text from '@ui-kit/Text/Text.tsx';
import Overlay from '@ui-kit/Overlay/Overlay.tsx';
import { AddEventForm } from '@components/AddEventForm/AddEventForm.tsx';
import { useAddEventMutation } from '@app/features/calendar/calendarSlice.ts';

interface CalendarAddEventProps extends UiComponentProps {}
export const CalendarAddEvent: React.FC<CalendarAddEventProps> = () => {
    const [isAddEventWindowShowing, setAddEventWindowShowing] = useState(false);

    const defConst = {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        classid: -1,
        id: -1,
    };

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
                <AddEventForm
                    setIsShowingState={setAddEventWindowShowing}
                    useMutation={useAddEventMutation}
                    event={defConst}
                ></AddEventForm>
            </Overlay>
        </>
    );
};
