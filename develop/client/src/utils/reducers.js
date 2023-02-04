import { useReducer } from "react";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  TOGGLE_CART_VISIBILITY,
  REPLACE_PRODUCTS
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {

    case REPLACE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };


    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };
    
    case REMOVE_FROM_CART:
      let newState = state.cart.filter(product => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      };

    case TOGGLE_CART_VISIBILITY:
      return {
        ...state,
        cartOpen: !state.cartOpen
      };
    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState)
}
