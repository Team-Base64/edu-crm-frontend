import { http, passthrough } from 'msw';

export const generalHandlers = [
    http.get('https://fonts.gstatic.com/*', () => passthrough()),

    http.get('/src/*', () => passthrough()),
];
