export default function AnalyticsCard({ icon, title, value }) {
    return (
        <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white shadow-lg py-5 px-4">
            <div className="bg-purple-100 rounded-lg text-purple-500 p-2">
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-gray-500 text-sm">{title}</span>
                <span className="font-medium">{value}</span>
            </div>
        </div>
    );
}