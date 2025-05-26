"use client";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { store } from "@/store/store";
import { HeroUIProvider } from "@heroui/react";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import {ThemeProvider as NextThemesProvider} from "next-themes";

export default function LayoutProvider({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <Provider store={store}>
      <HeroUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="light">

          {!isAuthPage && <Navbar />}
          {children}
          {!isAuthPage && <Footer />}
        </NextThemesProvider>

      </HeroUIProvider>
    </Provider>
  );
}
