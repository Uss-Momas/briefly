import classNames from "classnames";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import { Copy, CopyCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from '@/api/axios';


const schema = z.object({
    url: z.string().url({
        message: 'Url is not valid',
    }),
});

export default function ShortlinkAnonimous(params) {
    const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({
        resolver: zodResolver(schema),
    });


    const [shortenedCode, setShortenedCode] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    async function OnSubmit(data) {
        try {
            const response = await axios({
                method: 'post',
                url: '/shortlinks/anonimous',
                data: {
                    originalUrl: data.url,
                },
            });
            const responseData = response.data;
            console.log(responseData);
            setShortenedCode(`http://localhost:3333/${responseData.shortlink.code}`);
            // reset();
        } catch (error) {
            setError("root", {
                message: 'Some Error',
            })
        }
    }

    async function copyToClipboard(text) {
        return await navigator.clipboard.writeText(text);
    }

    async function handleCopyClick() {
        await copyToClipboard(shortenedCode);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    }

    return (
        <div className='flex flex-col h-screen'>
            <Header />
            <main className="flex-grow flex flex-col items-center justify-center p-6">
                <div className='flex flex-col gap-6 w-4/5 max-w-lg rounded-xl p-8 bg-white shadow-lg'>
                    <h1 className='font-semibold text-xl text-gray-800'>Paste your link here to be shortened</h1>
                    <form className='flex flex-row gap-4 items-center' onSubmit={handleSubmit(OnSubmit)}>
                        <input {...register("url")} type="text"
                            className='flex-grow border rounded p-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700' placeholder="http://example.com" />
                        <button disabled={isSubmitting}
                            className={classNames(
                                'flex-none bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors',
                                isSubmitting && 'opacity-50 cursor-not-allowed'
                            )}>{isSubmitting ? "Shortening" : "Shorten"}</button>
                    </form>
                    {errors.url && (
                        <span className="text-red-500">{errors.url.message}</span>
                    )}
                    {shortenedCode && (<div className="flex flex-row items-center border border-purple-600 rounded p-3 bg-purple-50">
                        <input
                            className="flex-grow text-zinc-700 bg-purple-50 disabled:bg-purple-50 outline-none" type="text" disabled placeholder="your shortened url here..." value={shortenedCode} />

                        <button onClick={async () => { handleCopyClick(); }}>
                            {isCopied ? <CopyCheck className="w-6 h-6 text-green-600" /> : <Copy className="w-6 h-6 text-zinc-700" />}
                        </button>
                    </div>)}
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mt-12'>
                    <div className='flex flex-col gap-4 py-4 px-8 items-center border-l-8 border-blue-700 rounded-lg bg-white'>
                        <h2 className='font-semibold uppercase'>This Month</h2>
                        <div className='flex gap-3'>
                            <div className='flex flex-col items-center'>
                                <h3 className='font-semibold text-zinc-800'>120 238</h3>
                                <span className='text-zinc-600'>Shortened URLs</span>
                            </div>
                            <div className='flex flex-col items-center'>
                                <h3 className='font-semibold text-zinc-800'>14 352 173</h3>
                                <span className='text-zinc-600'>Visits/Clicks</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 py-4 px-8 items-center border-l-8 border-blue-700 rounded-lg bg-white'>
                        <h2 className='font-semibold uppercase'>This Month</h2>
                        <div className='flex gap-3'>
                            <div className='flex flex-col items-center'>
                                <h3 className='font-semibold text-zinc-800'>120 238</h3>
                                <span className='text-zinc-600'>Shortened URLs</span>
                            </div>
                            <div className='flex flex-col items-center'>
                                <h3 className='font-semibold text-zinc-800'>14 352 173</h3>
                                <span className='text-zinc-600'>Visits/Clicks</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 py-4 px-8 items-center border-l-8 border-blue-700 rounded-lg bg-white'>
                        <h2 className='font-semibold uppercase'>This Month</h2>
                        <div className='flex gap-3'>
                            <div className='flex flex-col items-center'>
                                <h3 className='font-semibold text-zinc-800'>120 238</h3>
                                <span className='text-zinc-600'>Shortened URLs</span>
                            </div>
                            <div className='flex flex-col items-center'>
                                <h3 className='font-semibold text-zinc-800'>14 352 173</h3>
                                <span className='text-zinc-600'>Visits/Clicks</span>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}