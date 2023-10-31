import asStrings from '@helpers/AsStrings';

const AppRoutes = asStrings({
    base: '/',
    none: '*',

    test: 'test',

    calendar: 'calendar',
    classes: 'class',
    messenger: 'messenger',
    settings: 'settings',

    login: 'login',
    signup: 'signup',
    logout: 'logout',
});

export default AppRoutes;
