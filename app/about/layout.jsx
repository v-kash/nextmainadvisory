import { Header } from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title:
    "About NextGen Startup Advisory | Trusted Startup & MSME Growth Partner in India",
  description:
    "Learn about NextGen Startup Advisory—India’s trusted partner for startups and MSMEs offering compliance, funding, and scalable growth solutions.",

  robots: {
    index: false,
    follow: false,
  },

  alternates: {
    canonical: "https://www.nextgenstartup.co.in/about",
  },
};

export default function AboutLayout({ children }) {
  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
}
