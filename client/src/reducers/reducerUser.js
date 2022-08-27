/* eslint-disable import/no-anonymous-default-export */
import { ADD_TO_CART, EDIT_CART, EDIT_IMAGE, EDIT_USER, FETCH_BY_EMAIL, FETCH_USER, REMOVE_USER } from "../actions/types";

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
        user: action.payload,
        cart: action.payload.cart
      }
    case REMOVE_USER:
      return initialState
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
    case EDIT_USER:
      return {
        ...state,
        user: action.payload
      }
    case EDIT_IMAGE:
      console.log(action.payload)
      return {
        ...state,
        user: {
          ...state.user,
          picture: {
            ...state.user.picture,
            profile: action.payload
          }
        }
      }
    default:
      return state
  }
};