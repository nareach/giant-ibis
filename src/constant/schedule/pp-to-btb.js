import { Rocket } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Hotel, MapPin } from "lucide-react"

export const routeItems = [
    {
        header: "Phnom Penh to Battambang | 08:45 AM",
        data: [
            {
                title: "Departure Point",
                content: <div>
                    <p>
                        The bus departs from the Giant Ibis Bus Terminal on Street Road 106, Sangkat Doun Penh, Khan Doun Penh (Night Market). If you are not using our pickup service, please arrive 30 minutes before scheduled departure.
                    </p>
                    <p>
                        Google Map: <Link href={` https://maps.app.goo.gl/usMAEbJP2Ny35pcd6`} target="_blank" className="underline text-primary">https://maps.app.goo.gl/usMAEbJP2Ny35pcd6</Link>
                    </p>
                    <Button variant="secondary" className="mt-4 bg-primary text-white hover:bg-primary">
                        <Hotel className="w-4 h-4 mr-2" /> Map
                    </Button>
                </div>,
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-primary",
                hasMap: true,
                position: "left",
            },
            {
                title: "Pickup Service",
                content:
                    "Complimentary pickup service is offered to passengers staying at any of our partner hotels.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-secondary",
                position: "right",
                hasHotel: true,
            },
            {
                title: "On the Road",
                content:
                    "Once the bus departs, the Crew Attendant will distribute a pastry from Blue Pumpkin, a bottle of water and a cold towel. Please contact the Crew Attendant for anything you need during the journey.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-green-500",
                position: "left",
            },
            {
                title: "Bathroom Stop",
                content:
                    "The bus will make its first stop about 180km from Phnom Penh at PTT Gas Station in Pursat Province. This stop is scheduled for 10 minutes.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-red-500",
                position: "right",
            },
            {
                title: "Duration",
                content:
                    "Thanks to huge infrastructure improvement works to National Road 5, which saw the highway between Phnom Penh and Battambang, the journey takes about 4 hours 30 minutes depending on traffic. The distance between Phnom Penh and Battambang is 288km.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-purple-600",
                position: "right",
            },
            {
                title: "Relax",
                content:
                    "Sit back, relax and enjoy the scenery. This journey passes through the provinces of Kandal, Kampong Speu, Kampong Chhnang and Pursat, before reaching Battambang. You'll get to see Cambodian rural life first-hand as you pass through small towns and villages. Free wifi is available onboard, but please note connection is temperamentalwhen driving through rural areas. Ask the Crew Attendant for the password and don't forget to charge your device in our electrical outlets.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-green-500",
                position: "left",
            }, {
                title: "Arrival in Battambang",
                content: <div>
                    <p>The bus will drop you off at the Giant Ibis bus terminal which is located on National Road 5, Phum Anh Chanh, Sangkat Ou Char, Krong Battambang. Once you are received your baggage, there will be plenty of tuktuks waiting to take you to your next destination.</p>
                    <p>
                        Google Map: <Link href={`https://maps.app.goo.gl/mZ333mu6bS5YNGDn6`} target="_blank" className="underline text-primary">https://maps.app.goo.gl/mZ333mu6bS5YNGDn6</Link>
                    </p>
                </div>,
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-red-500",
                position: "right",
                hasMap: true,
            },
        ]

    },
    {
        header: "Battambang to Phnom Penh | 08:45 AM",
        isEndRoute: true,
        data: [
            {
                title: "Departure Point",
                content: <div>
                    <p>
                        The bus departs from the Giant Ibis Bus Terminal on on National Road 5, Phum Anh Chanh, Sangkat Ou Char, Krong Battambang. If you are not using our pickup service, please arrive 30 minutes before scheduled departure.
                    </p>
                    <p>
                        Google Map: <Link href={`https://maps.app.goo.gl/mZ333mu6bS5YNGDn6`} target="_blank" className="underline text-primary">https://maps.app.goo.gl/mZ333mu6bS5YNGDn6</Link>
                    </p>
                    <Button variant="secondary" className="mt-4 bg-primary text-white hover:bg-primary">
                        <MapPin className="w-4 h-4 mr-2" /> Map
                    </Button>
                </div>,
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-primary",
                hasMap: true,
                position: "left",
            },
            {
                title: "Pickup Service",
                content: <div>
                    <p>
                        Complimentary pickup service is offered to passengers staying at any of our partner hotels.
                    </p>
                    <Button variant="secondary" className="mt-4 bg-primary text-white hover:bg-primary">
                        <Hotel className="w-4 h-4 mr-2" /> View hotels
                    </Button>
                </div>,
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-secondary",
                position: "right",
                hasHotel: true,
            },
            {
                title: "On the Road",
                content:
                    "Once the bus departs, the Crew Attendant will distribute a pastry from Blue Pumpkin, a bottle of water and a cold towel. Please contact the Crew Attendant for anything you need during the journey.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-green-500",
                position: "left",
            },
            {
                title: "Bathroom Stop",
                content:
                    "The bus will make its first stop about 100km from Battambang at PTT Gas Station in Pursat Province. This stop is scheduled for 10 minutes.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-red-500",
                position: "right",
            },
            {
                title: "Duration",
                content:
                    "Thanks to huge infrastructure improvement works to National Road 5, which saw the highway between Battambang and Phnom Penh, the journey takes about 4 hours 30 minutes depending on traffic. The distance between Phnom Penh and Battambang is 288km.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-purple-600",
                position: "right",
            },
            {
                title: "Relax",
                content:
                    "Sit back, relax and enjoy the scenery. This journey passes through the provinces of Kandal, Kampong Speu, Kampong Chhnang and Pursat, before reaching Battambang. You'll get to see Cambodian rural life first-hand as you pass through small towns and villages. Free wifi is available onboard, but please note connection is temperamentalwhen driving through rural areas. Ask the Crew Attendant for the password and don't forget to charge your device in our electrical outlets.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-green-500",
                position: "left",
            }, {
                title: "Arrival in Phnom Penh",
                content: <div>
                    <p>The bus arrives at the Giant Ibis Bus Station on Street 106, Sangkat Doun Penh, Khan Doun (Night Market). Once you are received your baggage, there will be plenty of tuktuks waiting to take you to your next destination. If you are connecting with another Giant Ibis bus, then you are in the right place for your next departure. Leave your bags with us and tour the city if you have time.</p>
                    <p>
                        Google Map: <Link href={`https://maps.app.goo.gl/usMAEbJP2Ny35pcd6`} target="_blank" className="underline text-primary">https://maps.app.goo.gl/usMAEbJP2Ny35pcd6</Link>
                    </p>
                    <Button variant="secondary" className="mt-4 bg-primary text-white hover:bg-primary">
                        <MapPin className="w-4 h-4 mr-2" /> Map
                    </Button>
                </div>,
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-red-500",
                position: "right",
                hasMap: true,
            },
        ]

    },
    {
        header: "Siem Reap to Battambang | 08:30 AM | 2:54 PM",
        isEndRoute: false,
        data: [
            {
                title: "Departure Point",
                content: <div>
                    <p>
                        The bus departs from the Giant Ibis bus terminal is located Behind Old Stadium, Khmer Pub Street. If you are not using our pickup service, please arrive 30 minutes before scheduled departure.
                    </p>
                    <p className="mt-2">
                        Google Map: <Link href={`https://maps.app.goo.gl/vQv7yF3nEoU3VTay5`} target="_blank" className="underline text-primary">https://maps.app.goo.gl/vQv7yF3nEoU3VTay5</Link>
                    </p>
                    <Button variant="secondary" className="mt-4 bg-primary text-white hover:bg-primary">
                        <MapPin className="w-4 h-4 mr-2" /> Map
                    </Button>
                </div>,
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-primary",
                hasMap: true,
                position: "left",
            },
            {
                title: "Pickup Service",
                content: <div>
                    <p>
                        Complimentary pickup service is offered to passengers staying at any of our partner hotels.
                    </p>
                    <Button variant="secondary" className="mt-4 bg-primary text-white hover:bg-primary">
                        <Hotel className="w-4 h-4 mr-2" /> View hotels
                    </Button>
                </div>,
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-secondary",
                position: "right",
                hasHotel: true,
            },
            {
                title: "On the Road",
                content:
                    "Once the bus departs, the Crew Attendant will distribute a pastry from Blue Pumpkin, a bottle of water and a cold towel. Please contact the Crew Attendant for anything you need during the journey.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-green-500",
                position: "left",
            },
            {
                title: "Bathroom Stop",
                content:
                    "The bus will make its first stop about 100km from Siem Reap at PTT Gas Station Sisophon in Bonteay Meanchey Province. This stop is scheduled for 10 minutes.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-red-500",
                position: "right",
            },
            {
                title: "Duration",
                content:
                    "Thanks to huge infrastructure improvement works to National Road 5, which saw the highway between Battambang and Phnom Penh, the journey takes about 4 hours 30 minutes depending on traffic. The distance between Phnom Penh and Battambang is 288km.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-purple-600",
                position: "right",
            },
            {
                title: "Relax",
                content:
                    "Sit back, relax and enjoy the scenery. This journey passes through the provinces of Kandal, Kampong Speu, Kampong Chhnang and Pursat, before reaching Battambang. You'll get to see Cambodian rural life first-hand as you pass through small towns and villages. Free wifi is available onboard, but please note connection is temperamentalwhen driving through rural areas. Ask the Crew Attendant for the password and don't forget to charge your device in our electrical outlets.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-green-500",
                position: "left",
            }, {
                title: "Arrival in Battambang",
                content: <div>
                    <p>The bus will drop you off at the Giant Ibis bus terminal which is located on National Road 5, Phum Anh Chanh, Sangkat Ou Char, Krong Battambang. Once you are received your baggage, there will be plenty of tuktuks waiting to take you to your next destination.</p>
                    <p className="mt-2">
                        Google Map: <Link href={`https://maps.app.goo.gl/mZ333mu6bS5YNGDn6`} target="_blank" className="underline text-primary">https://maps.app.goo.gl/mZ333mu6bS5YNGDn6</Link>
                    </p>
                    <Button variant="secondary" className="mt-4 bg-primary text-white hover:bg-primary">
                        <MapPin className="w-4 h-4 mr-2" /> Map
                    </Button>
                </div>,
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-red-500",
                position: "right",
                hasMap: true,
            },
        ]

    }, {
        header: "Battambang to Siem Reap | 08:30 AM | 2:45 PM",
        isEndRoute: true,
        data: [
            {
                title: "Departure Point",
                content: <div>
                    <p>
                        The bus departs from the Giant Ibis Bus Terminal on on National Road 5, Phum Anh Chanh, Sangkat Ou Char, Krong Battambang. If you are not using our pickup service, please arrive 30 minutes before scheduled departure.
                    </p>
                    <p className="mt-2">
                        Google Map: <Link href={`https://maps.app.goo.gl/mZ333mu6bS5YNGDn6`} target="_blank" className="underline text-primary">https://maps.app.goo.gl/mZ333mu6bS5YNGDn6</Link>
                    </p>
                    <Button variant="secondary" className="mt-4 bg-primary text-white hover:bg-primary">
                        <MapPin className="w-4 h-4 mr-2" /> Map
                    </Button>
                </div>,
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-primary",
                hasMap: true,
                position: "left",
            },
            {
                title: "Pickup Service",
                content: <div>
                    <p>
                        Complimentary pickup service is offered to passengers staying at any of our partner hotels.
                    </p>
                    <Button variant="secondary" className="mt-4 bg-primary text-white hover:bg-primary">
                        <Hotel className="w-4 h-4 mr-2" /> View hotels
                    </Button>
                </div>,
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-secondary",
                position: "right",
                hasHotel: true,
            },
            {
                title: "On the Road",
                content:
                    "The bus will make its first stop about 100km from Siem Reap at PTT Gas Station Sisophon in Bonteay Meanchey Province. This stop is scheduled for 10 minutes.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-green-500",
                position: "left",
            },
            {
                title: "Bathroom Stop",
                content:
                    "The bus will make its first stop about 70km from Battambang at PTT Gas Station Sisophon in Bonteay Meanchey Province. This stop is scheduled for 10 minutes.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-red-500",
                position: "right",
            },
            {
                title: "Duration",
                content:
                    "Thanks to huge infrastructure improvement works to National Road 5 and 6, which saw the highway between Battambang and Siem Reap, the journey takes about 3 hours depending on traffic. The distance between Phnom Penh and Battambang is 161km.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-purple-600",
                position: "right",
            },
            {
                title: "Relax",
                content:
                    "Sit back, relax and enjoy the scenery. This journey passes through the provinces of Kandal, Kampong Speu, Kampong Chhnang and Pursat, before reaching Battambang. You'll get to see Cambodian rural life first-hand as you pass through small towns and villages. Free wifi is available onboard, but please note connection is temperamentalwhen driving through rural areas. Ask the Crew Attendant for the password and don't forget to charge your device in our electrical outlets.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-green-500",
                position: "left",
            }, {
                title: "Arrival in Battambang",
                content: <div>
                    <p>The bus will drop you off at the Giant Ibis bus terminal which is located on National Road 5, Phum Anh Chanh, Sangkat Ou Char, Krong Battambang. Once you are received your baggage, there will be plenty of tuktuks waiting to take you to your next destination.</p>
                    <p className="mt-2">
                        Google Map: <Link href={`https://maps.app.goo.gl/mZ333mu6bS5YNGDn6`} target="_blank" className="underline text-primary">https://maps.app.goo.gl/mZ333mu6bS5YNGDn6</Link>
                    </p>
                    <Button variant="secondary" className="mt-4 bg-primary text-white hover:bg-primary">
                        <MapPin className="w-4 h-4 mr-2" /> Map
                    </Button>
                </div>,
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-red-500",
                position: "right",
                hasMap: true,
            },
        ]

    }, {
        header: "Phnom Penh to Bangkok Night | 11:45 PM",
        isEndRoute: false,
        data: [
            {
                title: "Departure Point",
                content: <div>
                    <p>
                        The bus departs from the Giant Ibis Bus Terminal on Street 106, Sangkat Doun Penh, Khan Doun Penh (Night Market).
                    </p>
                    <p className="mt-2">
                        Google Map: <Link href={`https://maps.app.goo.gl/usMAEbJP2Ny35pcd6`} target="_blank" className="underline text-primary">https://maps.app.goo.gl/usMAEbJP2Ny35pcd6</Link>
                    </p>
                    <Button variant="secondary" className="mt-4 bg-primary text-white hover:bg-primary">
                        <MapPin className="w-4 h-4 mr-2" /> Map
                    </Button>
                </div>,
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-primary",
                hasMap: true,
                position: "left",
            },
            {
                title: "Pickup Service",
                content: <div>
                    <p>
                        Complimentary pickup service is currently not available for night bus departures. Please arrange your own transportation to the departure point.
                    </p>
                </div>,
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-secondary",
                position: "right",
                hasHotel: true,
            },
            {
                title: "On the Road",
                content:
                    "Once the bus departs, the Crew Attendant will distribute a bottle of water and cold towel. Please contact the Crew Attendant for anything you need during the journey.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-red-500",
                position: "left",
            },
            {
                title: "Onboard Toilet",
                content:
                    "Giant Ibis night buses are the only vehicles in our fleet with an onboard toilet. The bus will not make any bathroom stops during the journey.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-green-500",
                position: "right",
            },
            {
                title: "Driver Swap",
                content:
                    "We place passenger safety at the core of our operations, so the bus will stop briefly midway through the journey,so the drivers can swop. The 15-minute stop allows the two drivers to get out and stretch their legs, have a cup of coffee and a bowl of porridge. If you're awake and have the munchies, feel free to grab a quick bite for some authentic rural roadside cuisine.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-red-500",
                position: "left",
            },
            {
                title: "Duration",
                content:
                    "Thanks to huge infrastructure improvement works to National Road 5 and 6, which saw the highway between Battambang and Siem Reap, the journey takes about 3 hours depending on traffic. The distance between Phnom Penh and Battambang is 161km.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-purple-600",
                position: "right",
            },
            {
                title: "Get some sleep",
                content:
                    "Our recliner seat can make your trip more comforatbale during the journey. You can make it recline and get some sleep . Don't forget to charge your phone in our power points while you sleep.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-green-500",
                position: "left",
            }, {
                title: "Cambodian Customs and Immigration",
                content:
                    "When the bus arrives as the border, passengersmust disembark to receive an exit stamp in their passports. The Crew Attendant will return passports to passengers as they get off the bus and collect them again when you get back on to process them with Thai immigration.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-purple-600",
                position: "right",
            },
            {
                title: "Thai Customs and Immigration",
                content:
                    "After all Thai visas have been processed, passengers can board the bus without having their luggage scanned. The Crew Attendant is on hand to guide passengers through the process and back to the bus, where a snack is served.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-green-500",
                position: "right",
            },
            {
                title: "Want to get off at Pratunam?",
                content:
                    "If you’re heading to Bangkok’s shopping hotspot, Pratunam is the place to be! Before we reach our main terminal, you can choose to get off here and explore Bangkok’s lively markets, vibrant street food, and fantastic shopping. Just let our staff know, and we’ll be happy to drop you off at Pratunam, giving you the perfect start to your Bangkok adventure before we head to the final stop!",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-red-500",
                position: "left",
            },
            {
                title: "Arrival in Bangkok",
                content: <div>
                    <p>The bus stops at Phra Sumen Rd, Talat Yot, Phra Nakhon, Bangkok. Once you've received your baggage, there will be plenty of tuktuks/taxis waiting to take you to your next destination.</p>
                    <p className="mt-2">
                        Google Map: <Link href={`https://maps.app.goo.gl/WuWCLfmgeijLc9c47`} target="_blank" className="underline text-primary">https://maps.app.goo.gl/WuWCLfmgeijLc9c47</Link>
                    </p>
                    <Button variant="secondary" className="mt-4 bg-primary text-white hover:bg-primary">
                        <MapPin className="w-4 h-4 mr-2" /> Map
                    </Button>
                </div>,
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-green-500",
                position: "right",
                hasMap: true,
            },
        ]
    },
    {
        header: "Bangkok to Phnom Penh Night | 11:45 PM",
        isEndRoute: true,
        data: [
            {
                title: "Cambodia Visa",
                content: <div>
                    <p>
                        If you’re excited about your upcoming trip to Cambodia, we have some helpful tips to ensure a smooth arrival! First, check whether you need a visa on arrival—our friendly crew attendants will be available to assist you at the border. A tourist visa costs $35, while a business visa is $45. Although these fees might seem a bit high, they are certainly worth it! Additionally, we will charge a $5 service fee for batch processing at the border. If you prefer to handle your visa yourself, that’s perfectly fine! Just keep in mind that it may take longer, and our bus can only wait for a limited time. Don’t forget to print your e-visa before you board! If you don’t have access to a printer, don’t worry—our bus terminals and offices offer free printing services. Here’s to amazing adventures and unforgettable experiences in Cambodia! Safe travels!
                    </p>
                </div>,
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-primary",
                hasMap: true,
                position: "left",
            },
            {
                title: "Departure Point",
                content: <div>
                    <p>
                        The bus departs from the Giant Ibis stop at Phra Sumen Rd, Talat Yot, Phra Nakhon, Bangkok. If you are not using our pickup service, please arrive 30 minutes before the scheduled departure.
                    </p>
                    <p className="mt-2">
                        Google Map: <Link href={`https://maps.app.goo.gl/WuWCLfmgeijLc9c47`} target="_blank" className="underline text-primary">https://maps.app.goo.gl/WuWCLfmgeijLc9c47</Link>
                    </p>
                    <Button variant="secondary" className="mt-4 bg-primary text-white hover:bg-primary">
                        <MapPin className="w-4 h-4 mr-2" /> Map
                    </Button>
                </div>,
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-primary",
                hasMap: true,
                position: "left",
            },
            {
                title: "Picking up at Pratunam?",
                content: <div>
                    <p>
                        As we travel from Bangkok to Phnom Penh, we can pick you up at Pratunam after leaving the main terminal. If you are in the area, just let our staff know, and we’ll make sure to pick you up along the route. It’s a great option if you’re heading to Phnom Penh and want to join the journey from the heart of Bangkok’s shopping district!
                    </p>
                </div>,
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-primary",
                hasMap: true,
                position: "left",
            },
            {
                title: "Pickup Service",
                content: <div>
                    <p>
                        Complimentary pickup service is currently not available for night bus departures. Please arrange your own transportation to the departure point.
                    </p>
                </div>,
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-secondary",
                position: "right",
                hasHotel: true,
            },
            {
                title: "On the Road",
                content:
                    "Once the bus departs, the Crew Attendant will distribute a bottle of water and cold towel. Please contact the Crew Attendant for anything you need during the journey.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-red-500",
                position: "left",
            },
            {
                title: "Onboard Toilet",
                content:
                    "Giant Ibis night buses are the only vehicles in our fleet with an onboard toilet. The bus will not make any bathroom stops during the journey.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-green-500",
                position: "right",
            },
            {
                title: "Driver Swap",
                content:
                    "We place passenger safety at the core of our operations, so the bus will stop briefly midway through the journey,so the drivers can swop. The 15-minute stop allows the two drivers to get out and stretch their legs, have a cup of coffee and a bowl of porridge. If you're awake and have the munchies, feel free to grab a quick bite for some authentic rural roadside cuisine.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-red-500",
                position: "left",
            },
            {
                title: "Duration",
                content:
                    "Thanks to huge infrastructure improvement works to National Road 5 and 6, which saw the highway between Battambang and Siem Reap, the journey takes about 3 hours depending on traffic. The distance between Phnom Penh and Battambang is 161km.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-purple-600",
                position: "right",
            },
            {
                title: "Get some sleep",
                content:
                    "Our recliner seat can make your trip more comforatbale during the journey. You can make it recline and get some sleep . Don't forget to charge your phone in our power points while you sleep.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-green-500",
                position: "left",
            }, {
                title: "Cambodian Customs and Immigration",
                content:
                    "When the bus arrives as the border, passengersmust disembark to receive an exit stamp in their passports. The Crew Attendant will return passports to passengers as they get off the bus and collect them again when you get back on to process them with Thai immigration.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-purple-600",
                position: "right",
            },
            {
                title: "Thai Customs and Immigration",
                content:
                    "After all Thai visas have been processed, passengers can board the bus without having their luggage scanned. The Crew Attendant is on hand to guide passengers through the process and back to the bus, where a snack is served.",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-green-500",
                position: "right",
            },
            {
                title: "Want to get off at Pratunam?",
                content:
                    "If you’re heading to Bangkok’s shopping hotspot, Pratunam is the place to be! Before we reach our main terminal, you can choose to get off here and explore Bangkok’s lively markets, vibrant street food, and fantastic shopping. Just let our staff know, and we’ll be happy to drop you off at Pratunam, giving you the perfect start to your Bangkok adventure before we head to the final stop!",
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-red-500",
                position: "left",
            },
            {
                title: "Arrival in Bangkok",
                content: <div>
                    <p>The bus stops at Phra Sumen Rd, Talat Yot, Phra Nakhon, Bangkok. Once you are received your baggage, there will be plenty of tuktuks/taxis waiting to take you to your next destination.</p>
                    <p className="mt-2">
                        Google Map: <Link href={`https://maps.app.goo.gl/WuWCLfmgeijLc9c47`} target="_blank" className="underline text-primary">https://maps.app.goo.gl/WuWCLfmgeijLc9c47</Link>
                    </p>
                    <Button variant="secondary" className="mt-4 bg-primary text-white hover:bg-primary">
                        <MapPin className="w-4 h-4 mr-2" /> Map
                    </Button>
                </div>,
                icon: <Rocket className="w-6 h-6 text-white" />,
                iconBg: "bg-green-500",
                position: "right",
                hasMap: true,
            },
        ]
    },
]