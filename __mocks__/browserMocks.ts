import { setupWorker } from 'msw/browser';
import { chatHandlers } from './mswMocks/chatMocks.ts';
import { generalHandlers } from './mswMocks/generalMocks.ts';
import { classHandlers } from './mswMocks/classMocks.ts';

const handlers = [...chatHandlers, ...generalHandlers, ...classHandlers];
export const worker = setupWorker(...handlers);
