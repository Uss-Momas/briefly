import { Copy, ExternalLink, LinkIcon, Trash2, } from "lucide-react";
import Footer from "../../../components/Footer";
import UserHeader from "../../../components/UserHeader";

export default function Dashboard() {

    return (
        <div className="min-h-dvh bg-gradient-to-r from-zircon-50 via-zircon-100 to-zircon-50">
            <UserHeader />
            <main className="pt-16">
                <section className="bg-white/30 border border-purple-800/15 backdrop-blur-md rounded-lg shadow-lg p-4 mx-auto my-6 max-w-5xl sm:p-6 lg:p-8">
                    <div className="flex flex-col gap-6 items-center ">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center text-gray-600 font-bold leading-tight">
                            Transform Long URLs Into
                            <span className="block text-purple-600">Short Links Instantly</span>
                        </h1>
                        <div className="flex flex-col gap-4 w-full sm:gap-4 md:flex-row md:items-center my-4">
                            <div className="relative flex-1">
                                <LinkIcon className="absolute text-gray-500 top-1/2 -translate-y-1/2 left-3 h-5 w-5" />
                                <input className="border border-purple-600/50 outline-none rounded-lg focus:ring-2 focus:ring-purple-600/25 focus:bg-purple-50 transition-all w-full px-10 py-3" type="url" name="url" placeholder="https://google.com" required />
                            </div>
                            <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg w-full md:w-auto md:whitespace-nowrap transition-transform ease-in hover:scale-105 delay-75 px-6 py-3">Shorten URL</button>
                        </div>
                        <div className="flex items-center justify-center gap-4 text-white bg-gradient-to-br from-purple-600/90 via-purple-500/90 to-purple-700/90 max-md:w-full shadow-lg rounded-lg py-3 px-4 ">
                            <span className="font-medium break-all">https://short.url/abc123</span>
                            <button className="group flex items-center gap-2 backdrop-blur-sm bg-white/20 hover:bg-white/30 active:bg-white/5 transition-all rounded-lg p-2 duration-200">
                                <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span>Copy URL</span>
                            </button>
                        </div>
                    </div>
                </section>
                <section className="bg-white/30 border border-purple-800/15 backdrop-blur-md rounded-lg shadow-lg p-4 mx-auto my-6 max-w-5xl sm:p-6 lg:p-8">
                    <div className="flex flex-col gap-4 bg-white shadow-lg rounded-lg overflow-x-auto p-4">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl  text-gray-600 font-semibold leading-tight">
                            Your URLs Here
                        </h1>
                        <div className="border overflow-x-auto rounded-lg">
                            <table className="w-full min-w-[600px] divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left text-sm font-medium text-gray-800 px-4 py-3">Original URL</th>
                                        <th className="text-left text-sm font-medium text-gray-800 px-4 py-3">Short Link</th>
                                        <th className="text-left text-sm font-medium text-gray-800 px-4 py-3">Created</th>
                                        <th className="text-center text-sm font-medium text-gray-800 px-4 py-3">Clicks</th>
                                        <th className="text-center text-sm font-medium text-gray-800 px-4 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm truncate max-w-[300px] transition-transform delay-75" title="https://really-long-original-url.com/with/very/long/path/example">
                                            https://really-long-original-url.com/with/very/long/path/example
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <a className="text-purple-600">https://shorturl.com/XydA</a>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-500 min-w-[115px]">
                                            02-11-2024
                                        </td>
                                        <td className="px-4 py-3 text-sm text-center">100</td>
                                        <td className="px-4 py-3 text-sm">
                                            <div className="flex justify-end gap-2">
                                                <button className="hover:bg-gray-100 rounded-lg p-2" title="Open original link">
                                                    <ExternalLink className="w-4 h-4 text-gray-500" />
                                                </button>
                                                <button className="hover:bg-red-50 rounded-lg p-2" title="Delete link">
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}