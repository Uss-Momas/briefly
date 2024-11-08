import { LockIcon, Mail, Text, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from "../../Validations/validations";
import axios from "../../api/axios";

export default function Signup() {
    const { clearErrors, register, formState: { errors }, setError, handleSubmit } = useForm({
        resolver: zodResolver(signupSchema),
    });
    const navigate = useNavigate();

    const OnSubmit = async (data) => {
        try {
            const response = await axios.post("/auth/signup", data);
            navigate('/login');
        } catch (error) {
            const { errors = [], message } = error.response.data;
            const messages = errors.map((e) => e.message);
            setError("root", { message: [message, ...messages] });
            setTimeout(() => {
                clearErrors();
            }, 2500);
        }
    }

    return (
        <div>
            <div className="min-h-dvh flex items-center justify-center bg-gradient-to-br from-purple-800 via-zircon-600 to-purple-600">
                <div className="flex flex-col gap-6 bg-white w-1/3 rounded-lg py-10 px-6 max-lg:w-3/4">
                    <h1 className="text-xl text-black/80 text-center font-medium">
                        Create an Account In <Link to={"/"} className="text-purple-600">Briefly</Link>
                    </h1>
                    <form onSubmit={handleSubmit(OnSubmit)} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="flex-1 relative">
                                    <Mail className="absolute left-2 top-2 text-gray-500" />
                                    <input {...register("email")}
                                        aria-invalid={errors.email ? "true" : "false"}
                                        className="border border-purple-600 outline-none focus:ring-2 focus:ring-purple-300 shadow-sm rounded-lg aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-300 w-full pl-10 pr-4 py-2" type="text" name="email" placeholder="Enter your email address" />
                                </div>
                                <span className="text-sm text-red-400">{errors.email && errors.email.message}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex-1 relative">
                                    <Text className="absolute left-2 top-2 text-gray-500" />
                                    <input {...register("firstName")}
                                        aria-invalid={errors.firstName ? "true" : "false"}
                                        className="border border-purple-600 outline-none focus:ring-2 focus:ring-purple-300 shadow-sm rounded-lg aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-300 w-full pl-10 pr-4 py-2" type="text" name="firstName" placeholder="Enter your first name" />
                                </div>
                                <span className="text-sm text-red-400">{errors.firstName && errors.firstName.message}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex-1 relative">
                                    <Text className="absolute left-2 top-2 text-gray-500" />
                                    <input {...register("lastName")}
                                        aria-invalid={errors.lastName ? "true" : "false"}
                                        className="border border-purple-600 outline-none focus:ring-2 focus:ring-purple-300 shadow-sm rounded-lg aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-300 w-full pl-10 pr-4 py-2" type="text" name="lastName" placeholder="Enter your last name" />
                                </div>
                                <span className="text-sm text-red-400">{errors.lastName && errors.lastName.message}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="relative">
                                    <LockIcon className="absolute left-2 top-2 text-gray-500" />
                                    <input {...register("password")}
                                        aria-invalid={errors.password ? "true" : "false"}
                                        className="border border-purple-600 outline-none focus:ring-2 focus:ring-purple-300 shadow-sm rounded-lg w-full aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-300 pl-10 pr-4 py-2" type="password" name="password" placeholder="Password" />
                                </div>
                                <span className="text-sm text-red-400">{errors.password && errors.password.message}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="relative">
                                    <LockIcon className="absolute left-2 top-2 text-gray-500" />
                                    <input {...register("confirmPassword")}
                                        aria-invalid={errors.confirmPassword ? "true" : "false"}
                                        className="border border-purple-600 outline-none focus:ring-2 focus:ring-purple-300 shadow-sm rounded-lg w-full aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-300 pl-10 pr-4 py-2" type="password" name="confirmPassword" placeholder="confirm password" />
                                </div>
                                <span className="text-sm text-red-400">{errors.confirmPassword && errors.confirmPassword.message}</span>
                            </div>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm gap-2">
                            <input {...register("termsAgreement")} className="h-4 w-4" type="checkbox" name="termsAgreement" id="termsAgreement" />
                            <label className={`hover:cursor-pointer ${errors.termsAgreement ? "text-red-400" : "text-gray-600"}`} htmlFor="termsAgreement">I agree to the Terms of Service and Privacy Policy</label>
                            <span className="text-sm text-red-400">{errors.termsAgreement && "*"} </span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-red-500">{errors.root && errors.root.message[errors.root.message.length - 1]}</span>
                            <button type="submit" className="relative text-white font-medium rounded-lg px-8 py-3 bg-purple-700 transition-all duration-200 hover:scale-105 hover:bg-purple-600 w-full">
                                <UserPlus className="absolute h-5 w-5 text-purple-300" />
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-6">
                        <p className="text-gray-500/90">Already have an account? <Link to={"/login"}><span className="text-purple-600 font-medium hover:text-purple-500">Sign In</span></Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}