import axios from "../api/axios";

export async function copyToClipboard(text) {
    return await navigator.clipboard.writeText(text);
}

export async function getProtectedData(url, token) {
    const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
}

export async function getAllProtectedData(url, token) {
    const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
}

export async function deleteProtected(url, token) {
    const response = await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
    return response;
}