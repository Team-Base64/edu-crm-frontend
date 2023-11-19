export type Teacher = {
    id: number;
    name: string;
    username: string;
};

export type TeacherLoginPayload = {
    username: string;
    password: string; // TODO crypt
};

export type TeacherRegisterPayload = {
    name: string;
    username: string;
    password: string;
};
