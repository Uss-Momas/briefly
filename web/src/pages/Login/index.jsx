import { Link, useNavigate } from "react-router-dom";
import { LockIcon, LogIn, Mail } from "lucide-react";
import { loginSchema } from "../../Validations/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from '../../hooks/useAuth';
import axios from "../../api/axios";

export default function Login() {
    const { formState: { errors }, handleSubmit, register, setError, clearErrors } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/auth/login", data);
            const { token, user } = response.data;
            login({ token, user });
            navigate("/auth/dashboard");
        } catch (error) {
            console.log("Login Page", error);
            const { errors = [], message } = error.response.data;
            const messages = errors.map((e) => e.message);
            setError("root", { message: [message, ...messages] });
            setTimeout(() => { clearErrors(); }, 2500);
        }
    }

    return (
        <div className="min-h-dvh flex items-center justify-center bg-gradient-to-br from-purple-800 via-zircon-600 to-purple-600">
            <div className="flex flex-col gap-6 bg-white w-1/3 rounded-lg py-10 px-6 max-lg:w-3/4">
                <h1 className="text-xl text-black/80 text-center font-medium">
                    Sign In to <Link to={"/"} className="text-purple-600">Briefly</Link>
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex-1 relative">
                                <Mail className="absolute left-2 top-2 text-gray-500" />
                                <input {...register("email")} aria-invalid={errors.email ? "true" : "false"} className="border border-purple-600 outline-none focus:ring-2 focus:ring-purple-300 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-300 shadow-sm rounded-lg w-full pl-10 py-2" type="email" name="email" placeholder="email address" />
                            </div>
                            <span className="text-sm text-red-400">{errors.email && errors.email.message}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="relative">
                                <LockIcon className="absolute left-2 top-2 text-gray-500" />
                                <input {...register("password")} aria-invalid={errors.email ? "true" : "false"} className="border border-purple-600 outline-none focus:ring-2 focus:ring-purple-300 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-300 shadow-sm rounded-lg w-full pl-10 pr-4 py-2" type="password" name="password" placeholder="password" />
                            </div>
                            <span className="text-sm text-red-400">{errors.password && errors.password.message}</span>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm gap-2">
                        <input className="h-4 w-4" type="checkbox" name="remember" id="remember" />
                        <label className="hover:cursor-pointer" htmlFor="remember">remember-me</label>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button className="relative text-white font-medium rounded-lg px-8 py-3 bg-purple-700 transition-all duration-200 hover:scale-105 hover:bg-purple-600 w-full">
                            <LogIn className="absolute h-5 w-5" />
                            Sign In
                        </button>
                        <span className="text-sm text-red-400">{errors.root && errors.root.message[errors.root.message.length - 1]}</span>
                    </div>
                </form>
                <div className="text-center mt-6">
                    <p className="text-gray-500/90">Don't have an account? <Link to={"/signup"}><span className="text-purple-600 font-medium hover:text-purple-500">Sign Up</span></Link></p>
                </div>
            </div>
        </div>
    );
}