import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    jobs: [],
    job: null,
    loading: false,
    error: null,
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        pages: 0,
    },
    filters: {
        search: '',
        location: '',
        type: '',
        experience: '',
    },
};

const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        jobsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        jobsSuccess: (state, action) => {
            state.loading = false;
            state.jobs = action.payload.jobs;
            state.pagination = action.payload.pagination;
            state.error = null;
        },
        jobsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        jobStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        jobSuccess: (state, action) => {
            state.loading = false;
            state.job = action.payload;
            state.error = null;
        },
        jobFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createJobStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        createJobSuccess: (state, action) => {
            state.loading = false;
            state.jobs.unshift(action.payload);
            state.error = null;
        },
        createJobFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateJobStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateJobSuccess: (state, action) => {
            state.loading = false;
            const index = state.jobs.findIndex(job => job._id === action.payload._id);
            if (index !== -1) {
                state.jobs[index] = action.payload;
            }
            state.job = action.payload;
            state.error = null;
        },
        updateJobFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteJobStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteJobSuccess: (state, action) => {
            state.loading = false;
            state.jobs = state.jobs.filter(job => job._id !== action.payload);
            state.error = null;
        },
        deleteJobFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = initialState.filters;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    jobsStart,
    jobsSuccess,
    jobsFailure,
    jobStart,
    jobSuccess,
    jobFailure,
    createJobStart,
    createJobSuccess,
    createJobFailure,
    updateJobStart,
    updateJobSuccess,
    updateJobFailure,
    deleteJobStart,
    deleteJobSuccess,
    deleteJobFailure,
    setFilters,
    clearFilters,
    clearError,
} = jobSlice.actions;

export default jobSlice.reducer;
