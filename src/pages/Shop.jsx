import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../Components/Card';
import CategoryList from '../Components/Categories';
import { FcNext, FcPrevious } from 'react-icons/fc';
import { useSearchParams } from 'react-router-dom';

const ITEMS_PER_PAGE = 8; 

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  const api = "https://api.escuelajs.co/api/v1/products";
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

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
        setAllProducts(parsedData);
        setFilteredProducts(parsedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (category) {
      const filtered = allProducts.filter(product => product.category.name === category);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [category, allProducts]);

  if (loading) {
    return <div className="min-h-screen bg-slate-900 p-4 flex text-white items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-slate-900 p-4 flex items-center justify-center">Error: {error}</div>;
  }

  // Paginate products
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
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
        <div className='my-10'>
        <h1 className="font-mono font-bold text-center text-lg tracking-wider text-gray-300 uppercase rounded-full bg-gray-accent-400">
          {category ? `Products in ${category}` : 'All Products'}
        </h1>
        <div className='flex flex-row justify-end items-center mx-20 text-white'>
        <div className="flex flex-col md:flex-row items-center justify-between p-4 md:gap-6 bg-slate-900">
      {/* Search Bar */}
      <div className="relative w-full md:w-1/2">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 text-sm border border-gray-700 bg-slate-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Filter Dropdown */}
      <div className="relative inline-block text-left md:w-1/2 mt-4 md:mt-0">
        <button
          type="button"
          className="inline-flex items-center text-sm font-medium text-gray-300 hover:text-gray-100"
          id="filter-button"
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          Filter by
          <svg
            className={`-mr-1 ml-1 h-5 w-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <div
            className="absolute right-0 m-4 mt-2 w-56 origin-top-right rounded-lg bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="filter-button"
            tabIndex="-1"
            style={{zIndex:9999}}
          >
            <div className="py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700"
                role="menuitem"
                tabIndex="-1"
              >
                Filter by title
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700"
                role="menuitem"
                tabIndex="-1"
              >
                Filter by price
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700"
                role="menuitem"
                tabIndex="-1"
              >
                Filter by price range
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700"
                role="menuitem"
                tabIndex="-1"
              >
                Filter by category
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
        </div>
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
            {currentPage} / {totalPages}
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
        </div>

      </motion.div>
    </div>
  );
};

export default Shop;
