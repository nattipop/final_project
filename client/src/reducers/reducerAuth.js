/* eslint-disable import/no-anonymous-default-export */
import { AUTH_USER, AUTH_ERROR, CREATE_USER } from "../actions/types";

const initialState = {
  authenticated: localStorage.getItem("token") || "",
  errorMessage: "",
  email: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case AUTH_USER:
      return {...state, authenticated: action.payload.token, email: action.payload.email || null, errorMessage: null};
    case AUTH_ERROR:
      return {...state, errorMessage: action.payload};
    case CREATE_USER:
      return {...state, authenticated: action.payload.token, email: action.payload.email || null, errorMessage: null}
    default:
      return state;
  }
}