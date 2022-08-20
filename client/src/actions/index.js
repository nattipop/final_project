import axios from "axios";
import { AUTH_ERROR, AUTH_USER, FETCH_PRODUCTS, FETCH_AVAILABLE, FETCH_USER, FETCH_BY_EMAIL, CREATE_USER, FETCH_PRODUCT } from "./types";

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

export const signup = (formProps) => dispatch => {
  axios.post(`${BASE_URL}/auth/signup`, formProps).then((response) => {
    dispatch({ type: CREATE_USER, payload: response.data })
    localStorage.setItem("token", response.data.token)
  }).catch((err) => {
    dispatch({ type: AUTH_ERROR, payload: err })
  });
}

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

export const fetchUser = (id) => dispatch => {
  axios.get(`${BASE_URL}/users/${id}`).then((response) => {
    dispatch({ type: FETCH_USER, payload: response.data })
  }).catch(err => {
    console.log(err)
  })
};

export const fetchUserByEmail = (email) => dispatch => {
  axios.get(`${BASE_URL}/users/by-email/${email}`).then((response) => {
    dispatch({ type: FETCH_BY_EMAIL, payload: response.data })
  }).catch(err => {
    console.log(err)
  })
};

export const fetchProduct = (id) => dispatch => {
  axios.get(`${BASE_URL}/items/product/${id}`).then((response) => {
    dispatch({ type: FETCH_PRODUCT, payload: response.data })
  }).catch(err => {
    console.log(err)
  })
}
