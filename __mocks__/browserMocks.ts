import { setupWorker } from 'msw/browser';
import { chatHandlers } from './mswMocks/chatMocks.ts';
import { generalHandlers } from './mswMocks/generalMocks.ts';
import { classHandlers } from './mswMocks/classMocks.ts';
import { studentHandlers } from './mswMocks/studentMocks.ts';
import { homeworkHandlers } from './mswMocks/homeworkMoks.ts';
import { teacherHandlers } from './mswMocks/teacherMocks';
import { taskHandlers } from './mswMocks/taskMocks.ts';
import { solutionsHandlers } from './mswMocks/solutionMocks.ts'
import { calendarHandlers } from './mswMocks/calendatMocks.ts';
import { reviewHandlers } from './mswMocks/reviewMocks.ts';
import { announceHandlers } from './mswMocks/announceMocks.ts';

const handlers = [
    ...chatHandlers,
    ...generalHandlers,
    ...classHandlers,
    ...studentHandlers,
    ...homeworkHandlers,
    ...teacherHandlers,
    ...taskHandlers,
    ...solutionsHandlers,
    ...reviewHandlers,
    ...announceHandlers,

    ...calendarHandlers,
];
export const worker = setupWorker(...handlers);
