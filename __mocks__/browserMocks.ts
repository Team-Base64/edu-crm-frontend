import { setupWorker } from 'msw/browser';
import { chatHandlers } from './mswMocks/chatMocks.ts';
import { generalHandlers } from './mswMocks/generalMocks.ts';

const handlers = [...chatHandlers, ...generalHandlers];
export const worker = setupWorker(...handlers);
