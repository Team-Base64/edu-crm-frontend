import asStrings from '@helpers/AsStrings';

const AppRoutes = asStrings({
    base: '/',
    none: '*',

    test: 'test',

    calendar: 'calendar',
    classes: 'class',
    class: ':id',
    messenger: 'messenger',
    settings: 'settings',
    tasks: 'tasks',
    homeworks: 'homeworks',
    homework: ':id',
    solutions: 'solutions',
    solution: ':id',

    login: 'login',
    signup: 'signup',
    logout: 'logout',
});

export const routerQueryParams = {
    messenger: {
        chatid: 'chatid',
        search: 'search',
    },
};

export default AppRoutes;
