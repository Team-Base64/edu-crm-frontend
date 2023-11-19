import { http, HttpResponse } from 'msw';
import appPaths from '../../src/app/appPaths';
import { defaultHeadersMock } from '../const/constMocks';
import { tasksMock } from '../const/taskConstMocks';
import { HomeworkTask, HomeworkTaskCreatePayload } from '@app/features/homeworkTask/homeworkTaskModel';

export const taskHandlers = [
    // create task 
    http.post<any, HomeworkTaskCreatePayload>(`${appPaths.basePath}${appPaths.createTask}`,
        async (info) => {
            try {
                const payload = await info.request.json();

                const tN: HomeworkTask = {
                    ...payload,
                    id: Date.now(),
                }

                tasksMock.push(tN);


                return HttpResponse.json(
                    {
                        id: tN.id,
                    },
                    {
                        status: 200,
                        headers: { ...defaultHeadersMock },
                    }
                );
            }
            catch (e) {

                console.log(e);
                return HttpResponse.json(
                    {},
                    {
                        status: 500,
                        headers: { ...defaultHeadersMock },
                    },
                );
            }
        }),

    // Get tasks
    http.get(
        `${appPaths.basePath}${appPaths.tasks}`,
        () => {
            try {
                return HttpResponse.json(
                    {
                        tasks: tasksMock,
                    },
                    {
                        status: 200,
                        headers: { ...defaultHeadersMock },
                    },
                );
            } catch (e) {
                return HttpResponse.json(
                    {},
                    {
                        status: 404,
                        headers: { ...defaultHeadersMock },
                    },
                );
            }
        },
    ),

    // Get task 
    http.get(
        `${appPaths.basePath}${appPaths.task(':id')}`,
        ({ params }) => {
            const id  = Number(params.id);
            try {
                return HttpResponse.json(
                    {
                        ...tasksMock.filter(i => i.id === id)[0],
                    },
                    {
                        status: 200,
                        headers: { ...defaultHeadersMock },
                    },
                );
            } catch (e) {
                return HttpResponse.json(
                    {},
                    {
                        status: 404,
                        headers: { ...defaultHeadersMock },
                    },
                );
            }
        },
    ),
];
