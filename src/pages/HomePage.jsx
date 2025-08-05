import React from 'react';
import { Link } from 'react-router';

function HomePage() {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Welcome to JobApp</h1>
            <div className="space-x-4">
                <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
                <Link to="/jobs" className="text-blue-500 hover:underline">Browse Jobs</Link>
            </div>
        </div>
    );
}

export default HomePage;
