import appendUrl from "../../utils/appendUrl";
import Spinner from "../Spinner";

export default function MostClickLinksTable({ isLoading = false, mostClickedList = [], }) {
    return (
        <div className="bg-white border rounded-lg overflow-x-auto shadow-md">
            <table className="divide-y w-full min-w-[600px] divide-gray-200">
                <thead className="bg-gray-100 rounded-lg">
                    <tr>
                        <th className="text-left text-sm text-gray-600 font-medium py-3 px-4">Rank</th>
                        <th className="text-left text-sm text-gray-600 font-medium py-3 px-4">Original Link</th>
                        <th className="text-left text-sm text-gray-600 font-medium py-3 px-4">Short Link</th>
                        <th className="text-center text-sm text-gray-600 font-medium py-3 px-4">Clicks</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isLoading ? (
                            <tr>
                                <td colSpan={4} className="py-10">
                                    <Spinner size={35} color="text-purple-700" />
                                </td>
                            </tr>
                        ) :
                            (mostClickedList.length === 0 ? <tr>
                                <td colSpan={4} className="text-center text-gray-400 p-4 text-sm">No data</td>
                            </tr> : (
                                mostClickedList.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className="text-center text-sm px-4 py-3">
                                                {key + 1}
                                            </td>
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
                            ))
                    }
                </tbody>
            </table>
        </div>
    );
}