import { LockIcon, Mail, User } from "lucide-react"
import { useAuth } from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { updateUserSchema } from "../../../Validations/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Footer from "../../../components/Footer";
import UserHeader from "../../../components/UserHeader";
import axios from "../../../api/axios";

export default function Profile() {
    const [isProfileTab, setIsProfileTab] = useState(true);
    const { auth, logout, updateUser } = useAuth();
    const { user, token } = auth;
    const { formState: { errors }, handleSubmit, register, setError, clearErrors } = useForm({
        defaultValues: {
            "firstName": user.firstName,
            "lastName": user.lastName,
        },
        resolver: zodResolver(updateUserSchema)
    });

    const handleProfileTab = (event) => {
        setIsProfileTab(true);
    }

    const handlePasswordTab = (event) => {
        setIsProfileTab(false);
    }

    const handleUserUpdate = async (data) => {
        try {
            const response = await axios.put(`/users/${user.id}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            updateUser(data);
        } catch (error) {
            console.log("PROFILE PAGE ERROR:", error);

            const { errors = [], message } = error.response.data;
            const messages = errors.map((e) => e.message);
            setError("root", { message: [message, ...messages] });
            setTimeout(() => {
                clearErrors();
            }, 2500);
        }
    }


    const handleLogout = (event) => {
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
                                <form onSubmit={handleSubmit(handleUserUpdate)} className="flex flex-col gap-4 w-full">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="firstName" className="flex gap-2 text-sm text-gray-700 font-medium">
                                            <User className="w-5 h-5" />
                                            First Name
                                        </label>
                                        <input id="firstName" {...register("firstName")}
                                            aria-invalid={errors.firstName ? true : false}
                                            placeholder="Enter your first name" className="border border-gray-300 focus:border-purple-600 focus:ring-purple-600 focus:outline-none aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-300 rounded-md shadow-sm w-full py-2 px-3" type="text" />
                                        <span className="text-sm text-red-400">{errors.firstName && errors.firstName.message}</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="lastName" className="flex gap-2 text-sm text-gray-700 font-medium">
                                            <User className="w-5 h-5" />
                                            Last Name
                                        </label>
                                        <input id="lastName" {...register("lastName")} type="text"
                                            aria-invalid={errors.lastName ? true : false}
                                            placeholder="Enter your last name" className="border border-gray-300 focus:border-purple-600 focus:ring-purple-600 focus:outline-none aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-300 rounded-md shadow-sm w-full py-2 px-3" />
                                        <span className="text-sm text-red-400">{errors.lastName && errors.lastName.message}</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="flex gap-2 text-sm text-gray-700 font-medium">
                                            <Mail className="w-5 h-5" />
                                            E-mail
                                        </label>
                                        <input type="text" value={user.email} placeholder="Enter your email" className="border border-gray-300 focus:border-purple-600 focus:ring-purple-600 focus:outline-none rounded-md shadow-sm w-full py-2 px-3" disabled />
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
                <section className="flex justify-end m-6">
                    <button onClick={handleLogout} className="text-sm font-medium text-gray-500 hover:text-purple-700">Log out</button>
                </section>
            </main>
            <Footer />
        </div>
    );
}