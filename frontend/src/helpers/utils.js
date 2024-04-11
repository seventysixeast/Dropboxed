export const getSubdomainFromUrl = (url, baseUrl) => {
    const subdomainRegex = new RegExp(`^(http[s]?:\/\/)?([^\/]+)\\.${baseUrl.replace(/^https?:\/\//, '').replace(/\./g, '\\.')}`);
    const match = url.match(subdomainRegex);
    return match ? match[2] : null;
};