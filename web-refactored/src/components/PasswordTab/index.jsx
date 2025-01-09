import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, CircleX, LockIcon } from "lucide-react";
import { updateUserPasswordSchema } from "../../Validations/validations";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "../../api/axios";

export default function PasswordTab() {
    const { auth, handleUnauthorizedAccess } = useAuth();
    const { user, token } = auth;
    const { formState: { errors }, handleSubmit, register, setError, clearErrors } = useForm({
        resolver: zodResolver(updateUserPasswordSchema)
    });

    const [successMessage, setSuccessMessage] = useState(undefined);
    const [updated, setUpdated] = useState(false);

    const handleUserPassword = async (data) => {
        try {
            const response = await axios.patch(`/users/${user.id}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const { message } = response.data;
            setSuccessMessage(message);
            setTimeout(() => setSuccessMessage(undefined), 1800);
            setUpdated(true);
            setTimeout(() => {
                setUpdated(false);
            }, 1800);
        } catch (error) {
            if (error.status == 401) {
                handleUnauthorizedAccess();
                return;
            }
            console.log("PROFILE PAGE -PASSWORD TAB (COMPONENT)-  ERROR:", error);

            const { errors = [], message } = error.response.data;
            const messages = errors.map((e) => e.message);
            setError("root", { message: [message, ...messages] });
            setTimeout(() => {
                clearErrors();
            }, 2500);
        }
    }

    return (
        <form onSubmit={handleSubmit(handleUserPassword)} className="flex flex-col gap-4 w-full">
            {updated && <div className="rounded-md bg-green-50 p-4">
                <div className="flex items-center justify-center gap-2 sm:gap-6">
                    <CircleCheck fill="#4ade80" className="text-white size-5 sm:size-6" />
                    <span className="text-sm text-green-800 font-medium">{successMessage}</span>
                    {/* Password updated sucessfully! */}
                </div>
            </div>}
            {errors.root && <div className="rounded-md bg-red-50 p-4">
                <div className="flex items-center justify-center gap-2 sm:gap-6">
                    <CircleX fill="#f87171" className="text-white size-5 sm:size-6" />
                    <span className="text-sm text-red-800 font-medium">Some error occured!</span>
                </div>
            </div>}
            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="flex gap-2 text-sm text-gray-700 font-medium">
                    <LockIcon className="w-5 h-5" />
                    New Password
                </label>
                <input id="password" {...register("password")} placeholder="Enter your new password" className="border border-gray-300 focus:border-purple-600 focus:ring-purple-600 focus:outline-none rounded-md shadow-sm w-full py-2 px-3" type="password" />
                <span className="text-sm text-red-400">{errors.password && errors.password.message}</span>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="confirmPassword" className="flex gap-2 text-sm text-gray-700 font-medium">
                    <LockIcon className="w-5 h-5" />
                    Confirm Password
                </label>
                <input id="confirmPassword" {...register("confirmPassword")} type="password" placeholder="Confirm your new password" className="border border-gray-300 focus:border-purple-600 focus:ring-purple-600 focus:outline-none rounded-md shadow-sm w-full py-2 px-3" />
                <span className="text-sm text-red-400">{errors.confirmPassword && errors.confirmPassword.message}</span>
            </div>
            <button className="border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e3a8a] transition-transform ease-in hover:scale-105 duration-200 py-2 px-4" type="submit">Update Password</button>        </form>
    );
}