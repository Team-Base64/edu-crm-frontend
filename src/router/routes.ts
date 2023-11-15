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

    login: 'login',
    signup: 'signup',
    logout: 'logout',
});

export default AppRoutes;
