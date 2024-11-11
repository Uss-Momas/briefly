import { useAuth } from "../../../hooks/useAuth";
import { useState } from "react";
import Footer from "../../../components/Footer";
import PasswordTab from "../../../components/PasswordTab";
import ProfileTab from "../../../components/ProfileTab";
import UserHeader from "../../../components/UserHeader";

export default function Profile() {
    const [isProfileTab, setIsProfileTab] = useState(true);
    const { logout } = useAuth();

    const handleProfileTab = () => {
        setIsProfileTab(true);
    }

    const handlePasswordTab = () => {
        setIsProfileTab(false);
    }

    const handleLogout = () => {
        logout();
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
                                <ProfileTab />
                            ) : (
                                <PasswordTab />
                            )
                        }
                    </div>
                </section>
                <section className="flex justify-end m-6">
                    <button onClick={handleLogout} className="text-sm font-medium text-gray-500 hover:text-purple-700">Log out</button>
                </section>
            </main>
            <Footer />
        </div>
    );
}