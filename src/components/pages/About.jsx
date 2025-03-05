import SearchBookForm from "./HeroBookForm";

export default function About() {
  return (
    <div className="bg-mainbg">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <section className="mb-16">
          <h1 className="text-3xl text-Textcolor font-bold text-center mb-6">
            About Us
          </h1>
          <div className="text-Textcolor leading-relaxed space-y-4 text-start">
            <p>
              At Giant Ibis, customer care is at the heart of everything we do.
              We prioritize your safety and comfort, offering premium bus
              services at reasonable prices to make your journey hassle-free and
              enjoyable.
            </p>
            <p>
              As Cambodia's leading responsible bus company, we go beyond
              expectations by providing refreshments, breaks at reliable rest
              stops, Wi-Fi access, and convenient travel arrangements, including
              tuktuk and taxi pickups at our stations.
            </p>
            <p>
              Our extensive network connects major destinations in Cambodia,
              including Phnom Penh, Siem Reap, Sihanoukville, Kep, and Kampot,
              and extends to Thailand and Vietnam. Whether it's a day journey or
              our overnight buses, safety is our top priority, with two
              experienced drivers per trip.
            </p>
            <p>
              Unlike other bus companies, we focus solely on passenger travel,
              avoiding unnecessary stops for package deliveries and detours.
              This ensures efficient, direct routes with minimal disruptions.
            </p>
            <p>
              We are continually upgrading our fleet and services to meet your
              needs. With onboard Wi-Fi, power points, and reliable vehicle
              maintenance, we ensure you stay connected and comfortable
              throughout your journey.
            </p>
            <p>
              As a proud representative of Cambodia's national bird, the Giant
              Ibis, we actively support its conservation efforts by donating a
              portion of our profits to initiatives protecting this endangered
              species.
            </p>
            <p>
              Join us in exploring the stunning landscapes of Cambodia, from
              ancient temples to vibrant cities and pristine beaches. At Giant
              Ibis, we are committed to serving you with excellence.
            </p>
          </div>
        </section>
        <section className="text-center mb-16">
          <h2 className="text-2xl text-Textcolor font-bold mb-4">Vision</h2>
          <div className="border-dashed border-2 border-primary p-6 rounded-md inline-block">
            <p className="text-Textcolor">
              To be Cambodia's most trusted and sustainable transport provider,
              offering safe, reliable, and eco-friendly travel experiences while
              supporting the conservation of Cambodia’s natural heritage.
            </p>
          </div>
        </section>
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-6">Missions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white shadow-custom  p-8 rounded-lg">
              <p className="text-Textcolor">
                Deliver exceptional service that prioritizes passenger safety,
                comfort, and convenience.
              </p>
            </div>
            <div className="bg-white shadow-custom  p-8 rounded-lg">
              <p className="text-Textcolor">
                Continuously enhance our fleet and technology to exceed customer
                expectations.
              </p>
            </div>
            <div className="bg-white shadow-custom  p-8 rounded-lg">
              <p className="text-Textcolor">
                Promote responsible tourism by supporting conservation efforts
                and sustainable practices.
              </p>
            </div>
            <div className="bg-white shadow-custom  p-8 rounded-lg">
              <p className="text-Textcolor">
                Strengthen connections within Cambodia and beyond, making travel
                accessible and enjoyable for all.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
