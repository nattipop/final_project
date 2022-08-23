/* eslint-disable import/no-anonymous-default-export */
import { ADD_TO_CART, EDIT_CART, FETCH_BY_EMAIL, FETCH_USER } from "../actions/types";

const initialState = {}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_BY_EMAIL:
      return {
        ...state,
        user: action.payload[0],
        cart: action.payload[0].cart
      }
    case FETCH_USER:
      return {
        ...state,
        user: action.payload[0],
        cart: action.payload[0].cart
      }
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.payload.cart
      }
    case EDIT_CART:
      return {
        ...state,
        cart: action.payload
      }
    default:
      return state
  }
};