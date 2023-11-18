import { http, HttpResponse } from 'msw';
import appPaths from '../../src/app/appPaths';
import { defaultHeadersMock } from '../const/constMocks';
import { tasksMock } from '../const/taskConstMocks';

export const taskHandlers = [
    // create task 
    http.post(`${appPaths.basePath}${appPaths.createTask}`, async () => {
        console.log('CREATE TASK');
        try {
            return HttpResponse.json(
            {
               id: 100,
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
        ({params}) => {
            const {id} = params;
            try {
                return HttpResponse.json(
                    {
                       ...tasksMock[Number(id) - 1],
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
