import { ChevronDown, Eye, LinkIcon, RefreshCcw } from "lucide-react";
import { getAllProtectedData } from "../../../utils/utils";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import AnalyticsCard from "../../../components/AnalyticsCard";
import Footer from "../../../components/Footer";
import MostClickLinksTable from "../../../components/MostClickLinksTable";
import UserHeader from "../../../components/UserHeader";

export default function Analytics() {
    const { auth } = useAuth();
    const [generalData, setGeneralData] = useState({ totalLinks: 0, totalClicks: 0, monthClicks: 0 });
    const [mostClicked, setMostClicked] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const [isLoadingGenData, setIsLoadingGenData] = useState(false);

    const triggerRefresh = () => setRefreshData((prev) => !prev);

    const loadData = async () => {
        try {
            setIsLoadingGenData(true);
            const { statistics } = await getAllProtectedData('/metrics/general-stats', auth.token);
            const { links } = await getAllProtectedData('/metrics/most-clicked', auth.token);
            setGeneralData(statistics);
            setMostClicked(links);
        } catch (error) {
            console.log('ANALYTCS PAGE ERROR', error);
        } finally {
            setIsLoadingGenData(false);
        }
    }

    useEffect(() => {
        loadData();
    }, [refreshData]);

    return (
        <div className="min-h-dvh bg-gradient-to-r from-zircon-50 via-zircon-100 to-zircon-50">
            <UserHeader />
            <main className="pt-16">
                <section className="bg-white/30 border border-purple-800/15 backdrop-blur-md rounded-lg shadow-lg p-4 mx-auto my-6 max-w-5xl sm:p-6 lg:p-8">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl text-gray-700 font-semibold">Your Links <span className="text-purple-600">Statistics</span></h1>
                        <div className="grid gap-4 w-full sm:grid-cols-3">
                            <AnalyticsCard icon={<LinkIcon className="w-5 h-5" />} title="Total Links" value={generalData.totalLinks} />
                            <AnalyticsCard icon={<Eye className="w-5 h-5" />} title="Total Clicks" value={generalData.totalClicks} />
                            <AnalyticsCard icon={<ChevronDown className="w-5 h-5" />} title="This Month" value={generalData.monthClicks} />
                        </div>
                    </div>
                </section>

                <section className="bg-white/30 border border-purple-800/15 backdrop-blur-md rounded-lg shadow-lg p-2 mx-auto my-6 max-w-5xl sm:p-6 lg:p-8">
                    <div className="flex flex-col gap-4 bg-white rounded-lg shadow-lg py-7 px-5">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl sm:text-2xl lg:text-3xl  text-gray-600 font-semibold leading-tight">
                                Most Clicked Links
                            </h1>
                            <button title="load table" onClick={triggerRefresh} className="text-gray-600 hover:text-purple-800 hover:scale-105 transform transition-all hover:rotate-45 duration-300">
                                <RefreshCcw className="size-6" />
                            </button>
                        </div>
                        <MostClickLinksTable isLoading={isLoadingGenData} mostClickedList={mostClicked} />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}