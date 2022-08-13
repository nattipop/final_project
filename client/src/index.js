import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './components/Menu';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Signout from './components/Signout';
import Category from './components/Category';
import MenuItem from './components/MenuItem';
import OrderMenu from './components/OrderMenu';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu/>} >
          <Route path="/menu/:category" element={<Category />} >
            <Route path="/:category/:productId" element={<MenuItem />} />
          </Route>
        </Route>
        <Route path="account/signup" element={<Signup/>} />
        <Route path="account/signin" element={<Signin/>} />
        <Route path="account/signout" element={<Signout/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

