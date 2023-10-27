import { setupWorker } from 'msw/browser';
import { chatHandlers } from './mswMocks/chatMocks.ts';

const handlers = [...chatHandlers];
export const worker = setupWorker(...handlers);
