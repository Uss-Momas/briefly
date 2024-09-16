import { Link, useParams } from "react-router-dom";

export default function NotFoundPage() {
    const params = useParams();
    console.log(params);
    
    return (
        <div className="w-dvw h-dvh flex flex-col items-center justify-center text-center font-bold text-2xl">
            404 Not Found
            <Link to={'/'}>Home</Link>
        </div>
    );
}