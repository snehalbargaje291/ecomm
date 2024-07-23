import React from 'react';
import { FaStore } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyOrders = () => {

  return (
    <div className="my-orders max-w-4xl mx-auto p-4">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-100">
            Congratulations! Your order is placed successfully.
          </h1>
          <p className="text-lg text-gray-400 mb-4">
            Thank you for shopping with us. You can{' '}
            <Link to="/shop" className="text-blue-400 hover:underline flex items-center justify-center">
              <FaStore className="mr-2" />
              Shop More
            </Link>{' '}
            or visit our home page.
          </p>
        </div>
    </div>
  );
};

export default MyOrders;
