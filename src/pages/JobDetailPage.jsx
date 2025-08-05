import React, { useState } from 'react';
import { useLoaderData, Link } from 'react-router';
import { toast } from 'react-hot-toast';
import { applicationsAPI } from '../services';

function JobDetailPage() {
    const job = useLoaderData();
    const [isApplying, setIsApplying] = useState(false);
    const [showApplyModal, setShowApplyModal] = useState(false);

    const handleApply = async (event) => {
        event.preventDefault();
        setIsApplying(true);

        const formData = new FormData(event.target);

        try {
            await applicationsAPI.applyForJob(job._id, formData);
            toast.success('Application submitted successfully!');
            setShowApplyModal(false);
        } catch (error) {
            console.error('Application error:', error);
            toast.error(error.response?.data?.message || 'Failed to submit application');
        } finally {
            setIsApplying(false);
        }
    };

    if (!job) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Job not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link
                        to="/jobs"
                        className="text-indigo-600 hover:text-indigo-500"
                    >
                        ← Back to Jobs
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {job.title}
                        </h1>
                        <div className="flex flex-wrap gap-4 text-gray-600">
                            <span>{job.company}</span>
                            <span>•</span>
                            <span>{job.location}</span>
                            <span>•</span>
                            <span className="capitalize">{job.jobType}</span>
                            <span>•</span>
                            <span className="capitalize">{job.experienceLevel}</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                            {job.category}
                        </span>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            Salary Range
                        </h2>
                        <p className="text-2xl font-bold text-green-600">
                            ${job.salary?.min?.toLocaleString()} - ${job.salary?.max?.toLocaleString()}
                        </p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            Job Description
                        </h2>
                        <p className="text-gray-700 whitespace-pre-line">
                            {job.description}
                        </p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            Requirements
                        </h2>
                        <p className="text-gray-700 whitespace-pre-line">
                            {job.requirements}
                        </p>
                    </div>

                    <div className="border-t pt-6">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                                Posted: {new Date(job.createdAt).toLocaleDateString()}
                            </div>
                            <div className="space-x-4">
                                <button
                                    onClick={() => setShowApplyModal(true)}
                                    className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Apply Modal */}
                {showApplyModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                            <h3 className="text-lg font-semibold mb-4">Apply for {job.title}</h3>

                            <form onSubmit={handleApply}>
                                <div className="mb-4">
                                    <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                                        Cover Letter
                                    </label>
                                    <textarea
                                        id="coverLetter"
                                        name="coverLetter"
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Write a brief cover letter..."
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                                        Resume (PDF)
                                    </label>
                                    <input
                                        type="file"
                                        id="resume"
                                        name="resume"
                                        accept=".pdf"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowApplyModal(false)}
                                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                        disabled={isApplying}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isApplying}
                                        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        {isApplying ? 'Submitting...' : 'Submit Application'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default JobDetailPage;
