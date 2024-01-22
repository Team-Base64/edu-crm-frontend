# Репозиторий с Frontend'ом сервиса EDUCRM 

Основной интерфейс взаимодействия с сервисом со стороны преподавателя. Включает в себя функционал создания классов, домашних работ, задач (для составления домашних работ), проверки решений от ученика, создания событий в календаре, агрегации сообщений от учеников из ВК и Телеграм.

![Дизайн прототипа в Figma](https://www.figma.com/file/sYWJPNGU1cwaTyXqrHD3eB/Edu-CRM-design?type=design&node-id=1%3A8&mode=design&t=KLBxUxyKEynH3sju-1)

### Основные команды

`npm ci` - Установка зависимостей проекта

`npm start` - Запуск в Production режиме

`npm run lint[:fix]` - Запуск ESLint

`npm run start:mock` - Запуск в Debug режиме
> `npm run init:msw` - Создание Mock Service Worker для локальной отладки без бэкэнда \
> `npm run start:socketMock` - Запуск фейкового вебсокета 

### Переменные окружения

`VITE_WEBSOCKET_PATH` - URL Api для работы по Websocket

`VITE_API_GOOGLE` - токен для работы с Google Calendar

#### Только для Debug

`VITE_CALENDAR_GOOGLE_SAMPLE_TOKEN` - токен сэмпла Google календаря

`NODE_ENV=mock` - флаг запуска в режиме отладки

---

> Коммит со строкой `[DEPLOY]` в сообщении вызовет workflow для деплоя на сервер.