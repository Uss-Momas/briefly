import { LockIcon, Mail, User } from "lucide-react"
import { useAuth } from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { updateUserSchema } from "../../../Validations/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Footer from "../../../components/Footer";
import UserHeader from "../../../components/UserHeader";
import axios from "../../../api/axios";
import { ProfileTab } from "../../../components/ProfileTab";
import PasswordTab from "../../../components/PasswordTab";

export default function Profile() {
    const [isProfileTab, setIsProfileTab] = useState(true);
    const { auth, logout, updateUser, handleUnauthorizedAccess } = useAuth();
    const { user, token } = auth;
    const { formState: { errors }, handleSubmit, register, setError, clearErrors } = useForm({
        defaultValues: {
            "firstName": user.firstName,
            "lastName": user.lastName,
            "password": "",
            // "confirmPassword"
        },
        resolver: zodResolver(updateUserSchema)
    });

    const handleProfileTab = (event) => {
        setIsProfileTab(true);
    }

    const handlePasswordTab = (event) => {
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