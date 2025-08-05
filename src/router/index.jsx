import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import JobsPage from "../pages/JobsPage";
import JobDetailPage from "../pages/JobDetailPage";
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "../components/ProtectedRoute";
import { authAPI, jobsAPI } from '../services/index';

// root loader to check authentication status
const rootLoader = async ({ request }) => {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Skip auth check for public routes
    const publicRoutes = ['/login', '/register'];
    if (publicRoutes.includes(pathname)) {
        return null;
    }

    try {
        const response = await authAPI.getProfile();
        return response.data.user;
    } catch (error) {
        // Don't throw error, just return null for unauthenticated state
        console.log('User not authenticated:', error.response?.status);
        return null;
    }
}

// jobs loader to fetch jobs
const jobsLoader = async ({ request }) => {
    try {
        const url = new URL(request.url);
        const searchParams = Object.fromEntries(url.searchParams);
        const response = await jobsAPI.getJobs(searchParams);
        return response.data;
    } catch (error) {
        return {
            jobs: [],
            pagination: {
                page: 1,
                limit: 10,
                total: 0,
                pages: 0,
            }
        }
    }
}

// job loader to fetch a single job by ID
const jobLoader = async ({ params }) => {
    try {
        const response = await jobsAPI.getJob(params.id);
        return response.data.job || response.data;
    } catch (error) {
        throw new Response(`Job not found`, { status: 404 });
    }
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: rootLoader,
        hydrateFallbackElement: <div>Loading...</div>,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "register",
                element: <RegisterPage />
            },
            {
                path: "jobs",
                element: <JobsPage />,
                loader: jobsLoader,
                hydrateFallbackElement: <div>Loading jobs...</div>
            },
            {
                path: "jobs/:id",
                element: <JobDetailPage />,
                loader: jobLoader,
                hydrateFallbackElement: <div>Loading job details...</div>
            },
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                )
            }
        ]
    }
])