import { ChevronDown, Eye, LinkIcon, LoaderCircle, RefreshCcw } from "lucide-react";
import AdminUrlTable from "../../../components/AdminUrlTable";
import Footer from "../../../components/Footer";
import UserHeader from "../../../components/UserHeader";
import { useEffect, useState } from "react";
import AnalyticsCard from "../../../components/AnalyticsCard";
import { getAllProtectedData } from "../../../utils/utils";
import { useAuth } from "../../../hooks/useAuth";
import appendUrl from "../../../utils/appendUrl";

export default function AllLinks() {
    const { auth } = useAuth();
    const [generalData, setGeneralData] = useState({ totalLinks: 0, totalClicks: 0, monthClicks: 0 });
    const [mostClicked, setMostClicked] = useState([]);
    const [refreshData, setRefreshData] = useState(false);

    const triggerRefresh = () => setRefreshData((prev) => !prev);

    const loadData = async () => {
        try {
            const { statistics } = await getAllProtectedData('/admin/metrics/general-stats', auth.token);
            const { shortlinks } = await getAllProtectedData('/admin/metrics/most-clicked', auth.token);
            console.log(shortlinks);
            setMostClicked(shortlinks);
            setGeneralData(statistics);
        } catch (error) {
            console.log('all links page error:', error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="min-h-dvh bg-gradient-to-r from-zircon-50 via-zircon-100 to-zircon-50">
            <UserHeader />
            <main>
                <section className="bg-white/30 border border-purple-800/15 backdrop-blur-md rounded-lg shadow-lg p-4 mx-auto my-6 max-w-5xl sm:p-6 lg:p-8">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl text-gray-700 font-semibold">Links <span className="text-purple-600">Statistics</span></h1>
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
                            <button title="load table" onClick={() => { }} className="text-gray-600 hover:text-purple-800 hover:scale-105 transform transition-all hover:rotate-45 duration-300">
                                <RefreshCcw className="size-6" />
                            </button>
                        </div>
                        <div className="bg-white border rounded-lg overflow-x-auto shadow-md">
                            <table className="divide-y w-full min-w-[600px] divide-gray-200">
                                <thead className="bg-gray-100 rounded-lg">
                                    <tr>
                                        <th className="text-left text-sm text-gray-600 font-medium py-3 px-4">Original Link</th>
                                        <th className="text-left text-sm text-gray-600 font-medium py-3 px-4">Short Link</th>
                                        <th className="text-center text-sm text-gray-600 font-medium py-3 px-4">Clicks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        mostClicked.length === 0 ? <tr>
                                            <td colSpan={3} className="text-center text-gray-400 p-4 text-sm">No data</td>
                                        </tr> : (
                                            mostClicked.map((item, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td className="text-left text-sm truncate max-w-[300px] px-4 py-3">
                                                            <span>{item.originalUrl}</span>
                                                        </td>
                                                        <td className="text-left text-sm text-purple-600 px-4 py-3">
                                                            <span>{appendUrl(item.code)}</span>
                                                        </td>
                                                        <td className="text-center text-sm px-4 py-3">
                                                            {item.clicks}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                <section className="bg-white/30 border border-purple-800/15 rounded-lg shadow-lg p-4 mx-auto my-6 max-w-5xl sm:p-6 lg:p-8">
                    <div className="flex flex-col gap-4 bg-white shadow-lg rounded-lg overflow-x-auto p-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl sm:text-2xl lg:text-3xl  text-gray-600 font-semibold leading-tight">
                                All Links
                            </h1>
                            <button title="load table" onClick={triggerRefresh} className="text-gray-600 hover:text-purple-800 hover:scale-105 transform transition-all hover:rotate-45 duration-300">
                                <RefreshCcw className="size-6" />
                            </button>
                        </div>
                        <AdminUrlTable refreshTrigger={() => { }} />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}