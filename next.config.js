/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Performance optimizations
  compress: true,
  poweredByHeader: false,

  // ✅ Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c.animaapp.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com", // ✅ added youtube image host
      },
    ],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: process.env.NODE_ENV === "development" ? 0 : 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ✅ Experimental features for better performance
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@heroicons/react",
      "react-icons",
    ],
  },

  // Turbopack configuration
  // All images converted to .webp format for better performance and Turbopack compatibility
  turbopack: {
    resolveExtensions: [
      ".js",
      ".jsx",
      ".json",
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".svg",
      ".webp",
      ".avif",
    ],
  },

  // ✅ SEO Redirects: 301 Permanent Redirects from old /inheritance/ URLs to new /service/ URLs
  async redirects() {
    return [
      {
        source: "/inheritance/private-limited-company",
        destination: "/service/private-limited-company",
        permanent: true, // 301 redirect
      },
      {
        source: "/inheritance/limited-liability-partnership",
        destination: "/service/limited-liability-partnership",
        permanent: true,
      },
      {
        source: "/inheritance/one-person-company",
        destination: "/service/one-person-company",
        permanent: true,
      },
      {
        source: "/inheritance/registered-partnership",
        destination: "/service/registered-partnership",
        permanent: true,
      },
      {
        source: "/inheritance/gst-certificate",
        destination: "/service/gst-certificate",
        permanent: true,
      },
      {
        source: "/inheritance/company-compliances",
        destination: "/service/company-compliances",
        permanent: true,
      },
      {
        source: "/inheritance/startup-india-certificate",
        destination: "/service/startup-india-certificate",
        permanent: true,
      },
      {
        source: "/inheritance/udyam-certificate-msme",
        destination: "/service/udyam-certificate-msme",
        permanent: true,
      },
      {
        source: "/inheritance/import-export-code",
        destination: "/service/import-export-code",
        permanent: true,
      },
      {
        source: "/inheritance/icegate-registration",
        destination: "/service/icegate-registration",
        permanent: true,
      },
      {
        source: "/inheritance/startup-india-seedfund",
        destination: "/service/startup-india-seedfund",
        permanent: true,
      },
      {
        source: "/inheritance/rkvy-raftaar",
        destination: "/service/rkvy-raftaar",
        permanent: true,
      },
      {
        source: "/inheritance/naiff",
        destination: "/service/naiff",
        permanent: true,
      },
      {
        source: "/inheritance/pmegp",
        destination: "/service/pmegp",
        permanent: true,
      },
      {
        source: "/inheritance/cgtmse",
        destination: "/service/cgtmse",
        permanent: true,
      },
      {
        source: "/inheritance/mudra-loan",
        destination: "/service/mudra-loan",
        permanent: true,
      },
      {
        source: "/inheritance/startup-seed-support",
        destination: "/service/startup-seed-support",
        permanent: true,
      },
      {
        source: "/inheritance/project-finance",
        destination: "/service/project-finance",
        permanent: true,
      },
      {
        source: "/inheritance/venture-capital-funds",
        destination: "/service/venture-capital-funds",
        permanent: true,
      },
      // ✅ Redirect old /about/festival/ URLs to new /about/events/ URLs
      {
        source: "/about/festival/:slug*",
        destination: "/about/events/:slug*",
        permanent: true, // 301 redirect
      },
    ];
  },

  // ✅ Headers for better caching and security
  
};

module.exports = nextConfig;
