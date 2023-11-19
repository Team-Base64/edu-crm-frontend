import AppRoutes from '@router/routes';
import { IconName } from '@ui-kit/Icon/Icon';

type SidebarItem = {
    title: string;
    iconName: IconName;
    path: string;
    dangerous?: boolean;
};

type SidebarGroup = SidebarItem[];

type SidebarConfig = SidebarGroup[];

const config: SidebarConfig = [
    [
        // {
        //     title: 'Главная',
        //     iconName: 'homeLine',
        //     path: AppRoutes.base,
        // },
        {
            title: 'Календарь',
            iconName: 'calendarLine',
            path: AppRoutes.calendar,
        },
        {
            title: 'Классы',
            iconName: 'layoutLine',
            path: AppRoutes.classes,
        },
        {
            title: 'Сообщения',
            iconName: 'chatLine',
            path: AppRoutes.messenger,
        },

        {
            title: 'Банк задач',
            iconName: 'pencilLine',
            path: AppRoutes.tasks,
        },
        // {
        //     title: 'Настройки',
        //     iconName: 'settingsLine',
        //     path: AppRoutes.settings,
        // },
    ],
    [
        {
            title: 'Выйти',
            iconName: 'logoutLine',
            path: AppRoutes.logout,
            dangerous: true,
        },
    ],
];

export default config;
