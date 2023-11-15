import React, { useState } from 'react';
import { dateInput } from '@components/AddEventForm/AddEventForm.tsx';
import {
    CalendarEventType,
    eventMutationsType,
} from '@app/features/calendar/calendarModel.ts';
import { useGetClassesQuery } from '@app/features/class/classSlice.ts';

export default function useAddEvent(
    setIsShowingState: React.Dispatch<React.SetStateAction<boolean>>,
    sendEvent: ReturnType<eventMutationsType>[0],
    event: CalendarEventType,
) {
    const [title, setTitle] = useState(event?.title);
    const [startDate, setStartDate] = useState<dateInput>();
    const [startTime, setStartTime] = useState<dateInput>();
    const [endDate, setEndDate] = useState<dateInput>();
    const [endTime, setEndTime] = useState<dateInput>();
    const [description, setDescription] = useState(event?.description);

    const { data } = useGetClassesQuery(null);
    const classData = new Map<string, number>();
    data?.classes.forEach((classItem) => {
        classData.set(classItem.title, classItem.id);
    });

    const [selectedClass, setSelectedClass] = useState<number>(event?.id);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (startDate && startTime && endDate && endTime) {
            startDate.setHours(startTime.getHours());
            startDate.setMinutes(startTime.getMinutes());
            endDate.setHours(endTime.getHours());
            endDate.setMinutes(endTime.getMinutes());
            console.log('selectedClass', selectedClass);
            sendEvent({
                title,
                description,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                classid: selectedClass ?? -1,
            })
                .then(() => {
                    setTitle('');
                    setStartDate(null);
                    setStartTime(null);
                    setEndDate(null);
                    setEndTime(null);
                    setDescription('');
                    setIsShowingState(false);
                })
                .catch((error) => console.error(error));
        }
    };

    return {
        useTitle: { title, setTitle },
        useStartDate: { startDate, setStartDate },
        useStartTime: { startTime, setStartTime },
        useEndDate: { endDate, setEndDate },
        useEndTime: { endTime, setEndTime },
        useDescription: { description, setDescription },
        useSelectedClass: { selectedClass, setSelectedClass },
        classData,
        handleSubmit,
    };
}
