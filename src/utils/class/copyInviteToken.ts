export const VkBotLink = 'https://vk.com/im?sel=-223657144';
export const TgBotLink = 'https://t.me/educrmmaster2bot';

export const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
};

export const tutorialMessage = (
    teacherName: string,
    classTitle: string,
    token: string,
) => {
    return `${teacherName} приглашает вас в класс "${classTitle}"
        
        Для подключения:

        1) Напишите зайдите в бота:
        \t\tа) Вконтакте: ${VkBotLink}
        \t\t\tи нажмите кнопку Начать
        \t\tб) Телеграмм: ${TgBotLink}
        \t\t\tи напишите команду /start
        2) Отправьте ему токен:
        \t\t${token}`;
};
