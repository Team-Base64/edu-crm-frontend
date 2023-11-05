import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Teacher } from '@app/features/teacher/teacherModel';

interface ITeacherState {
    me: Teacher | null;
}

const initialState: ITeacherState = {
    me: null,
};

export const teacherSlice = createSlice({
    initialState,
    name: 'teacherSlice',
    reducers: {
        logout: () => initialState,
        setMe: (state, action: PayloadAction<Teacher>) => {
            state.me = action.payload;
        },
    },
});

export const { logout, setMe } = teacherSlice.actions;
