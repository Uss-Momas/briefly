import { CheckCircle2, CircleX, Mail, User } from "lucide-react";
import { updateUserSchema } from "../../Validations/validations";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../../api/axios";
import { useState } from "react";

export default function ProfileTab() {
    const { auth, updateUser, handleUnauthorizedAccess } = useAuth();
    const { user, token } = auth;
    const { formState: { errors }, handleSubmit, register, setError, clearErrors } = useForm({
        defaultValues: {
            "firstName": user.firstName,
            "lastName": user.lastName,
        },
        resolver: zodResolver(updateUserSchema)
    });

    const [updated, setUpdated] = useState(false);

    const handleUserUpdate = async (data) => {
        try {
            await axios.put(`/users/${user.id}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            updateUser(data);
            setUpdated(true);
            setTimeout(() => {
                setUpdated(false);
            }, 1800);
        } catch (error) {
            if (error.status == 401) {
                handleUnauthorizedAccess();
                return;
            }
            console.log("PROFILE PAGE -PROFILE TAB (COMPONENT)- ERROR:", error);

            const { errors = [], message } = error.response.data;
            const messages = errors.map((e) => e.message);
            setError("root", { message: [message, ...messages] });
            setTimeout(() => {
                clearErrors();
            }, 2500);
        }
    }

    return (
        <form onSubmit={handleSubmit(handleUserUpdate)} className="flex flex-col gap-4 w-full">
            {updated && <div className="rounded-md bg-green-50 p-4">
                <div className="flex items-center justify-center gap-2 sm:gap-6">
                    <CheckCircle2 fill="#4ade80" className="text-white size-5 sm:size-6" />
                    <span className="text-sm text-green-800 font-medium">Profile updated sucessfully!</span>
                </div>
            </div>}
            {errors.root && <div className="rounded-md bg-red-50 p-4">
                <div className="flex items-center justify-center gap-2 sm:gap-6">
                    <CheckCircle2 fill="#f87171" className="text-white size-5 sm:size-6" />
                    <span className="text-sm text-red-800 font-medium">Some error occured!</span>
                </div>
            </div>}
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
    );
}