import { useForm } from "react-hook-form";
import { useContext } from "react";
import { z } from 'zod';
import AuthContext from "@/context/AuthProvider";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";

const loginSchema = z.object({
    email: z.string().email({ message: "Email must contain @" }),
    password: z.string().min(1, { message: 'Password cannot be empty' }),
});

export default function Login(params) {
    const { register, handleSubmit, setError, clearErrors, formState: { errors, isLoading, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema),
    });

    // const { setAuth } = useContext(AuthContext);
    const { setAuth } = useAuth();

    async function OnSubmit(formData) {
        try {
            const response = await axios.post('/auth/login', formData, {
                headers: { "Content-Type": 'application/json' },
                withCredentials: true
            });
            const { message, token, user } = response.data;
            console.log(message);
            console.log(token);
            console.log(user);

            setAuth({ user, token });
            localStorage.setItem('token', token);
        } catch (error) {
            if (!error.response) {
                setError('root', {
                    message: ["No Server Response"]
                });

                setTimeout(() => { clearErrors() }, 2000);
            } else {

                console.log(error.response.data);
                const { errors = [], message } = error.response.data;
                const messages = errors.map((error) => `${error.message}`);
                setError('root', {
                    message: [message, ...messages]
                });

                setTimeout(() => { clearErrors() }, 2000);
            }
        }
    }

    return (
        <div className='flex flex-col h-screen'>
            <Header />
            <main className="m-auto">
                <form className="bg-white flex flex-col gap-5 rounded px-6 py-8 h-auto w-96" onSubmit={handleSubmit(OnSubmit)}>
                    <h1 className="font-semibold text-2xl text-center">Login</h1>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <input type="email" {...register("email")} id="email" className="border border-blue-500 rounded outline-none focus:border-blue-800 px-2 py-1" />
                            {errors.email && (
                                <span className="text-red-600">{errors.email.message}</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Password</label>
                            <input type="password" {...register("password")} id="password" className="border border-blue-500 rounded outline-none focus:border-blue-800 px-2 py-1" />
                            {errors.password && (
                                <span className="text-red-600">{errors.password.message}</span>
                            )}
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-600 rounded text-white py-2 mt-3 hover:bg-blue-700 transition-colors">
                        {isSubmitting ? "Loging In..." : "Login"}
                    </button>
                    {
                        errors.root && (
                            errors.root.message.map((message) => (<span className="text-red-600">{message}</span>))
                        )
                    }
                </form>
            </main>
            <Footer />
        </div>
    );
}