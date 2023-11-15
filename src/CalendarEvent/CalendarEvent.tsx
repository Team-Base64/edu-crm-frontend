import React, { useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Container from '@ui-kit/Container/Container.tsx';
import Text from '@ui-kit/Text/Text.tsx';
import { CalendarEventType } from '@app/features/calendar/calendarModel.ts';
import Button from '@ui-kit/Button/Button';
import Icon from '@ui-kit/Icon/Icon';
import { AddEventForm } from '@components/AddEventForm/AddEventForm.tsx';
import { useEditEventMutation } from '@app/features/calendar/calendarSlice.ts';
import Overlay from '@ui-kit/Overlay/Overlay.tsx';

interface CalendarEventProps extends UiComponentProps {
    event: CalendarEventType;
    onDeleteClick: () => void;
}

export const CalendarEvent: React.FC<CalendarEventProps> = ({
    event,
    onDeleteClick,
}) => {
    const [isAddEventWindowShowing, setAddEventWindowShowing] = useState(false);
    return (
        <Container
            direction={'grid'}
            layout={'sub'}
        >
            <Text
                type={'p'}
                size={5}
            >
                {event.title}
            </Text>
            <Text
                type={'p'}
                size={5}
            >
                {event.description}
            </Text>
            <Text
                type={'p'}
                size={5}
            >
                {event.startDate}
            </Text>
            <Text
                type={'p'}
                size={5}
            >
                {event.endDate}
            </Text>
            <Button
                type={'secondary'}
                onClick={() => setAddEventWindowShowing(true)}
            >
                <Icon
                    size={'small'}
                    name={'deleteBinLine'}
                ></Icon>
                <Text
                    type={'p'}
                    size={5}
                >
                    Изменить событие
                </Text>
            </Button>
            <Button
                type={'link'}
                onClick={onDeleteClick}
            >
                <Icon
                    size={'small'}
                    name={'deleteBinLine'}
                ></Icon>
                <Text
                    type={'p'}
                    size={5}
                >
                    Удалить событие
                </Text>
            </Button>
            <Overlay
                isShowing={isAddEventWindowShowing}
                closeOverlay={() => setAddEventWindowShowing(false)}
            >
                <AddEventForm
                    setIsShowingState={setAddEventWindowShowing}
                    useMutation={useEditEventMutation}
                    event={event}
                ></AddEventForm>
            </Overlay>
        </Container>
    );
};
