import asStrings from '@helpers/AsStrings';

const AppRoutes = asStrings({
    base: '/',
    none: '*',
    page404: 'page_not_found',

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
    register: 'register',
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
