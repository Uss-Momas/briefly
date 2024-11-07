import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

export default function RedirectLink() {
    const { code } = useParams();
    const [originalUrl, setOriginalUrl] = useState(undefined);

    async function getOriginalUrl() {
        try {
            console.log("antes");

            const response = await axios.get(`shortlinks/code/${code}`);
            setOriginalUrl(response.data.originalUrl);
            console.log("depois");

        } catch (error) {
            console.log("Redirect Link Page:", error);
        }
    }

    useEffect(() => {
        getOriginalUrl();
    }, [code]);

    if (!originalUrl) {
        return <>Is Loading...</>;
    }

    // Redirect the user to the original URL
    window.location.replace(originalUrl);
    return null;
}