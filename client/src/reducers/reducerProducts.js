/* eslint-disable import/no-anonymous-default-export */
import { FETCH_AVAILABLE, FETCH_PRODUCTS } from "../actions/types";

const initialState = []

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_PRODUCTS:
      console.log(action.payload)
      return action.payload;
    case FETCH_AVAILABLE:
      return action.payload;
    default:
      return state;
  }
}