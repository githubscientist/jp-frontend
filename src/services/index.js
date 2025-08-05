import api from "./api"

export const authAPI = {
    // Auth endpoints
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    logout: () => api.post('/auth/logout'),
    getProfile: () => api.get('/auth/me'),
    uploadResume: (formData) => api.post('/auth/upload-resume', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const jobsAPI = {
    // Jobs Endpoints
    getJobs: (params = {}) => api.get('/jobs', { params }),
    getJob: (id) => api.get(`/jobs/${id}`),
    createJob: (jobData) => api.post('/jobs', jobData),
    updateJob: (id, jobData) => api.put(`/jobs/${id}`, jobData),
    deleteJob: (id) => api.delete(`/jobs/${id}`),
    uploadLogo: (jobId, formData) => api.post(`/jobs/${jobId}/logo`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
};

export const applicationsAPI = {
    // Applications Endpoints
    getApplications: (params = {}) => api.get('/applications', { params }),
    getApplication: (id) => api.get(`/applications/${id}`),
    createApplication: (applicationData) => api.post('/applications', applicationData),
    updateApplication: (id, applicationData) => api.put(`/applications/${id}`, applicationData),
    deleteApplication: (id) => api.delete(`/applications/${id}`),
    getMyApplications: () => api.get('/applications/my'),
    getJobApplications: (jobId) => api.get(`/applications/job/${jobId}`),
    updateApplicationStatus: (id, status, notes) => api.put(`/applications/${id}/status`, { status, notes }),
    scheduleInterview: (id, interviewData) => api.put(`/applications/${id}/interview`, interviewData),
    applyForJob: (jobId, formData) => api.post(`/applications/${jobId}/apply`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
};

export const usersAPI = {
    // users endpoints
    getUsers: (params = {}) => api.get('/users', { params }),
    getUser: (id) => api.get(`/users/${id}`),
    updateUser: (id, userData) => api.put(`/users/${id}`, userData),
    deleteUser: (id) => api.delete(`/users/${id}`),
    getUserStats: () => api.get('/users/stats'),
};

export const adminAPI = {
    // admin endpoints
    getDashboardStats: () => api.get('/admin/stats'),
    getSystemHealth: () => api.get('/admin/health'),
    getAuditLogs: (params = {}) => api.get('/admin/audit', { params }),
};