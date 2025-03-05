export default function BlogDetail() {
    const relatedBlogs = [
      {
        id: 1,
        title: "Hacks for Stress-Free Bus Travel in Cambodia",
        date: "1 Jan 2025",
        readTime: "5 mins read",
        category: "Tips & Hacks",
        image: "/assets/hotel.jpg",
        description:
          "Discover practical tips to make your bus journey in Cambodia smooth and enjoyable. From packing...",
      },
      {
        id: 2,
        title: "Destination Spotlight: Siem Reap, Battambang & More!",
        date: "3 Dec 2024",
        readTime: "6 mins read",
        category: "Destination",
        image: "/assets/hotel.jpg",
        description:
          "Explore Cambodia's must-visit destinations with ease. Whether you're heading to the ancient temples...",
      },
      {
        id: 3,
        title: "Ultimate Guide to Border-Crossing By Bus",
        date: "15 Jan 2025",
        readTime: "7 mins read",
        category: "Tips & Hacks",
        image: "/assets/hotel.jpg",
        description:
          "Traveling across borders by bus? Here's a comprehensive guide to making your journey seamless and stress-free.",
      },
    ];
  
    return (
      <div className="bg-mainbg max-w-7xl mx-auto px-4 py-28">
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Start Your Journey Right!
          </h1>
          <p className="text-md text-gray-600">
            Planning a bus trip in Cambodia or beyond? Whether you're traveling to
            the stunning temples of Siem Reap, the beaches of Sihanoukville, or
            even crossing borders to Vietnam or Thailand, preparation is key to a
            smooth and enjoyable experience. With just a bit of planning and these
            simple but effective travel hacks, you'll save time, reduce stress,
            and make the most of your journey.
          </p>
        </div>
  
        <div className="space-y-8 mb-16">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              1. Pack Light, Pack Smart
            </h2>
            <p className="text-gray-600 text-md leading-relaxed mb-4">
              Overpacking can turn your trip into a hassle. Stick to the
              essentials! A medium-sized backpack is perfect for bus travel. Make
              sure to include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 text-md mb-4">
              <li>Snacks like energy bars, fruits, or nuts to keep you fueled.</li>
              <li>A reusable water bottle to stay hydrated throughout the journey.</li>
              <li>
                A travel pillow or neck cushion for added comfort, especially on
                long rides.
              </li>
              <li>
                A light jacket or shawl to keep warm on air-conditioned buses.
              </li>
            </ul>
            <p className="text-gray-600 text-md leading-relaxed">
              Packing light doesn’t just save space—it also makes boarding,
              exiting, and handling luggage at stops much easier.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Book Early</h2>
            <p className="text-gray-600 text-md leading-relaxed">
              Avoid last-minute stress by booking your tickets in advance. Many
              bus services, like [Your Bus Company], allow you to book online. Not
              only does this secure your seat, but it also gives you the chance to
              pick your preferred spot on the bus, whether it’s a window seat to
              enjoy the views or an aisle seat for easy access.
            </p>
            <p className="text-gray-600 text-md">
              Pro Tip: Popular routes, like Phnom Penh to Siem Reap or Phnom Penh
              to Ho Chi Minh City, can sell out quickly during peak travel seasons
              or holidays. Plan ahead to avoid disappointment!
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              3. Bring Entertainment
            </h2>
            <p className="text-gray-600 text-md leading-relaxed mb-4">
              While gazing at Cambodia’s picturesque countryside can be
              captivating, long bus rides often require a bit of extra
              entertainment. Be sure to download your favorite content before you
              travel, as Wi-Fi on buses may be inconsistent. Consider:
            </p>
            <ul className="list-disc pl-6 text-gray-600 text-md mb-4">
              <li>Playlists of your favorite songs to set the mood.</li>
              <li>Podcasts or audiobooks for a more relaxed experience.</li>
              <li>Movies or TV shows for longer trips.</li>
            </ul>
            <p className="text-gray-600 text-md leading-relaxed">
              Don’t forget headphones to keep your entertainment private and
              respectful of other travelers.
            </p>
          </div>
        </div>
  
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Related Blogs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedBlogs.map((blog) => (
              <div key={blog.id} className="overflow-hidden">
                <div className="relative">
                  <img src={blog.image} alt={blog.title} className="w-full h-[250px] rounded-lg object-cover"/>
                  <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 text-sm rounded-md">
                    {blog.category}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex gap-2 text-sm text-gray-500 mb-2">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm">{blog.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  