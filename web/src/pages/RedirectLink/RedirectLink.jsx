import axios from "@/api/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RedirectLink() {
    const { code } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [originalUrl, setOriginalUrl] = useState(null);

    async function loadOriginalUrl() {
        try {
            const response = await axios.get(`/shortlinks/code/${code}`, { headers: { "Content-Type": 'application/json' } });
            console.log(response);
            const data = response.data;
            setOriginalUrl(data.originalUrl);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadOriginalUrl();
    }, []);

    if (isLoading) return <div>Loading...</div>

    window.location.href = originalUrl;
    return (
        <div></div>
    );
}