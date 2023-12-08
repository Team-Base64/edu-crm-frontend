import { http, passthrough } from 'msw';

export const generalHandlers = [
    http.get('https://fonts.gstatic.com/*', () => passthrough()),
    http.get('https://fonts.googleapis.com/*', () => passthrough()),

    http.get('/src/*', () => passthrough()),
    http.get('https://flirtic.com/media/photos/*', () => passthrough()),
    http.get('https://img.freepik.com/*', () => passthrough()),
    http.get('https://www.googleapis.com/*', () => passthrough()),
];
