"use client";

import Image from "next/image";

export const Banner = () => {
    return (
        <div className="relative">
            <div className="relative before:absolute before:inset-0 before:bg-black before:opacity-20">
                <Image
                    src="/assets/images/hero2.png"
                    alt="Hero Image"
                    className="object-cover h-[350px] w-full object-center"
                    width={1920}
                    height={416}
                />
            </div>

            <div
                className=" absolute inset-0    flex flex-col items-center justify-center  text-white  px-4  md:items-start md:justify-start md:left-20 top-28"
            >
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">
                    Every Mile, Every Journey, Together
                </h1>
                <p className="text-sm sm:text-lg md:text-xl mb-6 max-w-lg md:max-w-2xl text-center md:text-left">
                    Experience seamless travel, reliable service, and a commitment to
                    getting you wherever you need to be.
                </p>
                <div className="flex items-center bg-white text-gray-900 px-4 sm:px-5 py-2 rounded-md shadow-lg">
                    <Image
                        src="/assets/champion.png"
                        alt="Champion Icon"
                        width={20}
                        height={20}
                        className="w-5 h-5 mr-2"
                    />
                    <span className="text-xs sm:text-sm font-medium">
                        Voted #1 Bus Service in Cambodia – Trusted by Thousands on
                    </span>
                    <Image
                        src="/assets/trip-logo.png"
                        alt="TripAdvisor"
                        width={20}
                        height={20}
                        className="ml-2"
                    />
                </div>
            </div>
        </div>
    )
}