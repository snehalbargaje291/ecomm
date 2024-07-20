import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Us
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Learn more about our story, mission, and team
          </motion.p>
        </div>

        {/* Company Story */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 md:pr-8"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We started with a simple idea: to make shopping easier and more enjoyable. From our humble beginnings, we've grown into a leading e-commerce platform, committed to providing quality products and exceptional service.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to continuously innovate and offer our customers the best online shopping experience, ensuring that every product we offer meets our high standards of quality.
              </p>
            </motion.div>
            <motion.div
              className="md:w-1/2 mt-8 md:mt-0"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <img src="https://via.placeholder.com/500x300" alt="Company Story" className="w-full h-auto rounded-lg shadow-lg" />
            </motion.div>
          </div>
        </div>

        {/* Mission and Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Mission & Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Customer Focus</h4>
              <p className="text-gray-700 leading-relaxed">
                Our customers are at the heart of everything we do. We are committed to understanding their needs and exceeding their expectations.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h4>
              <p className="text-gray-700 leading-relaxed">
                We strive to stay ahead of the curve by continuously innovating and improving our services and products.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Integrity</h4>
              <p className="text-gray-700 leading-relaxed">
                We uphold the highest standards of integrity and transparency in all our business practices.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Meet the Team */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Meet the Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <img src="https://via.placeholder.com/150" alt="Team Member 1" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Jane Doe</h4>
              <p className="text-gray-600">CEO & Founder</p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img src="https://via.placeholder.com/150" alt="Team Member 2" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">John Smith</h4>
              <p className="text-gray-600">Chief Technology Officer</p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <img src="https://via.placeholder.com/150" alt="Team Member 3" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Alice Johnson</h4>
              <p className="text-gray-600">Head of Marketing</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
