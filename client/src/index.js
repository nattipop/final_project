import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const store = createStore(rootReducer, {}, applyMiddleware(thunk));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Menu/>} >
            <Route exact path="/signout" element={<Signout/>} />
            <Route path="/set-time" element={<SetTime />} />
          </Route>
          
          <Route exact path="/profile/:userName" element={<Profile />} >
            <Route path="/profile/:userName/signout" element={<ProfileSignout />} />
          </Route>
          <Route exact path="/order-menu" element={<OrderMenu />}>
            <Route path="/order-menu/signout" element={<OrderSignout />} />
            <Route path="/order-menu/cart" element={<Cart />} />
          </Route>
          <Route path="/products/:productId" element={<MenuItem />} />
          <Route path="account/signup" element={<Signup/>} />
          <Route path="account/signin" element={<Signin/>} />
        </Routes>
      </BrowserRouter>
  </Provider>
);

