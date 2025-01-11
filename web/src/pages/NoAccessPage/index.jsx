import { ArrowLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NoAccessPage() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/auth/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-lg text-center">
                <h1 className="text-4xl font-bold text-purple-700 mb-4">403</h1>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Access Denied</h2>
                <p className="text-gray-600 mb-6">
                    You don't have permission to access this page. Please check with your administrator or try logging in with the correct credentials.
                </p>
                <button
                    onClick={handleGoBack}
                    className="px-6 py-3 font-semibold rounded-lg transition ease-in-out delay-100 bg-purple-700 text-white hover:bg-purple-800 hover:scale-105"
                >
                    <div className="flex items-center gap-3">
                        <ArrowLeft className="size-5"/>
                        <span>Go Back to Home</span>
                    </div>
                </button>
            </div>
        </div>
    );
}
