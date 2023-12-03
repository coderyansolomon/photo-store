/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'djkhyeelinbdqmntpfkp.supabase.co'
            }
        ]
    }
}

module.exports = nextConfig
