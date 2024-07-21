import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/categories"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const filteredCategories = data.filter(
          (category) => category.image !== "https://placeimg.com/640/480/any"
        );
        setCategories(filteredCategories);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
    scrollContainerRef.current.style.scrollBehavior = 'auto'; // Disable smooth scroll while dragging
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    scrollContainerRef.current.style.scrollBehavior = 'smooth'; // Enable smooth scroll after dragging
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startX.current; // Scroll amount
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-slate-900">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="font-mono font-bold text-center text-lg tracking-wider text-gray-300 uppercase rounded-full bg-gray-accent-400"
      >
        Shop By Categories
      </motion.h2>

      <div
        className="scroll-container flex"
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {categories.length === 0 ? (
          <p>No categories available.</p>
        ) : (
          categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="card cursor-pointer relative h-32 w-32 lg:w-40 lg:h-40 bg-cover bg-center rounded-full bg-gray-300"
              style={{ backgroundImage: `url(${category.image})` }}
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 6,
                duration: 1,
                ease: "easeOut",
                delay: index * 0.2,
              }}
              whileHover={{
                backdropFilter: "blur(10px)",
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <motion.div
                className={`absolute inset-0 flex items-center justify-center bg-opacity-50 rounded-full`}
                animate={
                  hoveredIndex !== null && hoveredIndex !== index
                    ? { scale: 0.8, opacity: 0.6 }
                    : { scale: 1, opacity: 1 }
                }
                transition={{ duration: 0.2 }}
              >
                <motion.h2
                  className="text-xs md:text-lg font-semibold overflow-hidden text-white"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  whileHover={{
                    scale: 1.1,
                    y: -10,
                    color: "#FFD700",
                  }}
                  onClick={() => {
                    navigate(`/shop?category=${category.name}`);
                  }}
                >
                  {category.name}
                </motion.h2>
              </motion.div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryList;
