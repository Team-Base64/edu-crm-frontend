import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { me: boolean } = {
    me: false,
};

export const teacherSlice = createSlice({
    initialState,
    name: 'teacherSlice',
    reducers: {
        logout: () => initialState,
        setMe: (state, action: PayloadAction<boolean>) => {
            state.me = action.payload;
        },
    },
});

export const { logout, setMe } = teacherSlice.actions;
