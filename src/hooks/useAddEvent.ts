import { useState } from 'react';
import {
    CalendarEventType,
    eventMutationsType,
} from '@app/features/calendar/calendarModel.ts';
import { useGetClassesQuery } from '@app/features/class/classSlice.ts';
import { unselectedId } from '@app/const/consts.ts';
import { dateInput, setTime } from '../utils/common/dateRepresentation.ts';

export default function useAddEvent(
    handleOverlayClose: () => void,
    sendEvent: ReturnType<eventMutationsType>[0],
    event: CalendarEventType | null,
) {
    const getInitialDate = (
        event: CalendarEventType | null,
        param: 'startDate' | 'endDate',
    ) => {
        if (event) {
            return new Date(event[param]);
        }
        return null;
    };

    const [title, setTitle] = useState(event?.title);
    const [startDate, setStartDate] = useState<dateInput>(
        getInitialDate(event, 'startDate'),
    );
    const [startTime, setStartTime] = useState<dateInput>(
        getInitialDate(event, 'startDate'),
    );
    const [endDate, setEndDate] = useState<dateInput>(
        getInitialDate(event, 'endDate'),
    );
    const [endTime, setEndTime] = useState<dateInput>(
        getInitialDate(event, 'endDate'),
    );
    const [description, setDescription] = useState(event?.description);

    const { data } = useGetClassesQuery(null);
    const classData = new Map<string, number>();
    data?.classes.forEach((classItem) => {
        classData.set(classItem.title, classItem.id);
    });

    const [selectedClassId, setSelectedClass] = useState<number>(
        event?.classid ?? unselectedId,
    );

    const handleSubmit = () => {
        if (title && startDate && startTime && endDate && endTime) {
            sendEvent({
                title,
                description: description ?? '',
                startDate: setTime(startDate, startTime).toISOString(),
                endDate: setTime(endDate, endTime).toISOString(),
                classid: selectedClassId ?? unselectedId,
                id: event?.id ?? '',
            })
                .then((response) => {
                    if ('error' in response) {
                        throw Error(response.error.toString());
                    } else {
                        handleOverlayClose();
                    }
                })
                .catch((error) => console.error(error));
        }
    };

    return {
        useTitle: { title, setTitle },
        useStartDate: { date: startDate, setDate: setStartDate },
        useStartTime: { time: startTime, setTime: setStartTime },
        useEndDate: { date: endDate, setDate: setEndDate },
        useEndTime: { time: endTime, setTime: setEndTime },
        useDescription: { description, setDescription },
        useSelectedClass: {
            selected: selectedClassId,
            setSelected: setSelectedClass,
        },
        classData,
        handleSubmit,
    };
}
