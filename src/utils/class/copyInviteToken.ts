export const copyInviteToken = (teacherName : string, classTitle: string, token: string) => {
    navigator.clipboard.writeText(
        `<Учитель имя> приглашает вас в класс '${classTitle}'
        
        Для подключения:

        1) Напишите /start боту:
        \t\tВконтакте: https://vk.com/im?sel=-222976710
        \t\tТелеграмм: https://t.me/educrmmaster2bot
        2) Отправьте ему токен:
        \t\t${token}`
    );
}