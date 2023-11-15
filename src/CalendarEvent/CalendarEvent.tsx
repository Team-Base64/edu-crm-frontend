import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Container from '@ui-kit/Container/Container.tsx';
import Text from '@ui-kit/Text/Text.tsx';
import { CalendarEventType } from '@app/features/calendar/calendarModel.ts';
import Button from '@ui-kit/Button/Button';
import Icon from '@ui-kit/Icon/Icon';

interface CalendarEventProps extends UiComponentProps {
    event: CalendarEventType;
    onDeleteClick: () => void;
}

export const CalendarEvent: React.FC<CalendarEventProps> = ({
    event,
    onDeleteClick,
}) => {
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
            <Button type={'secondary'}>
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
        </Container>
    );
};
