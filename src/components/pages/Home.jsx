import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Testimonials from "./Testimonials";
import SearchBookForm from "./HeroBookForm";
import { CreditCard, RockingChair, Search } from "lucide-react";

const Home = () => {
  const services = [
    {
      id: 1,
      icon: "/assets/images/wifi.png",
      title: "WiFi",
      description:
        "Free Wi-Fi on every bus with 2-4 Mbps speeds, keeping you connected all trip long.",
    },
    {
      id: 2,
      icon: "/assets/images/outlet.png",
      title: "Electrical Outlets",
      description:
        "Stay powered with onboard chargers—use the free Wi-Fi and leave the bus with a full battery!",
    },
    {
      id: 3,
      icon: "/assets/images/snack.png",
      title: "Complimentary Snacks",
      description:
        "Provide a Blue Pumpkin pastry, water, and cold towels—VN buses even offer free coffee!",
    },
    {
      id: 4,
      icon: "/assets/images/seat.png",
      title: "Legroom",
      description:
        "We offer extra legroom by removing a row of seats on every bus for your comfort.",
    },
    {
      id: 5,
      icon: "/assets/images/toilet.png",
      title: "Toilets",
      description:
        "We avoid onboard toilets due to space and odor, only including them on our night buses.",
    },
    {
      id: 6,
      icon: "/assets/images/bed.png",
      title: "Sleeping Beds",
      description:
        "Our night bus beds have a 15% angle, offering comfort to help you get some sleep on the way.",
    },
    {
      id: 7,
      icon: "/assets/images/gps.png",
      title: "GPS",
      description:
        "GPS on every bus monitors driver performance and alerts us instantly in case of incidents.",
    },
    {
      id: 8,
      icon: "/assets/images/environment.png",
      title: "CRS",
      description:
        "A portion of every ticket supports preserving Cambodia’s National Bird as a Giant Ibis Species Champion.",
    },
  ];

  const destinations = [
    {
      id: 1,
      image: "/assets/images/phnompenh.jpg",
      title: "Phnom Penh",
      description:
        "Cambodia's capital blends modern energy with rich history. Visit the Royal Palace, Silver Pagoda, and National Museum, stroll colonial streets, shop at Russian Market, or unwind at the vibrant riverfront. End your day with a sunset cruise on the Tonle Sap River.",
    },
    {
      id: 2,
      image: "/assets/images/angkorwat2.jpg",
      title: "Siem Reap",
      description:
        "The gateway to Angkor Wat, the world’s largest religious monument and a UNESCO World Heritage Site. Beyond the temples, explore Tonle Sap Lake, Kulen Mountain, and Koh Ker ruins. Enjoy craft shops, cafes, lively Pub Street, and night markets, making Siem Reap a good destination for culture.",
    },
    {
      id: 3,
      image: "/assets/images/kampot.png",
      title: "Kampot",
      description:
        "A charming coastal province, offers colonial architecture, natural beauty, and a relaxed riverside vibe. Explore Bokor National Park’s cool mountain air, Popokvil Waterfall, Toek Chhou Rapids, and the Anlong Pring Bird Sanctuary, making it a haven for nature lovers.",
    },
    {
      id: 4,
      image: "/assets/images/kohrong.jpeg",
      title: "Sihanoukville",
      description:
        "Cambodia’s top beach destination, offers white-sand beaches, tropical islands, water activities, and vibrant nightlife. Relax with fresh seafood, explore islands like Koh Rong, or enjoy diving and snorkeling in clear waters. The nightlife buzzes late into the night.",
    },
    {
      id: 5,
      image: "/assets/images/hochiminh.jpg",
      title: "Ho Chi Minh City",
      description:
        "Vietnam’s cultural and commercial hub, blends history with modernity. Explore landmarks like the Ho Chi Minh Museum, Cu Chi Tunnels, pagodas, parks, and historic architecture, showcasing a mix of Vietnamese, Chinese, and European influences.",
    },
    {
      id: 6,
      image: "/assets/images/bangkok.jpg",
      title: "Bangkok",
      description:
        "Thailand’s bustling capital, blends history with modern vibrancy. Known for its stunning temples, royal palaces, colorful markets, and lively nightlife, the city offers endless experiences. Established in 1782 by King Rama I, it evolved from a trading post into a cultural and commercial powerhouse.",
    },
  ];

  return (
    <div className="bg-main">
      <div className="w-full max-w-5xl mx-auto py-12 px-4 lg:px-20">
        <h1 className="text-3xl text-Textcolor font-bold text-center mb-12">
          Book your tickets in just 3 simple steps!
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center flex-1">
            <div className="bg-white w-[100px] shadow-custom2 p-2 pt-5 flex justify-center rounded-tr-3xl rounded-tl-3xl rounded-br-3xl mx-auto">
              <div className="w-14 h-14 border-2 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={25} className="text-white" />
              </div>
            </div>
            <h3 className="text-lg text-primary">Search</h3>
            <p className="text-sm text-gray-600">
              Select your route and travel date.
            </p>
          </div>

          <div className="hidden md:block flex-1">
            <img
              src="/assets/images/arrow2.png"
              alt="Dashed Line"
              className="w-full max-w-xs mx-auto relative bottom-[40px]"
            />
          </div>

          <div className="text-center flex-1">
            <div className="bg-white w-[100px] shadow-custom2 p-2 pt-5 flex justify-center rounded-tr-3xl rounded-tl-3xl rounded-br-3xl mx-auto">
              <div className="w-14 h-14 border-2 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <RockingChair size={25} className="text-white" />
              </div>
            </div>
            <h3 className="text-lg text-primary">Select Seat</h3>
            <p className="text-sm text-gray-600">
              Choose your preferred departure time and seat.
            </p>
          </div>

          <div className="hidden md:block flex-1">
            <img
              src="/assets/images/arrow1.png"
              alt="Dashed Line"
              className="w-full max-w-xs mx-auto"
            />
          </div>
          <div className="text-center flex-1">
            <div className="bg-white w-[100px] shadow-custom2 p-2 pt-5 flex justify-center rounded-tr-3xl rounded-tl-3xl rounded-br-3xl mx-auto">
              <div className="w-14 h-14 border-2 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard size={25} className="text-white" />
              </div>
            </div>
            <h3 className="text-lg  text-primary">Pay</h3>
            <p className="text-sm text-gray-600">
              Pay with KHQR, ABA Pay, Visa, MasterCard, or UPI.
            </p>
          </div>
        </div>
      </div>

      <div className=" py-10 px-4 md:px-16 lg:px-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl text-Textcolor font-semibold">
            We Offer Best Services
          </h2>
        </div>
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white shadow-custom rounded-lg px-[24px] py-[35px] text-center space-y-4"
            >
              <div className="w-[80px] h-[80px] m-auto bg-gray-200 rounded-full flex items-center justify-center">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={50}
                  height={50}
                  className="block"
                />
              </div>

              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="text-sm text-textDescription">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex items-center my-[40px] justify-between h-[250px] text-white px-6" style={{
        backgroundImage: "url('/assets/images/banner-angkor.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}>
        <div className="absolute inset-0 -z-10">
          <Image
            src="/assets/images/angkorwat-banner.png"
            alt="Angkor Wat"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="max-w-md ml-32">
          <h1 className="text-4xl font-bold leading-tight">Let’s Make Your</h1>
          <h1 className="text-4xl font-bold leading-tight">
            Next Journey Amazing
          </h1>
        </div>
      </div>

      <div className="mx-auto px-4 lg:px-20 py-7">
        <h2 className="text-3xl text-Textcolor font-bold text-center mb-10">
          Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              className="overflow-hidden p-5 bg-white h-full rounded-lg shadow-custom"
            >
              <CardContent className="p-0">
                <div className="flex gap-5 flex-col lg:flex-row">
                  <div className="w-full lg:w-[300px]">
                    <img
                      src={destination.image}
                      alt={destination.title}
                      className="w-full h-[175px] rounded-[10px] object-cover"
                    />
                  </div>

                  <div className="w-full lg:w-3/5">
                    <h2 className="text-[18px] font-medium mb-2">
                      {destination.title}
                    </h2>
                    <p className="text-textDescription text-[14px]">
                      {destination.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Testimonials />
    </div>
  );
};

export default Home;
