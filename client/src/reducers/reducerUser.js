/* eslint-disable import/no-anonymous-default-export */
import { FETCH_BY_EMAIL } from "../actions/types";

const initialState = {}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_BY_EMAIL:
      return action.payload;
    default:
      return state
  }
};