"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StoreProvider from "./StoreProvider";

export default function LayoutProvider({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <StoreProvider>
      {!isAuthPage && <Navbar />}
      {children}
      {!isAuthPage && <Footer />}
    </StoreProvider>
  );
}
