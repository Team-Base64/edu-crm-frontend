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

    login: 'login',
    signup: 'signup',
    logout: 'logout',
});

export const routerQueryParams = {
    messenger: {
        chatid: 'chatid',
    },
};

export default AppRoutes;
