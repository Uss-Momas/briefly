import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";


export default function ShortlinkAnonimous(params) {
    return (
        <div className='flex flex-col h-screen'>
            <Header />
            <main className='mb-auto mt-auto flex flex-col items-center'>
                <div className='flex flex-col gap-5 w-4/5 rounded-xl mt-5 p-8 px-24 bg-white'>
                    <h1 className='font-semibold text-lg'>Paste your link here to be shortened</h1>
                    <div className='flex flex-row items-center gap-8'>
                        <input type="text" className='basis-3/4 border rounded p-2 w-full border-blue-500' />
                        <button className='basis-1/4 rounded p-2 bg-blue-600 text-white'>Short Link</button>
                    </div>
                    <div className='flex flex-row border border-purple-600 rounded p-2 items-center'>
                        <input className='basis-4/5 disabled:bg-white disabled:text-zinc-500' type="text" disabled value={'briefly.com/asw7s'} />
                        <span className='basis-1/5'>copy</span>
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