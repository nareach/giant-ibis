
"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Rocket } from "lucide-react"
import SearchBookForm from "./HeroBookForm"

export default function BorderCrossings() {
  const [openRouteIndex, setOpenRouteIndex] = useState(null)

  const timelineItems = [
    {
      title: "Departure Point",
      content:
        "The bus departs from the Giant Ibis Bus Terminal on Street 106, Sangkat Doun Penh, Khan Doun Penh (Night Market).",
      icon: <Rocket className="w-6 h-6 text-white" />,
      iconBg: "bg-primary",
      hasMap: true,
      position: "left",
    },
    {
      title: "Pickup Service – Important!",
      content:
        "Complimentary pickup service is currently not available for night bus departures. Please arrange your own transportation to the departure point.",
      icon: <Rocket className="w-6 h-6 text-white" />,
      iconBg: "bg-secondary",
      position: "right",
    },
    {
      title: "On the Road",
      content:
        "Once the bus departs, the Crew Attendant will distribute a bottle of water and cold towel. Please contact the Crew Attendant for anything you need during the journey.",
      icon: <Rocket className="w-6 h-6 text-white" />,
      iconBg: "bg-green-500",
      position: "left",
    },
    {
      title: "Onboard Toilet",
      content:
        "Giant Ibis night buses are the only vehicles in our fleet with an onboard toilet. The bus will not make any bathroom stops during the journey.",
      icon: <Rocket className="w-6 h-6 text-white" />,
      iconBg: "bg-red-500",
      position: "right",
    },
    {
      title: "Driver Swap",
      content:
        "We place passenger safety at the core of our operations, so the bus will stop briefly midway through the journey so the drivers can swap. The 15-minute stop allows the two drivers to get out and stretch their legs, have a cup of coffee and a bowl of porridge. If you're awake and have the munchies, feel free to grab a quick bite for some authentic rural roadside cuisine.",
      icon: <Rocket className="w-6 h-6 text-white" />,
      iconBg: "bg-purple-600",
      position: "left",
    },
  ]

  const routes = [
    {
      title: "Phnom Penh to Bangkok",
    },
    {
      title: "Siem Reap to Bangkok",
    },
    {
      title: "Ho Chi Minh to Phnom Penh",
    },
    {
      title: "Phnom Penh to Ho Chi Minh",
    },
    {
      title: "Bangkok to Phnom Penh",
    },
  ]

  function RouteCollapse({ title, content, isOpen, onClick }) {
    return (
      <Card className="p-4 shadow-custom2 cursor-pointer transition-colors hover:bg-gray-50" onClick={onClick}>
        <div className="grid grid-cols-3 items-center">
          <div />
          <h3 className="text-center font-medium">{title}</h3>
          <div className="flex justify-end">
            <Button variant="outline" className="w-8 h-8 flex items-center justify-center">
              {isOpen ? "-" : "+"}
            </Button>
          </div>
        </div>
        {isOpen && (
          <>
            <div className="mt-2 text-sm text-gray-500">{content}</div>
            <div className="mt-8 lg:mt-12  p-4 lg:p-10 rounded-md">
              <h2 className="text-xl font-semibold text-center mb-6 lg:mb-8">{title}</h2>
              <div className="relative">
                <div className="absolute left-6 md:left-1/2 top-0 h-full w-px bg-gray-200 md:transform md:-translate-x-1/2" />
                <div className="space-y-24">
                  {timelineItems.map((item, index) => {
                    const contentBlock = (
                      <div className="shadow-custom p-8 rounded-md bg-white">
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.content}</p>
                        {item.hasMap && (
                          <Button variant="secondary" className="mt-4 bg-primary text-white hover:bg-primary">
                            <MapPin className="w-4 h-4 mr-2" /> Map
                          </Button>
                        )}
                      </div>
                    )

                    return (
                      <div key={index} className="flex items-center gap-8">
                        <div className={`hidden md:block w-1/2 ${item.position === "left" ? "pr-8" : "pl-8"}`}>
                          {item.position === "left" && contentBlock}
                        </div>
                        <div className="w-14 h-12 rounded-full flex-shrink-0 z-10">
                          <div className={`w-14 h-14 rounded-full ${item.iconBg} flex items-center justify-center`}>
                            {item.icon}
                          </div>
                        </div>
                        <div className={`hidden md:block w-1/2 ${item.position === "right" ? "pl-8" : "pr-8"}`}>
                          {item.position === "right" && contentBlock}
                        </div>
                        <div className="md:hidden w-full pl-4">{contentBlock}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </Card>
    )
  }

  return (
    <div className="bg-mainbg min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8 lg:pt-12">
        <h1 className="text-2xl lg:text-3xl font-bold text-Textcolor text-center mb-4">Border Crossings</h1>
        <p className="text-center text-Description mb-8 lg:mb-12 max-w-2xl mx-auto px-4">
          Crossing borders and getting visas can be tricky, but Giant Ibis makes it easy and stress-free. Our team takes
          care of the details so passengers can relax and have fewer problems at the border.
        </p>

        <div className="grid gap-3 px-4">
          {routes.map((route, index) => (
            <RouteCollapse
              key={index}
              title={route.title}
            
              isOpen={openRouteIndex === index}
              onClick={() => setOpenRouteIndex(openRouteIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

