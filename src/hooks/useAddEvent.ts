import { useState } from 'react';
import { dateInput } from '@components/CalendarEventForm/CalendarEventForm.tsx';
import {
    CalendarEventType,
    eventMutationsType,
} from '@app/features/calendar/calendarModel.ts';
import { useGetClassesQuery } from '@app/features/class/classSlice.ts';
import { unselectedId } from '@app/const/consts.ts';

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
        // fix validation
        if (title && startDate && startTime && endDate && endTime) {
            startDate.setHours(startTime.getHours());
            startDate.setMinutes(startTime.getMinutes());
            endDate.setHours(endTime.getHours());
            endDate.setMinutes(endTime.getMinutes());
            sendEvent({
                title,
                description: description ?? '',
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                classid: selectedClassId ?? unselectedId,
            })
                .then(() => {
                    // setTitle('');
                    // setStartDate(new Date());
                    // setStartTime(new Date());
                    // setEndDate(new Date());
                    // setEndTime(new Date());
                    // setDescription('');
                    handleOverlayClose();
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
