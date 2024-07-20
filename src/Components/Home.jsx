import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryList from "./Categories";
import { motion } from "framer-motion";

const Home = () => {
  const [isPopoverVisible, setPopoverVisible] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setPopoverVisible(false);
    }, 10000); 

    return () => clearTimeout(timer);
  }, []);

  // Function to handle navigation
  const handleClaimDiscount = () => {
    setPopoverVisible(false); // Hide the popover
    navigate("/shop"); // Navigate to /shop
  };

  return (
    <div className="min-h-screen bg-slate-900">
      
      {/* Hero Section */}
      <section className="relative bg-indigo-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2670&auto=format&fit=crop"
            alt="Hero"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-4"
          >
            Discover Your Perfect Product
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg mb-8"
          >
            Explore our wide range of products and find exactly what you need.
          </motion.p>
          <motion.button
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-full font-semibold"
          >
            Shop Now
          </motion.button>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="p-4">
        <CategoryList />
      </section>

      {/* Discount Section */}
      <section className="overflow-hidden rounded-lg shadow-2xl md:grid md:grid-cols-3 bg-gray-50">
        <img
          alt="Seasonal Discount"
          src="https://images.unsplash.com/photo-1611510338559-2f463335092c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
          className="h-64 w-full object-cover md:h-full"
        />
        <div className="p-4 text-center sm:p-6 md:col-span-2 lg:p-8 flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-700">
            Limited Time Offer
          </p>
          <h2 className="mt-6 font-bold text-3xl sm:text-4xl lg:text-5xl">
            Save 20% <span className="text-xl">On Orders Over $50</span>
          </h2>
          <a
            className="mt-8 inline-block w-full bg-black py-3 text-sm font-bold uppercase tracking-widest text-white"
            href="#"
          >
            Claim Your Discount
          </a>
          <p className="mt-6 text-xs font-medium uppercase text-gray-500">
            Offer valid until March 31, 2024 *
          </p>
        </div>
      </section>

      {/* Popover Section */}
      {isPopoverVisible && (
        <motion.div
        initial={{ y: "-100vh", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 5 }}
       className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 relative">
            <button
              onClick={() => setPopoverVisible(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4">Limited Time Offer!</h2>
            <img
              alt="Seasonal Discount"
              src="https://images.unsplash.com/photo-1611510338559-2f463335092c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
              className="w-full h-40 object-cover mb-4 rounded-lg"
            />
            <p className="text-lg font-semibold">Save 20% on Orders Over $50!</p>
            <a
              onClick={handleClaimDiscount} // Add onClick handler
              href="#"
              className="mt-4 inline-block bg-black py-2 px-4 text-white text-sm font-bold uppercase rounded cursor-pointer"
            >
              Claim Your Discount
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Home;
