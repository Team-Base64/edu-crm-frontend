import { setupWorker } from 'msw/browser';
import { chatHandlers } from './mswMocks/chatMocks.ts';
import { generalHandlers } from './mswMocks/generalMocks.ts';
import { classHandlers } from './mswMocks/classMocks.ts';
import { studentHandlers } from './mswMocks/studentMocks.ts';
import { homeworkHandlers } from './mswMocks/homeworkMoks.ts';
import { teacherHandlers } from './mswMocks/teacherMocks';
const handlers = [
    ...chatHandlers,
    ...generalHandlers,
    ...classHandlers,
    ...studentHandlers,
    ...homeworkHandlers,
    ...teacherHandlers,
];
export const worker = setupWorker(...handlers);
