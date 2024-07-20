import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../Components/Card';
import CategoryList from './Categories';
import { FcNext, FcPrevious } from 'react-icons/fc';

const ITEMS_PER_PAGE = 8; // Number of items to display per page

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const api = "https://api.escuelajs.co/api/v1/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(api);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const parsedData = data.map(product => {
          let images;
          try {
            images = JSON.parse(product.images[0]);
          } catch (e) {
            images = product.images;
          }
          return {
            ...product,
            images
          };
        });
        setProducts(parsedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">Error: {error}</div>;
  }

  // Paginate products
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div id="shop" className="min-h-screen bg-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="font-mono font-bold text-center text-3xl tracking-wider text-gray-300 uppercase rounded-full bg-gray-accent-400">
          Shop
        </h1>
        <p className="text-center text-gray-200 mb-4">Welcome to the shop section! Explore our products below.</p>
        <CategoryList />
        <h1 className="font-mono font-bold text-center text-lg tracking-wider text-gray-300 uppercase rounded-full bg-gray-accent-400">
          All Products
        </h1>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:m-6 lg:m-10 gap-4'>
          {paginatedProducts.map((item) => (
            <motion.div
              key={item.id}
              className='relative'
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Card product={item} />
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center mt-6 space-x-2">
  <button
    onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
    className={`flex items-center justify-center p-2 text-white rounded-full hover:bg-gray-700 transition duration-300 ease-in-out disabled:opacity-50 ${currentPage === 1 ? 'hidden' : ''}`}
    disabled={currentPage === 1}
  >
    <FcPrevious/>
    <span className="sr-only">Previous</span>
  </button>
  
  <span className="text-gray-300 font-medium">
    {currentPage} of {totalPages}
  </span>
  
  <button
    onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
    className={`flex items-center justify-center p-2 text-white rounded-full hover:bg-gray-700 transition duration-300 ease-in-out disabled:opacity-50 ${currentPage === totalPages ? 'hidden' : ''}`}
    disabled={currentPage === totalPages}
  >
    <FcNext/>
    <span className="sr-only">Next</span>
  </button>
</div>

      </motion.div>
    </div>
  );
};

export default Shop;
