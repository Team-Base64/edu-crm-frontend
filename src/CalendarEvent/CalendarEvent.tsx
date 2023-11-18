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
import { getUTCDate, getUTCTime } from '../utils/common/dateRepresentation.ts';

interface CalendarEventProps extends UiComponentProps {
    event: CalendarEventType;
    onDeleteClick: () => void;
}

export const CalendarEvent: React.FC<CalendarEventProps> = ({
    event,
    onDeleteClick,
}) => {
    const [isAddEventWindowShowing, setEditEventWindowShowing] =
        useState(false);
    return (
        <Container
            direction={'grid'}
            layout={'sub'}
        >
            <Text
                type={'p'}
                size={5}
            >
                Название: {event.title}
            </Text>
            <Text
                type={'p'}
                size={5}
            >
                Описание: {event.description}
            </Text>
            <Text
                type={'p'}
                size={5}
            >
                Дата начала:
                {' ' +
                    getUTCDate(new Date(event.startDate)) +
                    ' ' +
                    getUTCTime(new Date(event.startDate))}
            </Text>
            <Text
                type={'p'}
                size={5}
            >
                Дата окончания:
                {' ' +
                    getUTCDate(new Date(event.endDate)) +
                    ' ' +
                    getUTCTime(new Date(event.endDate))}
            </Text>
            <Button
                type={'secondary'}
                onClick={() => setEditEventWindowShowing(true)}
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
                closeOverlay={() => setEditEventWindowShowing(false)}
            >
                <AddEventForm
                    setIsShowingState={setEditEventWindowShowing}
                    useMutation={useEditEventMutation}
                    event={event}
                ></AddEventForm>
            </Overlay>
        </Container>
    );
};
