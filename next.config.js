/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable MDX support
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Configure webpack for MDX
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: '@mdx-js/loader',
          options: {
            providerImportSource: '@mdx-js/react',
          },
        },
      ],
    });
    return config;
  },
  // Configure image domains
  images: {
    domains: [
      'images.unsplash.com',     // Unsplash images
      'source.unsplash.com',     // Unsplash source
      'picsum.photos',           // Lorem Picsum
      'via.placeholder.com',     // Placeholder.com
      'res.cloudinary.com',      // Cloudinary
      'lh3.googleusercontent.com', // Google user content
      'avatars.githubusercontent.com', // GitHub avatars
      'raw.githubusercontent.com',    // GitHub raw content
      'media.githubusercontent.com',  // GitHub media
      'github.com',                   // GitHub
      'githubusercontent.com',        // GitHub user content
      'imgur.com',                    // Imgur
      'i.imgur.com',                  // Imgur images
      'cdn.discordapp.com',           // Discord CDN
      'discord.com',                  // Discord
      'discordapp.com',               // Discord app
      'discordcdn.com',               // Discord CDN
      'cdn.jsdelivr.net',             // jsDelivr CDN
      'cdnjs.cloudflare.com',         // Cloudflare CDN
      'stackpath.bootstrapcdn.com',   // Bootstrap CDN
      'code.jquery.com',              // jQuery CDN
      'unpkg.com',                    // unpkg CDN
      'npmjs.com',                    // npm
      'npmcdn.com',                   // npm CDN
      'vercel.com',                   // Vercel
      'vercel.app',                   // Vercel app
      'vercel.sh',                    // Vercel shared
      'vercelusercontent.com',        // Vercel user content
      'lf32.vercel.app',              // Your Vercel app
      'lf32-dev.vercel.app',          // Your dev Vercel app
      'www.trentonsystems.com',       // Trenton Systems
      'trentonsystems.com',           // Trenton Systems (without www)
      'cms.recordedfuture.com',       // Recorded Future CMS
      'www.bleepstatic.com',          // Bleeping Computer
      'bleepstatic.com'               // Bleeping Computer (without www)
    ],
    // Optional: Configure image sizes for better performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Optional: Configure image formats
    formats: ['image/webp', 'image/avif'],
    // Optional: Configure minimum cache TTL
    minimumCacheTTL: 60,
  },
}

module.exports = nextConfig 