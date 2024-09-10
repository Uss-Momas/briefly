import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";


const schema = z.object({
    name: z.string().min(3, { message: 'Name must contain at least 3 character(s)' }),
    email: z.string().email({ message: 'Email must include "@"' }),
    password: z.string().min(6, { message: 'Password must contain at least 6 character(s)' }),
    confirmPassword: z.string(),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ["confirmPassword"]
        });
    }
});

export default function Signup() {
    const { register, handleSubmit, clearErrors, setError, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({ resolver: zodResolver(schema) });

    async function OnSubmit(data) {
        try {
            await new Promise((resolve) => {
                setTimeout(resolve, 1500);
            });
            delete data.confirmPassword;
            const response = await axios.post(
                'http://localhost:3333/api/v1/auth/signup',
                data,
            );
        } catch (error) {
            const { errors = [], message } = error.response.data;
            const messages = errors.map((error) => error.message);
            setError("root", {
                message: [message, ...messages],
            })
            setTimeout(() => {
                clearErrors("root");
            }, 2000);
        }
    }

    return (
        <div className='flex flex-col h-screen'>
            <Header />
            <main className="m-auto mt-2 mb-4">
                <div className="bg-white flex flex-col gap-5 rounded px-6 py-8 h-auto w-96">
                    <h1 className="font-semibold text-2xl text-center">Signup</h1>
                    <form onSubmit={handleSubmit(OnSubmit)} className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">Name</label>
                            <input type="text" {...register("name")} id="name" className="border border-blue-500 rounded focus:outline-none focus-within:border-blue-900 px-2 py-1" />
                            {
                                errors.name && (<span className="text-red-700">{errors.name.message}</span>)
                            }
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <input type="text" {...register("email")} id="email" className="border border-blue-500 rounded focus:outline-none focus-within:border-blue-900 px-2 py-1" />
                            {
                                errors.email && (<span className="text-red-700">{errors.email.message}</span>)
                            }
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Password</label>
                            <input type="password" {...register("password")} id="password" className="border border-blue-500 rounded focus:outline-none focus-within:border-blue-900 px-2 py-1" />
                            {
                                errors.password && (<span className="text-red-700">{errors.password.message}</span>)
                            }
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input type="password" {...register("confirmPassword")} id="confirm-password" className="border border-blue-500 rounded focus:outline-none focus-within:border-blue-900 px-2 py-1" />
                            {
                                errors.confirmPassword && (<span className="text-red-700">{errors.confirmPassword.message}</span>)
                            }
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="avatar">Avatar</label>
                            <input type="file" {...register("avatar")} id="avatar" className="border border-blue-500 rounded px-2 py-1" />
                        </div>
                        <button type="submit" className="bg-blue-600 transition-colors hover:bg-blue-800 rounded text-white py-2 mt-3">{
                            isSubmitting ? "Signing Up..." : "Signup"
                        }
                        </button>
                        {errors.root && errors.root.message.map((message, idx) => (<span className="text-red-700" key={idx}>{message}</span>))}
                    </form>

                </div>
            </main>
            <Footer />
        </div>
    );
}