export const VkBotLink = 'https://vk.com/im?sel=-222976710';
export const TgBotLink = 'https://t.me/educrmmaster2bot';

export const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
};

export const tutorialMessage = (
    teacherName: string,
    classTitle: string,
    token: string,
) => {
    return `${teacherName} приглашает вас в класс '${classTitle}'
        
        Для подключения:

        1) Напишите /start боту:
        \t\tВконтакте: ${VkBotLink}
        \t\tТелеграмм: ${TgBotLink}
        2) Отправьте ему токен:
        \t\t${token}`;
};
