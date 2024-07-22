import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

const BestSellersSection = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products?offset=0&limit=8"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
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
        setBestSellers(parsedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) return;

    const handleMouseDown = (e) => {
      scrollContainer.isDragging = true;
      scrollContainer.startX = e.pageX - scrollContainer.offsetLeft;
      scrollContainer.scrollLeftStart = scrollContainer.scrollLeft;
    };

    const handleMouseMove = (e) => {
      if (!scrollContainer.isDragging) return;
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - scrollContainer.startX) * 2;
      scrollContainer.scrollLeft = scrollContainer.scrollLeftStart - walk;
    };

    const handleMouseUp = () => {
      scrollContainer.isDragging = false;
    };

    scrollContainer.addEventListener("mousedown", handleMouseDown);
    scrollContainer.addEventListener("mousemove", handleMouseMove);
    scrollContainer.addEventListener("mouseup", handleMouseUp);

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("mousedown", handleMouseDown);
        scrollContainer.removeEventListener("mousemove", handleMouseMove);
        scrollContainer.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [bestSellers]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-slate-900 mb-10 md:mb-20">
      <h2 className="font-mono font-bold text-center text-lg tracking-wider text-gray-300 uppercase rounded-full bg-gray-accent-400">
        Best Sellers
      </h2>

      <div
        className="scroll-container mx-4 flex overflow-x-auto no-scrollbar"
        ref={scrollContainerRef}
      >
        <div className="flex space-x-4">
          {bestSellers.map((item) => (
            <Card key={item.id} product={item} />
          ))}
        </div>
        
        <button className="w-full mx-4 px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
          <Link to="/shop">View All</Link>
        </button>
      </div>
    </div>
  );
};

export default BestSellersSection;
