export default function Card({ icon, title, description }) {
    return (
        <div className="flex flex-col transition-transform ease-linear delay-75 hover:scale-105 items-center text-center bg-white shadow-lg rounded-lg gap-2 px-4 py-6">
            <div className="flex flex-col items-center gap-5">
                {icon}
                <h3 className="text-xl font-semibold mb-2 text-purple-800">
                    {title}
                </h3>
            </div>
            <p className="text-gray-600">
                {description}
            </p>
        </div>
    );
}