import { useState } from "react";
import { FaUser, FaSignInAlt } from "react-icons/fa";
import Carousel from "./Carousel";

const Home = () => {
  const [activeTab, setActiveTab] = useState("Booking");
  const tabs = ["General", "Security", "Booking", "Payment", "Others"];

  return (
    <div className="font-sans bg-[#F8F3D9] px-0 py-0">
      {/* Navbar */}
      <nav className=" text-white flex flex-col mt-0 pt-0 mb-5 items-center">
        <div className="space-x-4 flex">
          <button className="px-4 py-2 bg-gray-800 rounded">Home</button>
          <button className="px-4 py-2 bg-gray-800 rounded">Contact Us</button>
          <button className="px-4 py-2 bg-gray-800 rounded flex items-center">
            <FaUser className="mr-2" /> Account
          </button>
          <button className="px-4 py-2 bg-gray-600 rounded flex items-center">
            <FaSignInAlt className="mr-2" /> Sign In
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded">Sign Up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-[#504B38] text-white text-center py-16 px-4">
        <h2 className="text-4xl font-bold mb-4">Unlock Endless Driving With Drivee</h2>
        <p className="mb-6">To contribute to a positive driving experience and offer sustainable vehicle rental options.</p>
        <div className="space-x-4">
          <button className="px-6 py-3 bg-blue-600 rounded">Rent Car</button>
          <button className="px-6 py-3 bg-gray-700 rounded">Rent Bike</button>
        </div>
      </header>

      {/* Rent Sections */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-16">
        <div>
          <h3 className="text-2xl font-bold mb-4">Rent A Car</h3>
          <p className="mb-4">Browse a variety of cars for rental at affordable prices.</p>
          <button className="px-6 py-3 bg-blue-600 rounded">Explore</button>
        </div>
        <img src="images/car-rental.jpg" alt="Rent a Car" className="rounded-lg shadow-lg h-[350px] w-[400px]" />
        
        <img src="images/bike-rental.jpg" alt="Rent a Bike" className="rounded-lg shadow-lg h-[350px] w-[400px]" />
        <div>
          <h3 className="text-2xl font-bold mb-4">Rent A Bike</h3>
          <p className="mb-4">Get the best bike rental deals and ride with ease.</p>
          <button className="px-6 py-3 bg-blue-600 rounded">Explore</button>
        </div>
      </section>

    <Carousel/>

      {/* Customer Testimonials */}
      <section className="text-center py-16 bg-gray-100">
        <h3 className="text-3xl font-bold mb-6">What Our Customers Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic">"Great experience with Drivee! Highly recommend."</p>
              <h4 className="mt-4 font-bold">Customer {i}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-8">
        <h3 className="text-3xl font-bold text-center mb-6">Have Any Questions?</h3>
        <div className="flex space-x-4 justify-center mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 ${activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200"} rounded`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <p>FAQs related to {activeTab} will be displayed here.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-8">
        <p>&copy; 2025 Drivee. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
