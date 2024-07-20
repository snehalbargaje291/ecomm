import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { MdDeleteSweep } from 'react-icons/md';

const initialCartItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1588484628369-dd7a85bfdc38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHNuZWFrZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=150&q=60',
    name: 'Nike Air Max 2019',
    size: '36EU - 4US',
    price: '1259.00',
    quantity: 1
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=150&q=60',
    name: 'Nike Air Max 2019',
    size: '36EU - 4US',
    price: '1259.00',
    quantity: 1
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);
  const shipping = subtotal < 299 ? 50.00 : 0.00;
  const total = subtotal + shipping;

  return (
    <div className='flex justify-center bg-slate-900 border rounded-lg'>
      <div
        className="relative w-full bg-slate-900 shadow-lg rounded-lg p-6"
        aria-modal="true"
        role="dialog"
        tabIndex="-1"
      >
        {/* <button
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-400 transition-transform transform hover:scale-110"
          aria-label="Close cart"
        >
          <CgClose/>
        </button> */}

        <h2 className="text-2xl font-semibold text-gray-500 mb-6">Shopping Cart</h2>

        <ul className="divide-y divide-gray-200">
          {cartItems.length === 0 ? (
            <li className="py-12 text-center text-gray-500">
            <div className="flex flex-col items-center">
              <img
                src="../../src/assets/bag.png"
                alt="Empty Cart"
                className="w-48 h-48 mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Your Cart is Empty</h3>
              <p className="text-sm mb-4">Looks like you haven't added anything to your cart yet.</p>
              <a
                href="/shop"
                className="text-blue-500 hover:text-blue-700 font-medium underline"
              >
                Shop Now
              </a>
            </div>
          </li>          
          ) : (
            cartItems.map(item => (
              <li key={item.id} className="flex items-center gap-4 py-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg shadow-sm"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-500">{item.name}</h3>
                  <p className="text-sm text-gray-300">Size: {item.size}</p>
                  <p className="text-sm text-gray-300">Price: ₹{item.price}</p>
                </div>

                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    className="w-16 h-8 border border-gray-300 rounded-md text-center text-gray-500"
                    readOnly
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-gray-500 hover:text-red-600 transition-colors"
                    aria-label={`Remove ${item.name}`}
                  >
                    <MdDeleteSweep size={20}/>
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        {cartItems.length > 0 && (
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="flex justify-between text-gray-400 mb-4">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400 mb-4">
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-500">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <div className="mt-6 flex flex-col items-center gap-4">
              {/* <a
                href="#"
                className="block rounded border border-gray-300 px-4 py-2 text-sm text-gray-400 hover:ring-1 hover:ring-gray-300 transition"
              >
                View Cart ({cartItems.length})
              </a> */}

              <a
                href="#"
                className="block rounded bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600 transition"
              >
                Checkout
              </a>

              <a
                href="#"
                className="text-sm text-gray-500 underline hover:text-gray-300"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
