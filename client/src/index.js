import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './components/Menu';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Category from './components/Category';
import MenuItem from './components/MenuItem';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from './reducers';
import Signout from './components/Signout';
import SetTime from './components/SetTime';
import OrderMenu from './components/OrderMenu';

const store = createStore(rootReducer, {}, applyMiddleware(thunk));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Menu/>} >
            <Route path="signout" element={<Signout/>} />
            <Route path="/set-time" element={<SetTime />} />
            <Route path="/menu/:category" element={<Category />} >
              <Route path="/menu/:category/:productId" element={<MenuItem />} />
            </Route>
          </Route>
          <Route path="/order-menu" element={<OrderMenu />} />
          <Route path="account/signup" element={<Signup/>} />
          <Route path="account/signin" element={<Signin/>} />
        </Routes>
      </BrowserRouter>
  </Provider>
);
