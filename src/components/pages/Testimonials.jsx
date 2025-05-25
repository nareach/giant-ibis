"use client";

import React from "react";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Agnes Lockman",
      date: "30 Dec 2024",
      rating: 5,
      text: "The best we've had in Cambodia by a long shot. Excellent service, punctual, helpful, polite, and friendly! Also, the service is quite affordable. I'm sure this company will do well since a lot of the other tour operators do not offer the same standard.",
    },
    {
      id: 2,
      name: "Agnes Lockman",
      date: "30 Dec 2024",
      rating: 5,
      text: "The best we've had in Cambodia by a long shot. Excellent service, punctual, helpful, polite, and friendly! Also, the service is quite affordable. I'm sure this company will do well since a lot of the other tour operators do not offer the same standard.",
    },
    {
      id: 3,
      name: "Agnes Lockman",
      date: "30 Dec 2024",
      rating: 5,
      text: "The best we've had in Cambodia by a long shot. Excellent service, punctual, helpful, polite, and friendly! Also, the service is quite affordable. I'm sure this company will do well since a lot of the other tour operators do not offer the same standard.",
    },
    {
      id: 4,
      name: "Agnes Lockman",
      date: "30 Dec 2024",
      rating: 5,
      text: "The best we've had in Cambodia by a long shot. Excellent service, punctual, helpful, polite, and friendly! Also, the service is quite affordable. I'm sure this company will do well since a lot of the other tour operators do not offer the same standard.",
    },
    {
      id: 5,
      name: "Agnes Lockman",
      date: "30 Dec 2024",
      rating: 5,
      text: "The best we've had in Cambodia by a long shot. Excellent service, punctual, helpful, polite, and friendly! Also, the service is quite affordable. I'm sure this company will do well since a lot of the other tour operators do not offer the same standard.",
    },
  ];

  return (
    <div className="bg-blue-50 py-16 px-4 relative">
      <div className="max-w-7xl mx-auto relative">
        <h2 className="text-3xl font-bold text-Textcolor text-center mb-12">
          See What Our Clients Say About Us
        </h2>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full  mx-auto relative"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="md:basis-1/2 lg:basis-1/3 "
                >
                  <div className="p-1">
                    <Card className="dark:bg-gray-800">
                      <CardContent className="flex flex-col justify-between p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {testimonial.name}
                            </h3>
                            <p className="text-sm text-Description">
                              {testimonial.date}
                            </p>
                          </div>
                          <div className="flex text-secondary">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} size={16} fill="currentColor" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {testimonial.text}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-0 lg:-left-10 top-1/2 -translate-y-1/2 text-secondary w-10 h-10 flex items-center justify-center rounded-full z-50" />
            <CarouselNext className="absolute -right-0 lg:-right-10 top-1/2 -translate-y-1/2 text-secondary   w-10 h-10 flex items-center justify-center rounded-full z-50" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
