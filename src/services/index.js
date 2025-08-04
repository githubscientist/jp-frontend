export const authAPI = {
    // Auth endpoints
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    logout: () => api.post('auth/logout'),
    getProfile: () => api.get('/auth/me'),
    uploadResume: (formData) => api.post('/auth/upload-resume', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const jobAPI = {
    // Jobs Endpoints
    
}