import { LockIcon, Mail, User } from "lucide-react";
import { useState } from "react";
import Footer from "../../../components/Footer";
import UserHeader from "../../../components/UserHeader";

export default function Profile() {
    const [isProfileTab, setIsProfileTab] = useState(true);

    const handleProfileTab = (event) => {
        setIsProfileTab(true);
    }

    const handlePasswordTab = (event) => {
        setIsProfileTab(false);
    }

    return (
        <div className="min-h-dvh bg-gradient-to-r from-zircon-50 via-zircon-100 to-zircon-50">
            <UserHeader />
            <main className="pt-16">
                <section className="bg-white/30 border border-purple-800/15 backdrop-blur-md rounded-lg shadow-lg p-4 mx-auto my-6 max-w-5xl sm:p-6 lg:p-8">
                    <div className="flex flex-col bg-white rounded-lg p-4 gap-6">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex items-center">
                                <button onClick={handleProfileTab} className={
                                    `border-b-2 text-center font-medium text-sm w-1/2 py-4 px-1 ${isProfileTab
                                        ? "border-purple-700 text-purple-700 hover:border-purple-800 hover:text-purple-800 hover:bg-gray-100 hover:rounded-t-md"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`
                                }>
                                    Profile Settings
                                </button>
                                <button onClick={handlePasswordTab} className={` w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${!isProfileTab
                                        ? "border-purple-700 text-purple-700 hover:border-purple-800 hover:text-purple-800 hover:bg-gray-100 hover:rounded-t-md"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}>
                                    Update Password
                                </button>
                            </nav>
                        </div>
                        {
                            isProfileTab ? (
                                <form className="flex flex-col gap-4 w-full">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="firstName" className="flex gap-2 text-sm text-gray-700 font-medium">
                                            <User className="w-5 h-5" />
                                            First Name
                                        </label>
                                        <input id="firstName" placeholder="Enter your first name" className="border border-gray-300 focus:border-purple-600 focus:ring-purple-600 focus:outline-none rounded-md shadow-sm w-full py-2 px-3" type="text" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="flex gap-2 text-sm text-gray-700 font-medium">
                                            <User className="w-5 h-5" />
                                            Last Name
                                        </label>
                                        <input type="text" placeholder="Enter your last name" className="border border-gray-300 focus:border-purple-600 focus:ring-purple-600 focus:outline-none rounded-md shadow-sm w-full py-2 px-3" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="flex gap-2 text-sm text-gray-700 font-medium">
                                            <Mail className="w-5 h-5" />
                                            E-mail
                                        </label>
                                        <input type="text" placeholder="Enter your email" className="border border-gray-300 focus:border-purple-600 focus:ring-purple-600 focus:outline-none rounded-md shadow-sm w-full py-2 px-3" disabled />
                                    </div>
                                    <button className="border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e3a8a] transition-transform ease-in hover:scale-105 duration-200 py-2 px-4" type="submit">Update Profile</button>
                                </form>
                            ) : (
                                <form className="flex flex-col gap-4 w-full">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="password" className="flex gap-2 text-sm text-gray-700 font-medium">
                                            <LockIcon className="w-5 h-5" />
                                            New Password
                                        </label>
                                        <input id="password" placeholder="Enter your new password" className="border border-gray-300 focus:border-purple-600 focus:ring-purple-600 focus:outline-none rounded-md shadow-sm w-full py-2 px-3" type="password" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="confirmPassword" className="flex gap-2 text-sm text-gray-700 font-medium">
                                            <LockIcon className="w-5 h-5" />
                                            Confirm Password
                                        </label>
                                        <input id="confirmPassword" type="password" placeholder="Confirm your new password" className="border border-gray-300 focus:border-purple-600 focus:ring-purple-600 focus:outline-none rounded-md shadow-sm w-full py-2 px-3" />
                                    </div>
                                    <button className="border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e3a8a] transition-transform ease-in hover:scale-105 duration-200 py-2 px-4" type="submit">Update Password</button>
                                </form>
                            )
                        }
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}