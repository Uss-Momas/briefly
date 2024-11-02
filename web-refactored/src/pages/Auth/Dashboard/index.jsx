import { AlignJustify, ChartNoAxesColumnIcon, CheckCircle, Copy, ExternalLink, Linkedin, LinkIcon, LucideLink, Mail, MessageCircle, Trash2, Twitter, User, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const [mobileNav, setMobileNav] = useState(false);

    const handleMenuClick = (event) => {
        event.preventDefault();
        setMobileNav(!mobileNav);
    }

    return (
        <div className="min-h-dvh bg-gradient-to-r from-zircon-50 via-zircon-100 to-zircon-50">
            <header className="fixed w-full h-16 z-50 bg-white shadow-md">
                <nav>
                    <div className="flex items-center justify-between p-2 sm:px-16 sm:py-4">
                        <Link to={"/"}>
                            <span className="text-purple-700 text-2xl font-bold" >Briefly</span>
                        </Link>
                        <ul className="flex gap-3 items-center max-sm:hidden transition ease-in-out">
                            <li>
                                <Link to={"/auth/dashboard"} className="flex items-center text-gray-600 text-base font-medium hover:text-purple-800 hover:bg-gray-100 rounded-lg px-3 py-2">
                                    <LucideLink className="h-6 w-6 mr-2" />
                                    <p>Links</p>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/auth/analytics"} className="flex items-center text-gray-600 text-base font-medium hover:text-purple-800 hover:bg-gray-100 rounded-lg px-3 py-2">
                                    <ChartNoAxesColumnIcon className="h-6 w-6 mr-2" />
                                    <p>Analytics</p>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/auth/profile"} className="flex items-center text-gray-600 text-base font-medium hover:text-purple-800 hover:bg-gray-100 rounded-lg px-3 py-2">
                                    <User className="h-6 w-6 mr-2" />
                                    <p>Profile</p>
                                </Link>
                            </li>
                        </ul>
                        <button onClick={handleMenuClick} className="sm:hidden text-zinc-600 border-2 border-white  p-2 hover:text-purple-600 hover:bg-zinc-200 hover:rounded-lg hover:border-2 hover:border-purple-600" >
                            {mobileNav ? <X /> : <AlignJustify />}
                        </button>
                    </div>
                    {mobileNav && (
                        <ul className="sm:hidden flex flex-col gap-2 absolute bg-white w-full">
                            <li>
                                <Link to={"/auth/dashboard"} className="flex justify-center items-center text-gray-600 text-base font-medium hover:text-purple-800 hover:bg-gray-100 rounded-lg px-3 py-2">
                                    <LucideLink className="h-6 w-6 mr-2" />
                                    <p>Links</p>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/auth/analytics"} className="flex justify-center items-center text-gray-600 text-base font-medium hover:text-purple-800 hover:bg-gray-100 rounded-lg px-3 py-2">
                                    <ChartNoAxesColumnIcon className="h-6 w-6 mr-2" />
                                    <p>Analytics</p>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/auth/profile"} className="flex justify-center items-center text-gray-600 text-base font-medium hover:text-purple-800 hover:bg-gray-100 rounded-lg px-3 py-2">
                                    <User className="h-6 w-6 mr-2" />
                                    <p>Profile</p>
                                </Link>
                            </li>
                        </ul>
                    )}
                </nav>
            </header>
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
            <footer className="bg-zinc-900/90 text-white py-12 px-6">
                <div className="flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-10 sm:flex-row">
                        <section className="flex flex-col gap-4">
                            <h1 className="text-xl font-semibold">Briefly</h1>
                            <div className="flex gap-4 text-gray-500">
                                <a href="https://google.com" target="_blank"><Linkedin className="hover:text-white" /></a>
                                <a href="https://google.com" target="_blank"><Twitter className="hover:text-white" /></a>
                                <a href="https://google.com" target="_blank"><MessageCircle className="hover:text-white" /></a>
                            </div>
                            <div className="flex gap-4 text-gray-500 hover:text-white">
                                <Mail />
                                <a href="mailto:contact@briefly.com"><p>contact@briefly.com</p></a>
                            </div>
                        </section>
                        <section className="flex flex-col gap-4">
                            <h2 className="text-lg font-medium">Quick Links</h2>
                            <nav className="text-gray-500">
                                <ul className="flex flex-col gap-4">
                                    <li>
                                        <a href="#about" className="hover:text-white">About Us</a>
                                    </li>
                                    <li>
                                        <a href="#services" className="hover:text-white">Our Services</a>
                                    </li>
                                </ul>
                            </nav>
                        </section>
                    </div>
                    <div className="flex flex-col gap-4 text-gray-500 text-center">
                        <hr className="border-gray-500" />
                        <p>&copy; 2024 Briefly. All Rights Reserved</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}