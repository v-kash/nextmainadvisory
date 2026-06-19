import Script from "next/script";
import Hero from "../components/blog/Hero";
import { Header } from "../components/Header";
import Blog from "../components/blog/Blog";
import CTA from "../components/blog/CTA";
import Footer from "../components/Footer";
import { getAllBlogs } from "./data/blogData";
import "./page.css";

export const metadata = {
  title: "Business Insights & Startup Blogs | NextGen Advisory",
  description:
    "Read expert blogs on startups, MSME growth, funding, compliance, and business strategy by NextGen Startup Advisory.",

  alternates: {
    canonical: "https://www.nextgenstartup.co.in/blog",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Business Insights & Startup Blogs | NextGen Advisory",
    description:
      "Startup guides, funding insights, and business growth strategies.",
    url: "https://www.nextgenstartup.co.in/blog",
    siteName: "NextGen Startup Advisory",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.nextgenstartup.co.in/Next-Gen-Logo.webp",
        width: 1200,
        height: 630,
        alt: "NextGen Startup Advisory - Blog",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Startup & Business Blogs | NextGen Advisory",
    description:
      "Expert-written blogs on startups, funding, and business compliance.",
    images: ["https://www.nextgenstartup.co.in/Next-Gen-Logo.png"],
    creator: "@NextGenBiz",
  },
};

export default function About() {
  const baseUrl = "https://www.nextgenstartup.co.in";
  const blogUrl = `${baseUrl}/blog`;
  const imageUrl = `${baseUrl}/Next-Gen-Logo.png`;
  const allBlogs = getAllBlogs();

  // Blog/BlogCollection Schema
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${blogUrl}#blog`,
    name: "Business Insights & Startup Blogs | NextGen Advisory",
    description:
      "Read expert blogs on startups, MSME growth, funding, compliance, and business strategy by NextGen Startup Advisory.",
    url: blogUrl,
    publisher: {
      "@type": "Organization",
      name: "NextGen Startup Advisory",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: imageUrl,
        width: 1200,
        height: 630,
      },
    },
    blogPost: allBlogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.description,
      url: `${baseUrl}/blog/${blog.slug}`,
      datePublished: blog.publishedDate
        ? `${blog.publishedDate}T00:00:00+05:30`
        : undefined,
      dateModified: blog.modifiedDate
        ? `${blog.modifiedDate}T00:00:00+05:30`
        : undefined,
      author: {
        "@type": "Organization",
        name: blog.author?.name || "NextGen Startup Advisory",
        url: blog.author?.url || baseUrl,
      },
      articleSection: blog.category,
      keywords: blog.tags?.join(", "),
    })),
    inLanguage: "en-IN",
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${blogUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: blogUrl,
      },
    ],
  };

  // ItemList Schema for better indexing
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${blogUrl}#itemlist`,
    name: "Blog Posts",
    description: "List of all blog posts from NextGen Startup Advisory",
    numberOfItems: allBlogs.length,
    itemListElement: allBlogs.map((blog, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.description,
        url: `${baseUrl}/blog/${blog.slug}`,
        datePublished: blog.publishedDate
          ? `${blog.publishedDate}T00:00:00+05:30`
          : undefined,
      },
    })),
  };

  return (
    <>
      {/* Blog/BlogCollection Schema */}
      <Script
        id="blog-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* BreadcrumbList Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ItemList Schema */}
      <Script
        id="itemlist-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <Header />
      <Hero />
      <Blog />
      <CTA />
      <Footer />
    </>
  );
}
