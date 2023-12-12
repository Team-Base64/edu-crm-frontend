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
import styles from './CalendarEvent.module.scss';
import getDate from 'utils/common/PrettyDate/common/date.ts';
import getTime from 'utils/common/PrettyDate/common/time.ts';
import { getDelta } from 'utils/common/PrettyDate/common/delta.ts';

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

    const durationDate = new Date(getDelta(eventData.startDate, eventData.endDate));
    const duration =
        (durationDate.getHours() < 10 ? '0' : '')
        +
        durationDate.getHours()
        +
        ':'
        +
        (durationDate.getMinutes() < 10 ? '0' : '')
        +
        durationDate.getMinutes()
        ;

    return (
        <Container
            direction={'grid'}
            layout='defaultBase'
            classes={styles.item}
        >
            <Container
                direction={'grid'}
                classes={styles.main}
            >
                <Text
                    type='h'
                    size={4}
                    weight='bold'
                    classes={styles.title}
                >
                    Название:
                </Text>
                <Text
                    type='p'
                    size={1}
                    classes={styles.content}
                >
                    {eventData.title}
                </Text>
                <Text
                    type='h'
                    size={4}
                    weight='bold'
                    classes={styles.title}
                >
                    Описание:
                </Text>
                <Text
                    type='p'
                    size={1}
                    classes={styles.content}
                >
                    {eventData.description}
                </Text>
                <Text
                    type='h'
                    size={4}
                    weight='bold'
                    classes={styles.title}
                >
                    Дата начала:
                </Text>
                <Text
                    type='p'
                    size={1}
                    classes={styles.content}
                >
                    {
                        [getDate(eventData.startDate), getTime(eventData.startDate)].join(' ')
                    }
                </Text>
                <Text
                    type='h'
                    size={4}
                    weight='bold'
                    classes={styles.title}
                >
                    Продолжительность:
                </Text>
                <Text
                    type='p'
                    size={1}
                    classes={styles.content}
                >
                    {duration}
                </Text>
            </Container>
            <Container
                classes={styles.controls}
                direction='grid'
            >
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
                        size={1}
                    >
                        Изменить
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
                        size={1}

                    >
                        Удалить
                    </Text>
                </Button>
            </Container>
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
