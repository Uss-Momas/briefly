export default async function appendUrl(code) {
    const url = `${window.location.origin}/${code}`;
    return url;
}