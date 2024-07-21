import React from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdMail } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <h1 className="max-w-lg text-xl font-semibold tracking-tight xl:text-2xl text-white">
              Subscribe to our newsletter for the latest updates and offers.
            </h1>

            <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
              <input
                id="email"
                type="email"
                className="px-4 py-2 text-gray-700 border rounded-md bg-gray-900 focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                placeholder="Email Address"
              />

              <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                Subscribe
              </button>
            </div>
          </div>

          <div>
            <p className="font-semibold text-white">Customer Service</p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500"
              >
                Track Order
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500"
              >
                Return Policy
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500"
              >
                FAQs
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-white">Company</p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500"
              >
                Careers
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>

        <hr className="my-4 border-gray-200 md:my-6 dark:border-gray-700" />

        <div className="flex items-center justify-between">
          <Link to="/"> 
            <img className="w-auto h-16" src="/Bharatgologo.png" alt="Logo" />
          </Link>

          <div className="flex -mx-2">
            <a
              href="#"
              className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500"
              aria-label="Github"
            >
              <BsGithub size={24} />
            </a>

            <a
              href="#"
              className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500"
              aria-label="LinkedIn"
            >
              <BsLinkedin size={24} />
            </a>

            <a
              href="#"
              className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500"
              aria-label="Email"
            >
              <MdMail size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
