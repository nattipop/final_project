/* eslint-disable import/no-anonymous-default-export */
import { FETCH_RESTAURANT } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_RESTAURANT:
      return action.payload[0]
    default:
      return state;
  }
}