import { LockIcon, Mail, Text, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";

export default function Signup() {

    const schema = z.object({
        email: z.string().email({ message: "Email is not valid" }),
        firstName: z.string().min(3).max(64),
        password: z.string().min(8, { message: "Password is too short" }).max(32, { message: "Password is too long" }),
        confirmPassword: z.string(),
        termsAgreement: z.boolean(),
    }).refine((data) => data.password === data.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] }).refine((data) => data.termsAgreement === true, { message: "Can't signup", path: ["termsAgreement"] });

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(schema),
    });

    const OnSubmit = (data) => {

        console.log(data);
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
                                        aria-invalid={errors.email ? true : false}
                                        className="border border-purple-600 outline-none focus:ring-2 focus:ring-purple-300 shadow-sm rounded-lg aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-300 w-full pl-10 pr-4 py-2" type="text" name="email" placeholder="Enter your email address" />
                                </div>
                                <span className="text-sm text-red-400">{errors.email && errors.email.message}</span>
                            </div>
                            <div div className="flex flex-col gap-2">
                                <div className="flex-1 relative">
                                    <Text className="absolute left-2 top-2 text-gray-500" />
                                    <input {...register("firstName")}
                                        aria-invalid={errors.firstName ? true : false}
                                        className="border border-purple-600 outline-none focus:ring-2 focus:ring-purple-300 shadow-sm rounded-lg aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-300 w-full pl-10 pr-4 py-2" type="text" name="firstName" placeholder="Enter your first name" />
                                </div>
                                <span className="text-sm text-red-400">{errors.firstName && errors.firstName.message}</span>
                            </div>
                            <div div className="flex flex-col gap-2">
                                <div className="relative">
                                    <LockIcon className="absolute left-2 top-2 text-gray-500" />
                                    <input {...register("password")}
                                        aria-invalid={errors.password ? true : false}
                                        className="border border-purple-600 outline-none focus:ring-2 focus:ring-purple-300 shadow-sm rounded-lg w-full aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-300 pl-10 pr-4 py-2" type="password" name="password" placeholder="Password" />
                                </div>
                                <span className="text-sm text-red-400">{errors.password && errors.password.message}</span>
                            </div>
                            <div div className="flex flex-col gap-2">
                                <div className="relative">
                                    <LockIcon className="absolute left-2 top-2 text-gray-500" />
                                    <input {...register("confirmPassword")}
                                        aria-invalid={errors.confirmPassword ? true : false}
                                        className="border border-purple-600 outline-none focus:ring-2 focus:ring-purple-300 shadow-sm rounded-lg w-full aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-300 pl-10 pr-4 py-2" type="password" name="confirmPassword" placeholder="confirm password" />
                                </div>
                                <span className="text-sm text-red-400">{errors.confirmPassword && errors.confirmPassword.message}</span>
                            </div>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm gap-2">
                            <input {...register("termsAgreement")} className="h-4 w-4" type="checkbox" name="termsAgreement" id="termsAgreement" />
                            <label aria-invalid={errors.termsAgreement ? true : false} className="hover:cursor-pointer aria-[invalid=true]:text-red-400" htmlFor="termsAgreement">I agree to the Terms of Service and Privacy Policy</label>
                            <span className="text-sm text-red-400">{errors.termsAgreement && "*"} </span>
                        </div>
                        <div className="flex items-center text-white font-medium rounded-lg px-8 py-3 bg-purple-700 transition-all duration-200 hover:scale-105 hover:bg-purple-600 w-full">
                            <UserPlus className="h-5 w-5 text-purple-300" />
                            <button type="submit" className="w-full">
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