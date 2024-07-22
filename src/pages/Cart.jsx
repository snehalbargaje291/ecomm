import React, { useEffect, useState, useContext } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { isSignedIn } = useUser();
  const { removeCartItem } = useContext(GlobalContext);

  const cartProducts = localStorage.getItem("cart");

  const handleRemoveItem = (id) => {
    removeCartItem(id);
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price),
    0
  );
  const shipping = subtotal < 299 ? 50.0 : 0.0;
  const total = subtotal + shipping;

  useEffect(() => {
    if (cartProducts) {
      setCartItems(JSON.parse(cartProducts));
    } else {
      setCartItems([]);
    }
  }, [cartProducts]);

  const navigate = useNavigate();
  const onHandleRoute = (route) => {
    navigate(route);
  }

  return (
    <div className="flex justify-center bg-slate-900 md:border rounded-lg">
      <div
        className="relative w-full bg-slate-900 shadow-lg rounded-lg p-6"
        aria-modal="true"
        role="dialog"
        tabIndex="-1"
      >
        <h2 className="text-2xl font-semibold text-gray-500 mb-6">
          Shopping Cart
        </h2>

        <ul className="divide-y divide-gray-200">
          {cartItems.length === 0 ? (
            <li className="py-12 text-center text-gray-500">
              <div className="flex flex-col items-center">
                <img
                  src="/bag.png"
                  alt="Empty Cart"
                  className="w-48 h-48 mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">
                  Your Cart is Empty
                </h3>
                <p className="text-sm mb-4">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <a
                  href="/shop"
                  className="text-blue-500 hover:text-blue-700 font-medium underline"
                >
                  Shop Now
                </a>
              </div>
            </li>
          ) : (
            cartItems.map((item) => (
              <li key={item.id} className="flex items-center gap-4 py-4">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg shadow-sm"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-500">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-300">Size: {item.size}</p>
                  <p className="text-sm text-gray-300">Price: ${item.price}</p>
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
                    <MdDeleteSweep size={20} />
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
              <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-500">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <div className="mt-6 flex flex-col items-center gap-4">
              {isSignedIn ? (
                <a
                href="/checkout"
                  className="block rounded bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600 transition"
                >
                  Checkout
                </a>
              ) : (
                <a
                href="/sign-in"
                  className="block rounded bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600 transition"
                >
                  Sign in to Checkout
                </a>
              )}

              <a
              href="/shop"
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
