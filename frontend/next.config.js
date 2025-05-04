/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // wildcard for all domains
            },]
        // domains: ['agro-news.onrender.com', 'www.agri-tecno.com', '*', 'google.com', 'www.google.com', 'opportunityinternational.ca'],
    },
};

module.exports = nextConfig;
