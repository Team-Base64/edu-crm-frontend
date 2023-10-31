import { IconName } from "@ui-kit/Icon/Icon"

type SidebarItem = {
    title: string;
    iconName: IconName;
    path: string;
}

type SidebarGroup = SidebarItem[];

type SidebarConfig = SidebarGroup[];

const config: SidebarConfig = [
    [
        {
            title: 'Главная',
            iconName: 'homeLine',
            path: '/home'
        },
        {
            title: 'Календарь',
            iconName: 'calendarLine',
            path: '/sheduler'
        },
        {
            title: 'Классы',
            iconName: 'layoutLine',
            path: '/classes'
        },
        {
            title: 'Сообщения',
            iconName: 'chatLine',
            path: '/messenger'
        },
        {
            title: 'Настройки',
            iconName: 'settingsLine',
            path: '/settings'
        },
        {
            title: 'Тестовая',
            iconName: 'settingsLine',
            path: '/test'
        },
    ],
    [
        {
            title: 'Выйти',
            iconName: 'logoutLine',
            path: '/login'
        },
    ],
];

export default config;