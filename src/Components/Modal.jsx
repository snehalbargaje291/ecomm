import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { BiCartAdd } from 'react-icons/bi';

const Modal = ({ show, onClose, product, quantity, setQuantity, addToCart }) => {
  return (
    <Dialog.Root open={show} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
        <Dialog.Content className="fixed inset-0 flex justify-center items-center z-50 p-4">
          <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
            <Dialog.Close
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition"
            >
              ✖
            </Dialog.Close>
            <Dialog.Title className="text-lg md:text-xl text-neutral-600 font-bold mb-4 text-center">
              Grab the{' '}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 border border-gray-200">
                {product.title}
              </span>{' '}
              now!
            </Dialog.Title>
            <div className="flex flex-col md:flex-row items-center justify-center">
              <div className="mx-2 lg:w-1/2 flex justify-center">
                <img
                  alt="Product"
                  src={product.images[0]}
                  className="w-32 md:w-50 h-auto lg:w-full md:h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-cover rounded-lg"
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-4 mt-4 md:mt-0">
                <p className="text-xl font-bold text-neutral-700 mb-4 text-center">
                  {product.price}
                </p>
                <p className="text-neutral-600 mb-6 text-sm sm:text-base text-center">
                  A brief description of the product goes here. It includes details like features, benefits, and any other relevant information.
                </p>
                <div className="p-2 flex flex-col md:flex-row gap-6 items-center justify-center">
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-sm transition"
                    >
                      -
                    </button>
                    <input
                      id="quantity"
                      type="number"
                      disabled
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      min="1"
                      className="w-16 text-center py-1 text-sm sm:text-base"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-sm sm:text-base transition"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      addToCart(product, quantity);
                      onClose();
                    }}
                    className="bg-black text-white text-sm px-4 py-2 rounded-md border border-black flex items-center hover:bg-gray-800 transition"
                  >
                    <BiCartAdd size={20} className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
