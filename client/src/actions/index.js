import axios from "axios";
import { AUTH_ERROR, AUTH_USER, FETCH_PRODUCTS, FETCH_AVAILABLE, FETCH_USER, FETCH_BY_EMAIL, CREATE_USER, FETCH_PRODUCT, FETCH_RESTAURANT, ADD_TO_CART, CLEAR_USER, EDIT_CART, EDIT_USER, REMOVE_USER, EDIT_IMAGE } from "./types";

import { url } from "../config/keys"

export const signin = (formProps) => dispatch => {
  axios.post(`${url}/auth/signin`, formProps).then((response) => {
    localStorage.setItem('token', response.data.token);
  }).catch(function (error) {
    dispatch({ type: AUTH_ERROR, payload: error });
  });
};

export const signout = (callback) => dispatch => {
  localStorage.removeItem('token');

  dispatch({ type: REMOVE_USER, payload: '' })
  dispatch({ type: AUTH_USER, payload: '' });
  callback()
};

export const signup = (formProps) => dispatch => {
  axios.post(`${url}/auth/signup`, formProps).then((response) => {
    dispatch({ type: CREATE_USER, payload: response.data })
    localStorage.setItem("token", response.data.token)
  }).catch((err) => {
    dispatch({ type: AUTH_ERROR, payload: err })
  });
}

export const fetchProducts = () => dispatch => {
  axios.get(`${url}/items`).then((response) => {
    dispatch({ type: FETCH_PRODUCTS, payload: response.data })
  }).catch((err) => {
    console.log(err)
  })
};

export const fetchAvailable = (time) => dispatch => {
  axios.get(`${url}/items/${time}`).then((response) => {
    dispatch({ type: FETCH_AVAILABLE, payload: response.data })
  }).catch(err => {
    console.log(err)
  })
};

export const fetchUser = (token) => dispatch => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  };

  axios.get(
    `${url}/user`,
    config
  ).then(function (response) {
    dispatch({ type: FETCH_USER, payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const fetchUserByEmail = (email) => dispatch => {
  axios.get(`${url}/users/by-email/${email}`).then((response) => {
    dispatch({ type: FETCH_BY_EMAIL, payload: response.data })
  }).catch(err => {
    console.log(err)
  })
};

export const fetchProduct = (id) => dispatch => {
  axios.get(`${url}/items/product/${id}`).then((response) => {
    dispatch({ type: FETCH_PRODUCT, payload: response.data })
  }).catch(err => {
    console.log(err)
  })
}

export const fetchRestaurant = () => dispatch => {
  axios.get(`${url}/restaurant`).then((response) => {
    dispatch({ type: FETCH_RESTAURANT, payload: response.data })
  }).catch(err => {
    console.log(err)
  })
};

export const addToCart = (id, user) => dispatch => {
  axios.put(`${url}/users/cart/${id}`, user).then(response => {
    dispatch({ type: CLEAR_USER })
    dispatch({ type: ADD_TO_CART, payload: response.data });
  }).catch(err => {
    console.log(err)
  });
};

export const editCart = (id, cart) => dispatch => {
  axios.put(`${url}/users/cart/edit/${id}`, cart).then(response => {
    dispatch({ type: EDIT_CART, payload: response.data.cart})
  }).catch(err => {
    console.log(err)
  })
}

export const editUser = (id, path, value) => dispatch => {
  axios.put(`${url}/user/${id}`, {path: path, value: value}).then(response => {
    dispatch({ type: EDIT_USER, payload: response.data })
  }).catch(err => {
    console.log(err)
  })
}

export const setImage = (blob) => dispatch => {
  dispatch({ type: EDIT_IMAGE, payload: blob })
};