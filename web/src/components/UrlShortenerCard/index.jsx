import { copyToClipboard } from "../../utils/utils";
import { Copy, CopyCheck, LinkIcon, Text, } from "lucide-react";
import { shortURLSchema } from "../../Validations/validations";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import appendUrl from "../../utils/appendUrl";
import axios from "../../api/axios";

export default function UrlShortenerCard({ className }) {
    const { clearErrors, formState: { errors }, handleSubmit, register, setError, reset } = useForm(
        { resolver: zodResolver(shortURLSchema) }
    );
    const { auth, handleUnauthorizedAccess } = useAuth();
    const { user, token } = auth;
    const [shortUrl, setShortUrl] = useState(undefined);
    const [isCopied, setIsCopied] = useState(false);

    const handleOnSubmit = async (data) => {
        try {
            const response = await axios.post("/shortlinks", {
                originalUrl: data.originalUrl,
                code: data.code,
            },
                { headers: { Authorization: `Bearer ${token}` } },
            );
            const { shortlink } = response.data;
            console.log(response.data);
            const url = await appendUrl(shortlink.code);
            setShortUrl(url);
            reset();
        } catch (error) {
            console.log("Dashboard Page errors: ", error);
            if (error.response) {
                if (error.status === 401) {
                    handleUnauthorizedAccess();
                    return;
                }
                const errorResponse = error.response.data;
                const { errors = [], message } = errorResponse;
                const errorMessages = errors.map((e) => e.message);
                setError("root", { message: [message, ...errorMessages] });
                setTimeout(clearErrors, 2500);
            }
        }
    }

    const handleShortUrlCopy = async () => {
        await copyToClipboard(shortUrl);
        console.log("clickedd");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }

    return (
        <section className={className}>
            <div className="flex flex-col gap-6 items-center ">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center text-gray-600 font-bold leading-tight">
                    Transform Long URLs Into
                    <span className="block text-purple-600">Short Links Instantly</span>
                </h1>
                <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col gap-4 w-full sm:gap-4 md:flex-row md:items-start justify-center my-4">
                    <div>
                        <div className="relative">
                            <LinkIcon className="absolute text-gray-500 top-1/2 -translate-y-1/2 left-3 h-5 w-5" />
                            <input {...register("originalUrl")} className="border border-purple-600/50 outline-none rounded-lg focus:ring-2 focus:ring-purple-600/25 focus:bg-purple-50 transition-all w-full px-10 py-3" type="text" placeholder="https://google.com" />
                        </div>
                        <span className="text-sm text-red-400">{errors.originalUrl && errors.originalUrl.message}</span>
                    </div>
                    <div>
                        <div className="relative flex-1 md:max-w-44">
                            <Text className="absolute text-gray-500 top-1/2 -translate-y-1/2 left-3 h-5 w-5" />
                            <input {...register("code")} className="border border-purple-600/50 outline-none rounded-lg focus:ring-2 focus:ring-purple-600/25 focus:bg-purple-50 transition-all w-full px-10 py-3" type="text" placeholder="code" />
                        </div>
                        <span className="text-sm text-wrap text-red-400">{errors.code && errors.code.message}</span>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg w-full md:w-auto md:whitespace-nowrap transition-transform ease-in hover:scale-105 delay-75 px-6 py-3">Shorten URL</button>
                </form>
                <div className="flex items-center justify-center gap-4 text-white bg-gradient-to-br from-purple-600/90 via-purple-500/90 to-purple-700/90 max-md:w-full shadow-lg rounded-lg py-3 px-4 group">
                    {
                        shortUrl ? (<a href={shortUrl} target="_blank" className="group-hover:text-white/80 
                           transition-colors hover:underline">
                            {shortUrl}
                        </a>) : (
                            <span className="font-medium break-all group-hover:text-white/80 
                                        transition-colors">shortened url... </span>
                        )
                    }
                    <button onClick={handleShortUrlCopy} className={`group flex items-center gap-2 backdrop-blur-sm bg-white/20 hover:bg-white/30 active:bg-white/5 transition-all rounded-lg p-2 duration-200`} disabled={shortUrl ? false : true}>
                        {
                            isCopied ? <CopyCheck className="w-4 h-4 group-hover:scale-110 transition-transform text-green-300" /> : <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        }
                        <span className={`${isCopied ? 'text-green-300' : ''}`}>
                            {
                                !isCopied ? "Copy URL" : "Copied URL"
                            }
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );

}