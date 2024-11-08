import { AlignJustify, ArrowRight, ChartNoAxesColumn, Link2, Linkedin, LinkedinIcon, LinkIcon, LockIcon, LucideLink, Mail, MessageCircle, Twitter, X } from "lucide-react";
import { copyToClipboard } from "../../utils/utils";
import { Link } from "react-router-dom";
import { shortURLAnon } from "../../Validations/validations";
import { useAuth } from '../../hooks/useAuth';
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../../api/axios";
import Card from "../../components/Card";
import ProfilePicture from "../../assets/riscos.webp";
import appendUrl from "../../utils/appendUrl";

export default function Home() {
    const [mobileNav, setMobileNav] = useState(false);
    const { auth, isLoading } = useAuth();
    const [shortUrl, setShortUrl] = useState(undefined);
    const [isCopied, setIsCopied] = useState(false);
    const { formState: { errors }, handleSubmit, register, setError, clearErrors } = useForm({
        resolver: zodResolver(shortURLAnon),
    });

    if (isLoading) return <>Loading....</>;

    const handleMenuClick = (event) => {
        event.preventDefault();
        setMobileNav(!mobileNav);
    }

    const handleUrlShortening = async (data) => {
        try {
            const response = await axios.post("/shortlinks/anonimous", data);
            const { shortlink } = response.data;
            const url = await appendUrl(shortlink.code);
            setShortUrl(url);
        } catch (error) {
            if (error.response) {
                const errorResponse = error.response.data;
                const { errors = [], message } = errorResponse;
                const errorMessages = errors.map((e) => e.message);
                setError("root", { message: [message, ...errorMessages] });
                setTimeout(clearErrors, 2500);
                console.log("Landing Page errors: ", errorResponse);
            } else {
                console.log("Landing Page errors: ", error);
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
        <div className="min-h-dvh bg-gradient-to-r from-zircon-50 via-zircon-100 to-zircon-50">
            <header className="fixed w-full h-16 z-50 bg-white shadow-md">
                <nav>
                    <div className="flex items-center justify-between p-2 sm:px-16 sm:py-4">
                        <a href="">
                            <span className="text-purple-700 text-2xl font-bold" >Briefly</span>
                        </a>
                        <ul className="flex gap-2 items-center max-sm:hidden transition ease-in-out">
                            <li className="text-gray-500 p-2 hover:bg-gray-50 hover:rounded-md hover:text-purple-500 px-4 py-2">
                                <a href="#about" className="">about</a>
                            </li>
                            <li className="text-gray-500 p-2 hover:bg-gray-50 hover:rounded-md hover:text-purple-500 px-4 py-2">
                                <a href="#services" className="">services</a>
                            </li>
                            <li>
                                <Link to={'/login'}>
                                    <button className="transition ease-in-out delay-100 border-purple-500 rounded-md hover:bg-purple-700 hover:text-white hover:scale-105 px-4 py-2">Log In</button>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/signup'}>
                                    <button className="transition ease-in-out delay-100 bg-purple-700 text-white hover:bg-purple-600 hover:scale-105 rounded-md px-4 py-2">Sign Up</button>
                                </Link>
                            </li>
                        </ul>
                        <button onClick={handleMenuClick} className="sm:hidden text-zinc-600 border-2 border-white  p-2 hover:text-purple-600 hover:bg-zinc-200 hover:rounded-lg hover:border-2 hover:border-purple-600" >
                            {mobileNav ? <X /> : <AlignJustify />}
                        </button>
                    </div>
                    {mobileNav && (
                        <ul className="sm:hidden flex flex-col gap-2 absolute bg-white w-full">
                            <li className="text-gray-500 p-2 hover:bg-gray-50">
                                <a href="#about">About</a>
                            </li>
                            <li className="text-gray-500 p-2 hover:bg-gray-50">
                                <a href="#services">Services</a>
                            </li>
                            {
                                !auth ?
                                    (<>
                                        <li className="text-purple-500 p-2 hover:bg-gray-50">
                                            <Link to={`/login`}>Log In</Link>
                                        </li>
                                        <li className="text-purple-500 p-2 hover:bg-gray-50">
                                            <Link to={`/signup`}>Sign Up</Link>
                                        </li>
                                    </>) : (
                                        <li className="text-purple-500 p-2 hover:bg-gray-50">
                                            <Link to={`/auth/dashboard`}>Dashboard</Link>
                                        </li>
                                    )
                            }
                        </ul>
                    )}
                </nav>
            </header>
            <main className="pt-16">
                {/* TO SHORT ANONYMOUSLY */}
                <section id="home" className="bg-gradient-to-br from-purple-800 to-purple-600 flex flex-col items-center gap-8 py-20 px-5 scroll-mt-16">
                    <div className="flex flex-col gap-4 text-center max-w-2xl ">
                        <h1 className="text-white font-bold text-3xl leading-tight">
                            Transform Long URLs Into
                            <span className="block">Short Links Instantly</span>
                        </h1>
                        <p className="text-white/90 text-lg font-medium">
                            Free tool to shorten URLs and create memorable, shareable links in seconds
                        </p>
                    </div>
                    {
                        !auth && (<>
                            <form onSubmit={handleSubmit(handleUrlShortening)} className="flex flex-col gap-4 sm:flex-row w-full max-w-lg">
                                <div className="flex flex-col gap-2  sm:w-4/6">
                                    <div className="flex-1 relative">
                                        <LinkIcon className="absolute left-3 top-1/4 text-gray-400 w-5 h-5" />
                                        <input {...register("originalUrl")} aria-invalid={errors.originalUrl ? "true" : "false"} className="w-full border border-purple-600 outline-none focus:ring-2 focus:ring-purple-300 shadow-sm rounded-lg  aria-[invalid=true]:border-yellow-300 aria-[invalid=true]:ring-yellow-500 py-3 px-4 pl-10" type="text" placeholder="Paste your long URL here..." />
                                    </div>
                                    <span className="text-sm text-yellow-300">{errors.originalUrl && errors.originalUrl.message}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button className="bg-white text-purple-600 rounded-lg font-semibold transition-all shadow-md hover:bg-purple-50 hover:shadow-lg hover:scale-95 duration-150 py-3 px-8 sm:px-6" type="submit">Shorten URL</button>
                                    <span className="text-sm text-yellow-300">{errors.root && errors.root.message[errors.root.message.length - 1]}</span>
                                </div>
                            </form>

                            <div className="bg-white/10 backdrop-blur-sm rounded-lg 
                        flex items-center justify-between 
                        py-3 px-4 text-white">
                                {
                                    shortUrl ? (<a href={shortUrl} target="_blank" className="group-hover:text-white/80 
                           transition-colors hover:underline">
                                        {shortUrl}
                                    </a>) : (
                                        <span className="group-hover:text-white/80 
                                        transition-colors">shortened url... </span>
                                    )
                                }
                                <button onClick={handleShortUrlCopy} className="text-sm bg-white/20 hover:bg-white/30 
                               rounded-md py-1 px-3 ml-2 transition-colors disabled:bg-gray-100/70" disabled={shortUrl ? false : true}>
                                    {
                                        !isCopied ? "Copy" : "Copied!"
                                    }
                                </button>
                            </div>
                        </>)
                    }

                    <div className="mt-8 text-center">
                        <p className="text-white/90 text-lg font-medium mb-4">
                            Want custom branded links and detailed analytics?
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                            <Link to={`${!auth ? "/signup" : "/auth/dashboard"}`}>
                                <button className="flex items-center gap-2 bg-white text-purple-600 rounded-lg font-semibold transition-all shadow-md hover:bg-purple-50 hover:shadow-lg hover:scale-105 duration-150 py-3 px-8">
                                    {!auth ? "Get Started for Free" : "Go to dashboard & Start shortening"}
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>
                            <a href="#services" className="text-white hover:text-white/80 transition-colors">
                                Learn more about Pro features
                            </a>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="flex flex-col items-center gap-10 bg-white/30 border border-purple-800/15 backdrop-blur-md rounded-lg mt-4 mx-4 p-4 scroll-mt-16">
                    <div className="text-center flex flex-col gap-2">
                        <h2 className="text-3xl font-bold text-gray-800 leading-tight">
                            Simplify Your Digital Presence
                            <span className="block text-purple-600">With Powerful Link Solutions</span>
                        </h2>
                        <p className="text-gray-600 text-lg max-w-xl mx-auto">
                            Unlock the potential of your links with our comprehensive suite of URL management tools designed to enhance your online strategy.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        <Card icon={<LucideLink className="text-purple-800" size={40} />} title={"URL Shortening"} description={"Transform long, complex URLs into concise, shareable links. Our advanced shortening technology ensures quick generation and maximum compatibility across all platforms and devices."} />
                        <Card icon={<ChartNoAxesColumn className="text-purple-800" size={40} />}
                            title={"Link Analytics"}
                            description={"Gain deep insights into your link performance with comprehensive analytics. Track clicks, geographic data, referral sources, and engagement metrics to optimize your online strategy."}
                        />
                        <Card
                            icon={<LockIcon className="text-purple-800" size={40} />}
                            title={"Link Protection"}
                            description={"Secure your shortened links with advanced protection features. Set custom passwords, limit access, create expiration dates, and prevent unauthorized link sharing."}
                        />
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="flex flex-col items-center gap-10 bg-white/30 border border-purple-800/15 backdrop-blur-md rounded-lg mt-4 mx-4 mb-4 p-4 scroll-mt-16">
                    <div className="text-center flex flex-col gap-2">
                        <h2 className="text-3xl font-bold text-gray-800 leading-tight">
                            Meet Our
                            <span className="text-purple-600"> Team</span>
                        </h2>
                        <p className="text-gray-600 text-lg max-w-xl mx-auto">
                            Simplifying links. Connecting people. Making the web easier.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        <div className="flex flex-col transition-transform ease-linear delay-75 hover:scale-105 items-center text-center bg-white shadow-lg rounded-lg gap-5 px-4 py-6">
                            <div className="flex flex-col items-center gap-4">
                                <img src={ProfilePicture} alt="profile-picture" className="object-cover object-top rounded-full w-32 h-32 border border-red-200" />
                                <div className="flex flex-col items-center gap-1">
                                    <h3 className="text-xl font-semibold text-purple-800">
                                        Ussumane Momade
                                    </h3>
                                    <h4 className="text-gray-600 font-medium">
                                        Founder & Software Engineer
                                    </h4>
                                </div>
                            </div>
                            <p className="text-gray-600 text-center max-w-lg">
                                A passionate Junior Software Engineer dedicated to Backend Development and empowering young tech enthusiasts. Driven by innovation, committed to the creation of solutions that solve real-world problems and inspire the next generation of developers.
                            </p>
                            <div className="flex items-center gap-4">
                                <a href="https://www.linkedin.com/in/ussumane-momade-6812031ab" target="_blank"><Linkedin className="text-gray-600 hover:text-purple-600" /> </a>
                                <a href="https://x.com/UssumaneMomade" target="_blank"><Twitter className="text-gray-600 hover:text-purple-600" /> </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* GET STARTED */}
                <section className="bg-gradient-to-br from-purple-800 to-purple-600 flex flex-col items-center gap-8 py-20 px-5">
                    <div className="flex flex-col gap-4 text-center max-w-2xl">
                        <h1 className="text-white font-bold text-3xl leading-tight">
                            Ready to Simplify Your Links?
                        </h1>
                        <p className="text-white/90 text-lg font-medium">
                            Join a group of users who've already streamlined their online presence. Start creating smarter, shorter links today — it's free and takes less than a minute!
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                        <Link to={`${!auth ? "/signup" : "/auth/dashboard"}`}>
                            <button className="flex items-center gap-2 bg-white text-purple-600 rounded-lg font-semibold transition-all shadow-md hover:bg-purple-50 hover:shadow-lg hover:scale-105 duration-150 py-3 px-8">
                                {!auth ? "Get Started for Free" : "Go to dashboard & Start shortening"}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
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