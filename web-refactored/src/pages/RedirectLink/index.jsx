import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

export default function RedirectLink() {
    const { code } = useParams();
    const [originalUrl, setOriginalUrl] = useState(undefined);

    async function getOriginalUrl() {
        try {
            const response = await axios.get(`shortlinks/code/${code}`);
            const originalUrl = response.data.originalUrl;
            if (originalUrl.includes("http")) {
                setOriginalUrl(originalUrl);
            } else {
                setOriginalUrl(`https://${originalUrl}`);
            }

        } catch (error) {
            console.log("Redirect Link Page:", error);
        }
    }

    useEffect(() => {
        getOriginalUrl();
    }, []);

    if (!originalUrl) {
        return <>Is Loading...</>;
    }

    window.location.href = originalUrl;
    return null;
}