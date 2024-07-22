import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const BestSellerCard = ({ item }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === item.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); 

    return () => clearInterval(interval); 
  }, [item.images.length]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const addToCart = (product, quantity) => {
    console.log(`Added ${quantity} of ${product.title} to cart.`);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-60 max-w-sm mx-auto">
        <div
          className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
          style={{ backgroundImage: `url(${item.images[currentImageIndex]})` }}
        ></div>

        <div className="-mt-10 overflow-hidden rounded-lg shadow-lg w-44 bg-slate-800">
          <h3 className="p-2 text-xs text-center tracking-wide font-semibold text-white">
            {item.title}
          </h3>

          <div className="flex items-center justify-between px-3 py-2 bg-gray-700">
            <span className="font-bold text-gray-200">${item.price}</span>
            <button
              onClick={handleOpenModal}
              className="p-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
            >
              View
            </button>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        product={item}
        quantity={quantity}
        setQuantity={setQuantity}
        addToCart={addToCart}
      />
    </>
  );
};

export default BestSellerCard;
