/* eslint-disable import/no-anonymous-default-export */
import { FETCH_PRODUCT } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT:
      return action.payload;
    default:
      return state;
  }
}