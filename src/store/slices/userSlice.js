import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    user: null,
    loading: false,
    error: null,
    stats: {
        totalUsers: 0,
        jobSeekers: 0,
        employers: 0,
        admins: 0,
    },
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        usersSuccess: (state, action) => {
            state.loading = false;
            state.users = action.payload.users;
            if (action.payload.stats) {
                state.stats = action.payload.stats;
            }
            state.error = null;
        },
        usersFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        userStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        userSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        },
        userFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateUserSuccess: (state, action) => {
            state.loading = false;
            const index = state.users.findIndex(user => user._id === action.payload._id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
            state.user = action.payload;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteUserSuccess: (state, action) => {
            state.loading = false;
            state.users = state.users.filter(user => user._id !== action.payload);
            state.error = null;
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    usersStart,
    usersSuccess,
    usersFailure,
    userStart,
    userSuccess,
    userFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    clearError,
} = userSlice.actions;

export default userSlice.reducer;
