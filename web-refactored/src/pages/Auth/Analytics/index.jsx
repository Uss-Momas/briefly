import { ChevronDown, Eye, LinkIcon } from "lucide-react";
import Footer from "../../../components/Footer";
import UserHeader from "../../../components/UserHeader";
import AnalyticsCard from "../../../components/AnalyticsCard";

export default function Analytics() {
    return (
        <div className="min-h-dvh bg-gradient-to-r from-zircon-50 via-zircon-100 to-zircon-50">
            <UserHeader />
            <main className="pt-16">
                <section className="bg-white/30 border border-purple-800/15 backdrop-blur-md rounded-lg shadow-lg p-4 mx-auto my-6 max-w-5xl sm:p-6 lg:p-8">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl text-gray-700 font-semibold">Your Links <span className="text-purple-600">Statistics</span></h1>
                        <div className="grid gap-4 w-full sm:grid-cols-3">
                            <AnalyticsCard icon={<LinkIcon className="w-5 h-5" />} title="Total Links" value="24" />
                            <AnalyticsCard icon={<Eye className="w-5 h-5" />} title="Total Clicks" value="1,234" />
                            <AnalyticsCard icon={<ChevronDown className="w-5 h-5" />} title="This Month" value="256" />
                        </div>
                    </div>
                </section>

                <section className="bg-white/30 border border-purple-800/15 backdrop-blur-md rounded-lg shadow-lg p-2 mx-auto my-6 max-w-5xl sm:p-6 lg:p-8">
                    <div className="flex flex-col gap-4 bg-white rounded-lg shadow-lg py-7 px-5">
                        <h1 className="text-2xl text-gray-700 font-semibold">Most Clicked Links</h1>
                        <div className="bg-white border rounded-lg overflow-x-auto shadow-md">
                            <table className="divide-y w-full min-w-[600px] divide-gray-200">
                                <thead className="bg-gray-100 rounded-lg">
                                    <th className="text-left text-sm text-gray-600 font-medium py-3 px-4">Original Link</th>
                                    <th className="text-left text-sm text-gray-600 font-medium py-3 px-4">Short Link</th>
                                    <th className="text-center text-sm text-gray-600 font-medium py-3 px-4">Clicks</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-left text-sm truncate max-w-[300px] px-4 py-3">
                                            <span>https://really-long-original-url.com/with/very/long/path/example</span>
                                        </td>
                                        <td className="text-left text-sm text-purple-600 px-4 py-3">
                                            <span>http://short.ly/AsdeEA</span>
                                        </td>
                                        <td className="text-center text-sm px-4 py-3">
                                            10000
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