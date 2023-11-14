import { dialogPaths } from '@app/features/dialog/dialogPaths';
import { classPaths } from '@app/features/class/classPaths';
import { homeworkPaths } from '@app/features/homework/homeworkPaths';
import { announcementPaths } from '@app/features/announcement/announcementPaths';
import { homeworkSolutionPaths } from '@app/features/homeworkSolution/homeworkSolutionPaths';
import { studentPaths } from '@app/features/stundent/studentPaths';
import { chatPaths } from '@app/features/chat/chatPaths';
import { teacherPaths } from '@app/features/teacher/teacherPaths';
import { homeworkTaskPaths } from './features/homeworkTask/homeworkTaskPaths';

const appPaths = {
    origin: 'http://127.0.0.1:8080',
    basePath: `http://127.0.0.1:8080/api/`,
    ...classPaths,
    ...homeworkPaths,
    ...announcementPaths,
    ...homeworkSolutionPaths,
    ...dialogPaths,
    ...studentPaths,
    ...dialogPaths,
    ...chatPaths,
    ...teacherPaths,
    ...homeworkTaskPaths,
};

export default appPaths;
