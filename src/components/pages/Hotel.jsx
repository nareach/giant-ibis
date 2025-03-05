import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, ChevronLeft, ChevronRight, Search } from "lucide-react";
import SearchBookForm from "./HeroBookForm";

const hotels = [
  {
    id: 1,
    name: "Onederz Hostel Phnom Penh",
    logo: "/assets/hotel.jpg",
    description:
      "Welcome to Onederz Hostel Phnom Penh, the best rated hostel in Phnom Penh. Rooftop pool with amazing river view What makes the hostel special is its location. You will enjoy amazing river view from our rooftop pool and restaurant. Huge public walk way and park along the river would be perfect place to enjoy walking or doing exercise. Great dining experience We have rooftop restaurant / bar with amazing river view. We have Khmer, Western and Japanese foods available. Although we pay close attention to the quality of our food, our prices are reasonable. Safe and comfortable place to stay",
  },
  {
    id: 2,
    name: "Mad Money Phnom Penh",
    logo: "/assets/hotel.jpg",
    description:
      "Welcome to Onederz Hostel Phnom Penh, the best rated hostel in Phnom Penh. Rooftop pool with amazing river view What makes the hostel special is its location. You will enjoy amazing river view from our rooftop pool and restaurant. Huge public walk way and park along the river would be perfect place to enjoy walking or doing exercise. Great dining experience We have rooftop restaurant / bar with amazing river view. We have Khmer, Western and Japanese foods available. Although we pay close attention to the quality of our food, our prices are reasonable. Safe and comfortable place to stay",
  },
  {
    id: 3,
    name: "Pooltop Guesthouse",
    logo: "/assets/hotel.jpg",
    description:
      "Welcome to Onederz Hostel Phnom Penh, the best rated hostel in Phnom Penh. Rooftop pool with amazing river view What makes the hostel special is its location. You will enjoy amazing river view from our rooftop pool and restaurant. Huge public walk way and park along the river would be perfect place to enjoy walking or doing exercise. Great dining experience We have rooftop restaurant / bar with amazing river view. We have Khmer, Western and Japanese foods available. Although we pay close attention to the quality of our food, our prices are reasonable. Safe and comfortable place to stay",
  },
  {
    id: 4,
    name: "HM Grand Central Hotel Phnom Penh",
    logo: "/assets/hotel.jpg",
    description:
      "Welcome to Onederz Hostel Phnom Penh, the best rated hostel in Phnom Penh. Rooftop pool with amazing river view What makes the hostel special is its location. You will enjoy amazing river view from our rooftop pool and restaurant. Huge public walk way and park along the river would be perfect place to enjoy walking or doing exercise. Great dining experience We have rooftop restaurant / bar with amazing river view. We have Khmer, Western and Japanese foods available. Although we pay close attention to the quality of our food, our prices are reasonable. Safe and comfortable place to stay",
  },
];

export default function HotelListings() {
  return (
    <div className="bg-mainbg">
      <div className="px-4 md:px-10 lg:px-20 w-full mx-auto py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:w-80">
            <Input
              type="text"
              placeholder="Search"
              className="pl-10 w-full"
            />
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          </div>
          <Select defaultValue="phnom-penh">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phnom-penh">Phnom Penh</SelectItem>
              <SelectItem value="siem-reap">Siem Reap</SelectItem>
              <SelectItem value="battambang">Battambang</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-6">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={hotel.logo || "/placeholder.svg"}
                  alt={`${hotel.name} logo`}
                  className="w-full md:w-56 h-56 rounded-md object-cover"
                />
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                    <h2 className="text-xl font-semibold">{hotel.name}</h2>
                    <Button variant="ghost" className="text-orange-500 hover:text-orange-600 mt-2 md:mt-0" >
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Direction
                    </Button>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {hotel.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button variant="outline" size="icon" disabled>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="border-primary text-primary-foreground"
          >
            1
          </Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">...</Button>
          <Button variant="outline">9</Button>
          <Button variant="outline">10</Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
