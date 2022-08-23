/* eslint-disable import/no-anonymous-default-export */
import { FETCH_LOCATION } from "../actions/types"

const initialValues = {}

export default function(state = initialValues, action) {
  switch(action.type) {
    case FETCH_LOCATION:
      debugger;
      return action.payload;
    default:
      return state;
  }
}