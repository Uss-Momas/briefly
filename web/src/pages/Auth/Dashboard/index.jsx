import Footer from "../../../components/Footer";
import UserHeader from "../../../components/UserHeader";
import UrlShortenerCard from "../../../components/UrlShortenerCard";
import UrlTable from "../../../components/UrlTable";
import { useState } from "react";
import { RefreshCcw } from "lucide-react";

export default function Dashboard() {
    const [refreshData, setRefreshData] = useState(false);

    const triggerRefresh = () => setRefreshData((prev) => !prev);

    return (
        <div className="min-h-dvh relative bg-gradient-to-r from-zircon-50 via-zircon-100 to-zircon-50">
            <UserHeader />
            <main className="pt-16 ">
                <UrlShortenerCard onShortlinkCreated={triggerRefresh} className="bg-white/30 border border-purple-800/15 backdrop-blur-md rounded-lg shadow-lg p-4 mx-auto my-6 max-w-5xl sm:p-6 lg:p-8" />
                <section className="bg-white/30 border border-purple-800/15 rounded-lg shadow-lg p-4 mx-auto my-6 max-w-5xl sm:p-6 lg:p-8">
                    <div className="flex flex-col gap-4 bg-white shadow-lg rounded-lg overflow-x-auto p-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl sm:text-2xl lg:text-3xl  text-gray-600 font-semibold leading-tight">
                                Your URLs Here
                            </h1>
                            <button title="load table" onClick={triggerRefresh} className="text-gray-600 hover:text-purple-800 hover:scale-105 transform transition-all hover:rotate-45 duration-300">
                                <RefreshCcw className="size-6" />
                            </button>
                        </div>
                        <UrlTable refreshTrigger={refreshData} />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}