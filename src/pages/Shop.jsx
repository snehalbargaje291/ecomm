import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "../Components/Card";
import CategoryList from "../Components/Categories";
import { FcNext, FcPrevious } from "react-icons/fc";
import { useSearchParams } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

const ITEMS_PER_PAGE = 8;

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const api = "https://api.escuelajs.co/api/v1/products";
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      const parsedData = data.map((product) => {
        let images;
        try {
          images = JSON.parse(product.images[0]);
        } catch (e) {
          images = product.images;
        }
        return {
          ...product,
          images,
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

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (category) {
      const filtered = allProducts.filter(
        (product) => product.category.name === category
      );
      setFilteredProducts(filtered);
      setCurrentPage(1);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [category, allProducts]);

  const handleSearch = async () => {
    if (searchTerm.trim() !== '') {
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/?title=${searchTerm}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const parsedData = data.map((product) => {
          let images;
          try {
            images = JSON.parse(product.images[0]);
          } catch (e) {
            images = product.images;
          }
          return {
            ...product,
            images,
          };
        });
        setFilteredProducts(parsedData);
        setCurrentPage(1); 
      } catch (error) {
        setError(error.message);
      }
    } else {
      setFilteredProducts(allProducts);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 p-4 flex text-white items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 p-4 flex items-center justify-center">
        Error: {error}
      </div>
    );
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
        <p className="text-center text-gray-200 mb-4">
          Welcome to the shop section! Explore our products below.
        </p>
        <CategoryList />
        <div className="my-10">
          <h1 className="font-mono font-bold text-center text-lg tracking-wider text-gray-300 uppercase rounded-full bg-gray-accent-400">
            {category ? `Products in ${category}` : "All Products"}
          </h1>
          <div className="flex flex-row justify-center md:justify-end items-center lg:mx-20 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between p-4 gap-4 bg-slate-900">
              {/* Search Bar */}
              <div className="relative flex flex-row w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-2 text-sm border-b bg-transparent text-gray-300 focus:outline-none focus:ring-2 focus:ring-transparent mx-2"
                  value={searchTerm}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearch}><BiSearch size={20} /></button>
              </div>

              {/* Filter Dropdown */}
              <div className="relative w-full md:w-1/2">
                <button
                  type="button"
                  className="inline-flex border justify-center p-2 rounded-lg w-full items-center text-sm font-medium text-gray-300 hover:text-gray-100"
                  onClick={() => {
                    setFilteredProducts(allProducts);
                    setSearchTerm('');
                  }}
                >
                  View All
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:m-6 lg:m-10 gap-4">
            {paginatedProducts.map((item) => (
              <motion.div
                key={item.id}
                className="relative"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <Card product={item} />
              </motion.div>
            ))}
          </div>
          {totalPages === 0 && (
            <div className="flex flex-col items-center justify-center mt-10 p-6 bg-slate-900">
              <p className="text-lg font-medium text-gray-300">
                No products available!
              </p>
              <p className="text-sm text-gray-500">
                Please check back later or try a different category.
              </p>
            </div>
          )}

          {totalPages > 0 && (
            <div className="flex items-center justify-center mt-6 space-x-2">
              <button
                onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                className={`flex items-center justify-center p-2 text-white rounded-full hover:bg-gray-700 transition duration-300 ease-in-out disabled:opacity-50 ${
                  currentPage === 1 ? "hidden" : ""
                }`}
                disabled={currentPage === 1}
              >
                <FcPrevious />
                <span className="sr-only">Previous</span>
              </button>

              <span className="text-gray-300 font-medium">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((page) => Math.min(page + 1, totalPages))
                }
                className={`flex items-center justify-center p-2 text-white rounded-full hover:bg-gray-700 transition duration-300 ease-in-out disabled:opacity-50 ${
                  currentPage === totalPages ? "hidden" : ""
                }`}
                disabled={currentPage === totalPages}
              >
                <FcNext />
                <span className="sr-only">Next</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Shop;
