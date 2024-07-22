import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import { GlobalContext } from "../context/GlobalState";

const Card = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = product.images || []; // Fallback to an empty array if images are not provided

  const { addCartItem } = useContext(GlobalContext);

  console.log(product);

  const addToCart = () => {
    console.log("Adding to cart", product, quantity);
    addCartItem({ ...product, quantity });
    setShowModal(false);
    setQuantity(1);
  };

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [images.length]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div data-aos="fade-up" className="flex items-center justify-center p-4">
        <div className="group relative block bg-black rounded-lg overflow-hidden shadow-lg w-64 h-80">
          <img
            alt="Product"
            src={images[currentIndex]}
            className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
          />

          <div className="relative p-4 bg-black bg-opacity-50 rounded-lg h-full flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-pink-500">
                {product.title}
              </p>
              <p className="text-xl font-bold text-white mt-2">
                ${product.price}
              </p>
            </div>

            <div className="flex justify-center mt-auto">
              <button
                onClick={handleOpenModal}
                className="text-white flex justify-center items-center group/modal-btn p-1 border-2 border-white rounded-lg transition duration-300 hover:bg-white hover:text-black"
              >
                View Product
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        product={product}
        quantity={quantity}
        setQuantity={setQuantity}
        addToCart={addToCart}
      />
    </>
  );
};

export default Card;
