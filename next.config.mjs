/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Only ignore handlebars on client-side
        if (!isServer) {
            config.resolve.alias = {
                ...config.resolve.alias,
                handlebars: false
            }
        }
        return config
    }
};

export default nextConfig;
