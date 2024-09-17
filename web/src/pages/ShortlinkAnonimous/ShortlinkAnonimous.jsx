import classNames from 'classnames';
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
            <main className='mb-auto mt-auto flex flex-col items-center'>
                <div className='flex flex-col gap-5 w-4/5 rounded-xl mt-5 p-8 px-24 bg-white'>
                    <h1 className='font-semibold text-lg'>Paste your link here to be shortened</h1>

                    <div>
                        <form action="" className='flex flex-row items-center gap-8' onSubmit={handleSubmit(OnSubmit)}>
                            <input {...register("url")} type="text" className='basis-3/4 border rounded p-2 w-full border-blue-500 focus:outline-none focus-within:border-blue-700' placeholder="http://example.com" />
                            <button disabled={isSubmitting} className='basis-1/4 rounded p-2 bg-blue-600 text-white hover:bg-blue-800 transition-colors'>{isSubmitting ? "Submitting..." : "Short Link"}</button>
                        </form>
                        {errors.url && (
                            <span className="text-red-500">{errors.url.message}</span>
                        )}
                        {/* {errors.url & 6(
                            <span className="text-red-500">{errors.url.message}</span>
                        )} */}
                    </div>
                    <div>
                        {/* {isSubmitSuccessful && (
                            <span className="basis-1 mb-5">Here is your new link</span>
                        )} */}
                        <div className='flex flex-row border border-purple-600 rounded p-2 items-center'>
                            <input className='basis-4/5 disabled:bg-white disabled:text-zinc-500' type="text" disabled placeholder="your shortened url here..." value={shortenedCode} />

                            <button onClick={async () => { handleCopyClick(); }}>
                                {isCopied ? <CopyCheck className="text-zinc-600 basis-1/5" /> : (
                                    <Copy className="text-zinc-600 basis-1/5" />
                                )
                                }
                            </button>
                            {/* <span className='basis-1/5'>copy</span> */}
                        </div>
                    </div>

                </div>
                <div className='grid grid-cols-3 gap-4 w-4/5 mt-12'>
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