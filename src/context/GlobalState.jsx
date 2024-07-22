import { useEffect } from "react";
import { cartReducer, orderReducer } from "./AppReducer";
import { createContext, useReducer } from "react";

// Initial state
const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  orders: localStorage.getItem("orders")
    ? JSON.parse(localStorage.getItem("orders"))
    : [],
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialState);
  const [orderState, orderDispatch] = useReducer(orderReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState.cart));
    localStorage.setItem("orders", JSON.stringify(orderState.orders));
  }, [cartState.cart, orderState.orders]);

  const addOrder = (order) => {
    orderDispatch({
      type: "ADD_ORDER",
      payload: order,
    });
  };

  const removeOrder = (id) => {
    orderDispatch({
      type: "REMOVE_ORDER",
      payload: id,
    });
  };

  const clearOrders = () => {
    orderDispatch({
      type: "CLEAR_ORDERS",
    });
  };

  const addCartItem = (cartItem) => {
    cartDispatch({
      type: "ADD_TO_CART",
      payload: cartItem,
    });
  };

  const removeCartItem = (id) => {
    cartDispatch({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
  };

  const clearCart = () => {
    cartDispatch({
      type: "CLEAR_CART",
    });
  };

  const updateCartItem = (cartItem) => {
    cartDispatch({
      type: "UPDATE_CART_ITEM",
      payload: cartItem,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        cart: cartState.cart,
        orders: orderState.orders,
        addOrder,
        removeOrder,
        clearOrders,
        addCartItem,
        removeCartItem,
        clearCart,
        updateCartItem,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
