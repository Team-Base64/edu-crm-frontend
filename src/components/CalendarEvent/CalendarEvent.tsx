import React, { useState } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Container from '@ui-kit/Container/Container.tsx';
import Text from '@ui-kit/Text/Text.tsx';
import { CalendarEventType } from '@app/features/calendar/calendarModel.ts';
import Button from '@ui-kit/Button/Button';
import Icon from '@ui-kit/Icon/Icon';
import { CalendarEventForm } from '@components/CalendarEventForm/CalendarEventForm.tsx';
import { useEditEventMutation } from '@app/features/calendar/calendarSlice.ts';
import Overlay from '@ui-kit/Overlay/Overlay.tsx';
import {
    getUTCDate,
    getUTCTime,
} from '../../utils/common/dateRepresentation.ts';

interface CalendarEventProps extends UiComponentProps {
    eventData: CalendarEventType;
    onDeleteClick: () => void;
    iframeRef: React.RefObject<HTMLIFrameElement>;
}

export const CalendarEvent: React.FC<CalendarEventProps> = ({
    eventData,
    onDeleteClick,
    iframeRef,
}) => {
    const handleOverlayClose = () => {
        if (iframeRef.current) {
            iframeRef.current.src += '';
        }
        setEditEventWindowShowing(false);
    };
    const onDelteHandle = () => {
        onDeleteClick();
        handleOverlayClose();
    };

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
                Название: {eventData.title}
            </Text>
            <Text
                type={'p'}
                size={5}
            >
                Описание: {eventData.description}
            </Text>
            <Text
                type={'p'}
                size={5}
            >
                Дата начала:
                {' ' +
                    getUTCDate(new Date(eventData.startDate)) +
                    ' ' +
                    getUTCTime(new Date(eventData.startDate))}
            </Text>
            <Text
                type={'p'}
                size={5}
            >
                Дата окончания:
                {' ' +
                    getUTCDate(new Date(eventData.endDate)) +
                    ' ' +
                    getUTCTime(new Date(eventData.endDate))}
            </Text>
            <Button
                type={'secondary'}
                onClick={() => setEditEventWindowShowing(true)}
            >
                <Icon
                    size={'small'}
                    name={'pencilLine'}
                />
                <Text
                    type={'p'}
                    size={5}
                >
                    Изменить событие
                </Text>
            </Button>
            <Button
                type={'link'}
                onClick={onDelteHandle}
            >
                <Icon
                    size={'small'}
                    name={'deleteBinLine'}
                />
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
                <CalendarEventForm
                    useMutation={useEditEventMutation}
                    eventData={eventData}
                    onSuccess={handleOverlayClose}
                    onClose={handleOverlayClose}
                />
            </Overlay>
        </Container>
    );
};
