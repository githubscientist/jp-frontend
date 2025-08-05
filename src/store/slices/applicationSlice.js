import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    applications: [],
    application: null,
    loading: false,
    error: null,
    stats: {
        total: 0,
        pending: 0,
        reviewed: 0,
        shortlisted: 0,
        interviewed: 0,
        hired: 0,
        rejected: 0,
    },
};

const applicationSlice = createSlice({
    name: 'applications',
    initialState,
    reducers: {
        applicationsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        applicationsSuccess: (state, action) => {
            state.loading = false;
            state.applications = action.payload.applications;
            if (action.payload.stats) {
                state.stats = action.payload.stats;
            }
            state.error = null;
        },
        applicationsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        applicationStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        applicationSuccess: (state, action) => {
            state.loading = false;
            state.application = action.payload;
            state.error = null;
        },
        applicationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createApplicationStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        createApplicationSuccess: (state, action) => {
            state.loading = false;
            state.applications.unshift(action.payload);
            state.error = null;
        },
        createApplicationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateApplicationStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateApplicationSuccess: (state, action) => {
            state.loading = false;
            const index = state.applications.findIndex(app => app._id === action.payload._id);
            if (index !== -1) {
                state.applications[index] = action.payload;
            }
            state.application = action.payload;
            state.error = null;
        },
        updateApplicationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteApplicationStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteApplicationSuccess: (state, action) => {
            state.loading = false;
            state.applications = state.applications.filter(app => app._id !== action.payload);
            state.error = null;
        },
        deleteApplicationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    applicationsStart,
    applicationsSuccess,
    applicationsFailure,
    applicationStart,
    applicationSuccess,
    applicationFailure,
    createApplicationStart,
    createApplicationSuccess,
    createApplicationFailure,
    updateApplicationStart,
    updateApplicationSuccess,
    updateApplicationFailure,
    deleteApplicationStart,
    deleteApplicationSuccess,
    deleteApplicationFailure,
    clearError,
} = applicationSlice.actions;

export default applicationSlice.reducer;
