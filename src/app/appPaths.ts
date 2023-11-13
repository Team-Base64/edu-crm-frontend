import { dialogPaths } from '@app/features/dialog/dialogPaths';
import { classPaths } from '@app/features/class/classPaths';
import { homeworkPaths } from '@app/features/homework/homeworkPaths';
import { announcementPaths } from '@app/features/announcement/announcementPaths';
import { homeworkSolutionPaths } from '@app/features/homeworkSolution/homeworkSolutionPaths';
import { studentPaths } from '@app/features/stundent/studentPaths';
import { chatPaths } from '@app/features/chat/chatPaths';
import { teacherPaths } from '@app/features/teacher/teacherPaths';

const appPaths = {
    basePath: import.meta.env.VITE_BASE_PATH,
    baseChatPath: import.meta.env.VITE_BASE_CHAT_PATH,
    ...classPaths,
    ...homeworkPaths,
    ...announcementPaths,
    ...homeworkSolutionPaths,
    ...dialogPaths,
    ...studentPaths,
    ...dialogPaths,
    ...chatPaths,
    ...teacherPaths,
};

export default appPaths;
