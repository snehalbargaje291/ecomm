import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { BiCartAdd } from "react-icons/bi";
import { MdClose } from "react-icons/md";

const Modal = ({
  show,
  onClose,
  product,
  quantity,
  setQuantity,
  addToCart,
}) => {
  return (
    <Dialog.Root open={show} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-70 z-50" />
        <Dialog.Content className="fixed inset-0 flex justify-center items-center z-50 p-6">
          <div className="relative w-full max-w-lg bg-slate-900 rounded-lg shadow-lg p-6">
            <Dialog.Close
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-300 transition"
            >
              <MdClose size={20} />
            </Dialog.Close>
            <div className="flex flex-col md:flex-row items-center justify-center">
              <div className="mx-2 flex flex-col items-center justify-center lg:w-1/2">
                <Dialog.Title className="text-xl text-gray-200 font-semibold mb-4 text-center">
                  {product.title}
                </Dialog.Title>
                <img
                  alt="Product"
                  src={product.images[0]}
                  className="w-32 md:w-40 lg:w-48 h-auto object-cover rounded-lg"
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-4 mt-4 md:mt-0">
                <p className="text-gray-400 mb-4 text-xs sm:text-sm text-center">
                  {product.description}
                </p>
                <p className="text-lg font-semibold text-gray-300 mb-4 text-center">
                  ${product.price}
                </p>
                <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 bg-gray-700 text-white text-xl font-semibold flex items-center justify-center rounded-md border border-gray-600 transition-colors duration-300 hover:bg-teal-600"
                    >
                      -
                    </button>
                    <input
                      id="quantity"
                      type="number"
                      disabled
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(parseInt(e.target.value) || 1)
                      }
                      min="1"
                      className="w-10 h-8 text-center text-md bg-gray-800 text-white border border-gray-700 rounded-md"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 bg-gray-700 text-white text-xl font-semibold flex items-center justify-center rounded-md border border-gray-600 transition-colors duration-300 hover:bg-teal-600"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(product, quantity);
                      onClose();
                    }}
                    className="bg-gray-800 text-white p-2 rounded-md flex items-center hover:bg-teal-600 transition"
                  >
                    <BiCartAdd size={20} className="mr-2" />
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
