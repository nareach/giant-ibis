import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SearchBookForm from "./SearchBox";
import Link from "next/link";
const categories = [
  { id: "all", name: "All" },
  { id: "destination", name: "Destination" },
  { id: "culinary", name: "Culinary" },
  { id: "lifestyle", name: "Lifestyle" },
  { id: "tips", name: "Tips & Hacks" },
  { id: "lifestyle2", name: "LifeStyle" },
];
const blogPosts = [
  {
    id: 1,
    title: "Hacks for Stress-Free Bus Travel in Cambodia",
    description:
      "Discover practical tips to make your bus journey in Cambodia smooth and enjoyable. From packing...",
    category: "Tips & Hacks",
    date: "1 Jan 2025",
    readTime: "5 mins read",
    image: "/assets/hotel.jpg",
  },
  {
    id: 2,
    title: "Destination Spotlight: Siem Reap, Battambang & More!",
    description:
      "Explore Cambodia's must-visit destinations with ease. Whether you're heading to the ancient temples of...",
    category: "Destination",
    date: "3 Dec 2024",
    readTime: "5 mins read",
    image: "/assets/hotel.jpg",
  },
  {
    id: 3,
    title: "Ultimate Guide to Border-Crossing By Bus",
    description:
      "Discover practical tips to make your bus journey in Cambodia smooth and enjoyable. From packing...",
    category: "Tips & Hacks",
    date: "1 Jan 2025",
    readTime: "5 mins read",
    image: "/assets/hotel.jpg",
  },
  {
    id: 4,
    title: "Ultimate Guide to Border-Crossing By Bus",
    description:
      "Discover practical tips to make your bus journey in Cambodia smooth and enjoyable. From packing...",
    category: "Tips & Hacks",
    date: "1 Jan 2025",
    readTime: "5 mins read",
    image: "/assets/hotel.jpg",
  },
  {
    id: 5,
    title: "Ultimate Guide to Border-Crossing By Bus",
    description:
      "Discover practical tips to make your bus journey in Cambodia smooth and enjoyable. From packing...",
    category: "Tips & Hacks",
    date: "1 Jan 2025",
    readTime: "5 mins read",
    image: "/assets/hotel.jpg",
  },
  {
    id: 6,
    title: "Ultimate Guide to Border-Crossing By Bus",
    description:
      "Discover practical tips to make your bus journey in Cambodia smooth and enjoyable. From packing...",
    category: "Tips & Hacks",
    date: "1 Jan 2025",
    readTime: "5 mins read",
    image: "/assets/hotel.jpg",
  },
];

export default function BlogListing() {
  return (
    <div className="bg-mainbg">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-Textcolor mb-2">Blogs</h1>
          <p className="text-Description">
            Here, we share travel tips, destinations, guides, and stories that
            inspire your next adventure.
          </p>
        </div>
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={category.id === "all" ? "default" : "outline"}
                className={
                  category.id === "all"
                    ? "bg-category text-primary hover:bg-blue-200"
                    : " border-category text-Description"
                }
              >
                {category.name}
              </Button>
            ))}
          </div>

          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="block overflow-hidden"
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[285px] rounded-lg object-cover"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white rounded-md text-sm">
                  {post.category}
                </span>
              </div>
              <div className="p-4">
                <div className="flex gap-2 text-sm text-Description mb-2">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-semibold mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-Description line-clamp-2">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 mt-6">
          <Button variant="outline" size="icon" disabled>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="border-primary text-primary">
            {" "}
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
