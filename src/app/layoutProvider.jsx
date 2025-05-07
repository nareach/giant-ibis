"use client";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { store } from "@/store/store";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";

export default function LayoutProvider({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <Provider store={store}>
      {!isAuthPage && <Navbar />}
      {children}
      {!isAuthPage && <Footer />}
    </Provider>
  );
}
