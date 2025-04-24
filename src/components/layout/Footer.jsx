"use client";

import {
  BookOpen,
  Globe,
  Hotel,
  User,
  Layout,
  FileText,
  Info,
  Shield,
  BusFront,
  Split,
  Bird,
  ShieldQuestion,
  Handshake,
  Cookie,
  ReceiptText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="pt-12 bg-white mx-auto w-full">
      <div className="w-full mx-auto px-4 lg:px-20">
        <div
          className="flex flex-col gap-8  md:grid md:grid-flow-col md:grid-rows-2 md:auto-cols-fr md:gap-[30px] 
             lg:flex lg:flex-row lg:gap-[58px]"
        >
          <div className="w-full md:max-w-[285px]">
            <Image
              src="/assets/logos/logo.png"
              alt="Giant Ibis Logo"
              width={170}
              height={54}
              className="mb-4"
            />
            <p className="text-Description text-sm leading-6">
              Giant Ibis Transport is a premium bus service in Cambodia,
              offering safe, comfortable, and reliable travel with modern
              amenities. It caters to tourists and locals, connecting major
              cities and destinations with professional drivers and excellent
              customer service.
            </p>
          </div>

          {/* Social Media Section */}
          <div className="w-full md:w-auto">
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-3">
              {[
                {
                  name: "Facebook",
                  src: "/facebook.svg",
                  link: "https://facebook.com",
                },
                {
                  name: "Instagram",
                  src: "/instagram.svg",
                  link: "https://instagram.com",
                },
                {
                  name: "TikTok",
                  src: "/tiktok.svg",
                  link: "https://tiktok.com",
                },
                {
                  name: "Telegram",
                  src: "/telegram.svg",
                  link: "https://telegram.org",
                },
                {
                  name: "Whatsapp",
                  src: "/whatsapp.svg",
                  link: "https://whatsapp.com",
                },
              ].map((social) => (
                <li key={social.name} className="flex items-center gap-3">
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <Image
                      src={social.src}
                      alt={social.name}
                      width={20}
                      height={20}
                    />
                    <span className="text-Description text-sm">
                      {social.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full lg:w-[450px]">
            <h3 className="font-semibold mb-4">Quick Access</h3>
            <div className="flex gap-[25px] justify-between">
              <ul className="space-y-3 text-Description text-sm">
                {[
                  {
                    icon: <BusFront size={20} className="text-primary" />,
                    label: "Book",
                    link: "/book",
                  },
                  {
                    icon: <Globe size={20} className="text-primary" />,
                    label: "Border Crossing",
                    link: "/border-crossing",
                  },
                  {
                    icon: <Hotel size={20} className="text-primary" />,
                    label: "Hotel",
                    link: "/hotel",
                  },
                  {
                    icon: <User size={20} className="text-primary" />,
                    label: "About Us",
                    link: "/about-us",
                  },
                  {
                    icon: <Split size={20} className="text-primary" />,
                    label: "Our Branch",
                    link: "/our-branch",
                  },
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-3">
                    <Link
                      href={item.link}
                      className="flex items-center gap-3 hover:underline"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="space-y-3 text-Description text-sm">
                {[
                  {
                    icon: <Bird size={20} className="text-primary" />,
                    label: "CRS",
                    link: "/crs",
                  },
                  {
                    icon: <ShieldQuestion size={20} className="text-primary" />,
                    label: "FAQ",
                    link: "/faq",
                  },
                  {
                    icon: <Handshake size={20} className="text-primary" />,
                    label: "Partners",
                    link: "/hotel",
                  },
                  {
                    icon: <Cookie size={20} className="text-primary" />,
                    label: "Privacy Policy",
                    link: "/about-us",
                  },
                  {
                    icon: <ReceiptText size={20} className="text-primary" />,
                    label: "Terms & Conditions",
                    link: "/our-branch",
                  },
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-3">
                    <Link
                      href={item.link}
                      className="flex items-center gap-3 hover:underline"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <div className="flex flex-col gap-[20px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[25px]">
                <div>
                  <h3 className="font-semibold mb-4">Trip Advisor</h3>
                  <Image
                    src="/assets/images/tripadvisor.png"
                    alt="KHR"
                    width={145}
                    height={104}
                    className="w-auto h-auto"
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Coming Soon</h3>
                  <div className="flex gap-4">
                    <Image
                      src="/assets/images/download-apps.png"
                      alt="App Store"
                      width={120}
                      height={40}
                      className="cursor-pointer object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <h3 className="font-semibold">We Accept</h3>
                <div className="flex gap-3">
                  <Image
                    src="/assets/images/creditcards.png"
                    alt="KHR"
                    width={180}
                    height={20}
                    className="w-auto h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-10 border-t bg-primary py-4 text-center text-sm text-white">
        Powered By Giant Ibis © {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
