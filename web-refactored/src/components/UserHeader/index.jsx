import { AlignJustify, ChartNoAxesColumnIcon, LucideLink, User, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserHeader() {
    const [mobileNav, setMobileNav] = useState(false);

    const handleMenuClick = (event) => {
        event.preventDefault();
        setMobileNav(!mobileNav);
    }

    return (
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
                    <ul className="sm:hidden flex flex-col gap-2 absolute bg-white w-full shadow-md">
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
    );
}