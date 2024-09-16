import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import useAuth from "@/hooks/useAuth";
import { LogOut, User } from "lucide-react";

export default function Header() {
    const navigate = useNavigate();
    const { isLoggedIn, auth, loading, logout } = useAuth();

    if (loading) {
        return (<div>Loading...</div>);
    }
    const user = auth.user;

    return (
        <nav className="flex justify-between items-center p-6 bg-white shadow-md">
            <div className="flex text-purple-600 gap-x-5 items-center">
                <Link to={'/'}>
                    <strong className="text-xl font-bold">LOGO</strong>
                </Link>
                {
                    !isLoggedIn ? (
                        <Link to={'/shortlink-anonimous'}>
                            <span>Link Shortener</span>
                        </Link>
                    ) : (
                        <Link to={'/shorturl'}>
                            <span>Link Shortener</span>
                        </Link>
                    )
                }
            </div>
            <div className="space-x-6">
                {
                    !isLoggedIn ? (<>
                        <Button onClick={() => navigate('/login')} className="text-purple-600 hover:bg-purple-100 border border-purple-700 px-4 py-2 rounded-full">Login</Button>
                        <Button onClick={() => navigate('/signup')} className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700">Sign up</Button>
                    </>) :
                        (<div className="relative group">
                            <button className="flex items-center gap-2">
                                <User className="w-6 h-6 text-zinc-500" />
                                <span>{user.name}</span>
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Link
                                    to="/profile"
                                    className="flex justify-between items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    <span>Profile</span>
                                    <User />
                                </Link>
                                <button
                                    onClick={() => { logout(); navigate('/login') }}
                                    className="flex justify-between items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    <span>Logout</span>
                                    <LogOut />
                                </button>
                            </div>
                        </div>)
                }
            </div>
        </nav>
    );
}