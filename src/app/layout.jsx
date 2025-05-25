import { Poppins } from "next/font/google";
import "./globals.css";
import { Banner } from "@/components/layout/Banner";
import LayoutProvider from "./layoutProvider";
import SearchBookFormUI from "@/components/pages/SearchBox-UI";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-poppins', // optional: for CSS variables
});

export const metadata = {
  title: {
    template: "%s | Giant Ibis",
    default: "Giant Ibis",
  },
  description:
    "Giant Ibis Transport is the only bus service that provides customers with safety, reliability, and responsiveness.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.giantibis.com",
    siteName: "Giant Ibis",
  },
};

export const pageMetadata = {
  login: {
    title: "Login",
    description: "Sign in to your Giant Ibis account to book and manage your trips.",
  },
  signup: {
    title: "Sign Up",
    description: "Create a Giant Ibis account to start booking your trips conveniently.",
  },
  about: {
    title: "About Us",
    description: "Learn more about Giant Ibis, our mission, and our premium travel services.",
  },
  blog: {
    title: "Blog",
    description: "Read travel tips, updates, and insights from the Giant Ibis team.",
  },
  book: {
    title: "Book",
    description: "Easily book your next trip with Giant Ibis and enjoy a comfortable journey.",
  },
  branch: {
    title: "Our Branches",
    description: "Find Giant Ibis branches near you for ticket booking and support.",
  },
  "borderCrossing": {
    title: "Border Crossing Info",
    description: "Everything you need to know about border crossing with Giant Ibis.",
  },
  crs: {
    title: "Customer Reservation System",
    description: "Manage your reservations and travel plans efficiently with our CRS system.",
  },
  faq: {
    title: "FAQs",
    description: "Find answers to frequently asked questions about Giant Ibis services.",
  },
  hotels: {
    title: "Hotels",
    description: "Discover hotel partnerships and accommodations for your journey.",
  },
  payment: {
    title: "Payment Options",
    description: "View available payment methods for booking your Giant Ibis tickets.",
  },
  "select-seat": {
    title: "Select Your Seat",
    description: "Choose your preferred seat for a comfortable travel experience.",
  },
  success: {
    title: "Booking Successful",
    description: "Your booking was successful! Get ready for your journey with Giant Ibis.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(poppins.className, 'dark:bg-[#0D001A]')}>
        <LayoutProvider>
          <Banner />
          <SearchBookFormUI />
          {children}
        </LayoutProvider>
      </body>
    </html>
  );
}
