export const cartReducer = (state, action) => {
  switch (action.type) {
    // case "ADD_TO_CART":
    //   return {
    //     ...state,
    //     cart: [...state.cart, action.payload],
    //   };
    case "ADD_TO_CART":
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    case "UPDATE_CART_ITEM":
      return {
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.id === action.payload.id ? action.payload : cartItem
        ),
      };
    default:
      return state;
  }
};

export const orderReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case "REMOVE_ORDER":
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };
    case "CLEAR_ORDERS":
      return {
        ...state,
        orders: [],
      };
    default:
      return state;
  }
};
