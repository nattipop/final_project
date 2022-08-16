import axios from "axios";
import { AUTH_ERROR, AUTH_USER, FETCH_PRODUCTS, FETCH_AVAILABLE } from "./types";

const BASE_URL = "http://localhost:3000"
export const signin = (formProps, callback) => dispatch => {
  axios.post(`${BASE_URL}/auth/signin`, formProps).then((response) => {
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem('token', response.data.token);
    callback();
  }).catch(function (error) {
    dispatch({ type: AUTH_ERROR, payload: error });
  });
};

export const signout = (callback) => dispatch => {
  localStorage.removeItem('token');

  dispatch({ type: AUTH_USER, payload: '' });
  callback()
};

export const fetchProducts = () => dispatch => {
  axios.get(`${BASE_URL}/items`).then((response) => {
    dispatch({ type: FETCH_PRODUCTS, payload: response.data })
  }).catch((err) => {
    console.log(err)
  })
};

export const fetchAvailable = (time) => dispatch => {
  axios.get(`${BASE_URL}/items/${time}`).then((response) => {
    dispatch({ type: FETCH_AVAILABLE, payload: response.data })
  }).catch(err => {
    console.log(err)
  })
};