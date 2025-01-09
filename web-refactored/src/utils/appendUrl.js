export default function appendUrl(code) {
    const url = `${window.location.origin}/${code}`;
    return url;
}