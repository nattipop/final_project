import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import { CreateBrowserRouter, RouterProvider } from "react-router-dom";
import Menu from './components/Menu';
import Signup from './components/Signup';
import Signin from './components/Signin';
import MenuItem from './components/MenuItem';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from './reducers';
import Signout from './components/Signout';
import SetTime from './components/SetTime';
import OrderMenu from './components/OrderMenu';
import Profile from "./components/Profile"
import OrderSignout from './components/OrderSignout';
import ProfileSignout from './components/ProfileSignout';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import EmailVerification from './components/EmailVerification';

const store = createStore(rootReducer, {}, applyMiddleware(thunk));
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = CreateBrowserRouter([
  {
    path: "/",
    element: Menu
  },
  {
    path: "/signout",
    element: Signout
  },
  {
    path: "/set-time",
    element: SetTime
  },
  {
    path: "verify-user-email/:userToken",
    element: EmailVerification
  },
  {
    path: "/profile",
    element: Profile
  },
  {
    path: "/profile/signout",
    element: ProfileSignout
  },
  {
    path: "/order-menu",
    element: OrderMenu
  },
  {
    path: "/order-menu/signout",
    element: OrderSignout
  },
  {
    path: "/order-menu/cart",
    element: Cart
  },
  {
    path: "/order-checkout",
    element: Checkout
  },
  {
    path: "/products/:productId",
    element: MenuItem
  },
  {
    path: "account/signup",
    element: Signup
  },
  {
    path: "account/signin",
    element: Signin
  }
])

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);