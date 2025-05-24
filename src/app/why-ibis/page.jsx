import ServiceWhyIbis from '@/components/features/why-ibis/ServiceWhyIbis'
import React from 'react'

export default function page() {

    const services = [
        {
            title: "PICK UP SERVICE",
            content: "Complimentary pickup service is available for passengers staying at partner hotels and guesthouses. If you haven't made accommodation arrangements at the time of booking, then choose one of our partner hotels and take advantage of this complimentary service.",
            img: "pickup.jpg"
        }, {
            title: "SAFETY",
            content: "Giant Ibis Transport puts passenger safety first and has the safest record of any passenger transport company in Cambodia, according to the Ministry of Public Works and Transportation. We are the first company to implement a two-driver policy on trips of more than four hours to prevent driver fatigue.",
            img: "safety.jpg"
        }, {
            title: "MAINTENANCE",
            content: "Our buses are maintained by our own team of mechanics. More than 12 full-time mechanics work with the drivers daily on a maintenance scheme to prevent breakdowns before they can occur. A checklist walk-through is carried out on each bus before each departure.",
            img: "maintenance.jpg"
        }, {
            title: "CUSTOMER SERVICE",
            content: "It's not just about getting from A to B, it's about ensuring customers have a smooth ride from the moment they search for a ticket. Our call center reps are on hand to help with any questions you may have before your trip. Have you booked your ticket online and now have a change of plans? They can assist with that too. Urgent issues can be handled through our live online chat.",
            img: "customer_service.jpg"
        }, {
            title: "CONSERVATION",
            content: "Giant Ibis Transport is the BirdLife International Species Champion for the critically endangered GiantIbis bird, which can only be found in northern Cambodia. Read more about our efforts on the Conservation page.",
            img: "conservation.jpg"
        }, {
            title: "RELIABILTY",
            content: "We know how crucial timely arrivals and departures are for your travel plans, and we are fully committed to upholding our schedules. To underscore our dedication to punctuality, we proudly offer a full refund voucher for your ticket cost if a breakdown occurs during transit, requiring a bus change. This applies to delays of more than 3 hours on domestic routes and over 4 hours on international routes. You can travel with confidence, knowing that we stand behind our promise of reliability.",
            img: "Reliability.jpg"
        }, {
            title: "REPUTATION",
            content: "We pride ourselves on our reputation and in just a short period of time we've grown to be known as the best bus operator in Cambodia. Check TripAdvisor and other popular travel websites and you'll find that Giant Ibis is the only bus company recommended by travellers.",
            img: "reputation.jpg"
        }, {
            title: "CONVENIENCE",
            content: "Giant Ibis wants to make things as easy as possible for travellers who are on a tight time schedule. Passengers can view timetables and routes, buy tickets and reserve seats online, enabling you to plan your trip in advance.",
            img: "conveninue.jpg"
        }, {
            title: "PARTNERSHIPS",
            content: "We partner with the best hotels in the destinations where we operate. If you're looking for a recommendation within a certain price range or simply want to take advantage of our complementary pickup service, then visit our Hotels page.",
            img: "pathnership.jpg"
        }, {
            title: "ON BOARD EXPERIENCE",
            content: "We want your trip to be comfortable and enjoyable. With this in mind, we start each journey by giving passengers a bottle of water, cold towel and pastry from Blue Pumpkin. Our drivers are trained to obey the speed limits and be conscious of dangerous over-taking and excessive honking.",
            img: "onboardexperience.jpg"
        }, {
            title: "SOPHISTICATION",
            content: "This state-of-the-art website contains everything you need to plan and book your trip. Have a lookaround and drop us an email or start a live chat if you can't find what you're looking for.",
            img: "sophistication.jpg"
        }
    ]

    return (
        <div className="bg-white mb-5">
            <div className="max-w-7xl mx-auto px-4 py-12 w-full  ">
                <div className='text-center mb-10'>
                    <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2'>Service</h1>
                    <div className='w-24 h-1 bg-blue-600 mx-auto'></div>
                </div>
                <div>
                    {
                        services?.map((item, index) =>
                            <ServiceWhyIbis
                                key={index}
                                index={index}
                                content={item.content}
                                img={item.img}
                                title={item.title}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}
