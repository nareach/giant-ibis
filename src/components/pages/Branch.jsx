import { MapPin, Phone, Search, Filter } from "lucide-react";
import Link from "next/link";
import SearchBookForm from "./HeroBookForm";

export default function Branch() {
  // Define the locations array
  const locations = [
    {
      name: "Phnom Penh",
      address:
        "No. 21, France St. (47), Sangkat Srah Chork, Khan Daun Penh, Phnom Penh (North of TOTAL gas station)",
      phone: "012 345 678",
    },
    {
      name: "Siem Reap",
      address:
        "No. 21, France St. (47), Sangkat Srah Chork, Khan Daun Penh, Phnom Penh (North of TOTAL gas station)",
      phone: "012 345 678",
    },
    {
      name: "Battambang",
      address:
        "No. 21, France St. (47), Sangkat Srah Chork, Khan Daun Penh, Phnom Penh (North of TOTAL gas station)",
      phone: "012 345 678",
    },
  ];

  return (
    <>
      <div clakForm/>
      <div className="bg-mainbg max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow-custom rounded-lg p-7">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search"
                className="w-full p-3 pl-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <Search className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
            </div>

            <div className="space-y-6 ">
              {locations.map((location, index) => (
                <div key={index} className="border-b pb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {location.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    {location.address}
                  </p>
                  <div className="flex justify-between items-center text-sm text-Description space-x-3">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-secondary" />
                      <span className="ml-2">{location.phone}</span>
                    </div>
                    <Link
                      href="/"
                      className="flex items-center hover:underline"
                    >
                      <MapPin className="w-4 h-4 text-secondary mr-1" />
                      Get Directions
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-[600px] rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.642567181591!2d104.89949761524748!3d11.562108947456725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095105d51be689%3A0xf29c57f4a3a8de27!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1674938752450!5m2!1sen!2skh"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              className="border-none"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
