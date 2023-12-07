export type Teacher = {
    id: number;
    name: string;
    login: string;
};

export type TeacherLoginPayload = {
    login: string;
    password: string; // TODO crypt
};

export type TeacherRegisterPayload = {
    name: string;
    login: string;
    password: string;
};
