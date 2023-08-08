import { Route, Routes } from "react-router-dom"
import Menu from "./Menu.jsx";
import SetTime from "./SetTime.jsx";
import Signout from "./Signout.jsx";
import EmailVerification from "./EmailVerification.jsx";
import Profile from "./Profile.jsx";
import ProfileSignout from "./ProfileSignout.jsx";
import OrderMenu from "./OrderMenu.jsx";
import OrderSignout from "./OrderSignout.jsx";
import Cart from "./Cart.jsx";
import Checkout from "./Checkout.jsx";
import MenuItem from "./MenuItem.jsx";
import Signup from "./Signup.jsx";
import Signin from "./Signin.jsx";

const PageRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Menu />} />
      <Route path="/signout" element={<Signout />} />
      <Route path="set-time" element={<SetTime />} />
      <Route path="/verify-user-email" element={<EmailVerification />} />
      <Route path="/profile" >
        <Route path="/profile" element={<Profile/>} />
        <Route path="/profile/signout" element={<ProfileSignout />} />
      </Route>
      <Route path="/order-menu" >
        <Route path="/order-menu" element={<OrderMenu />} />
        <Route path="/order-menu/signout" element={<OrderSignout />} />
        <Route path="/order-menu/cart" element={<Cart />} />
      </Route>
      <Route path="/order-checkout" element={<Checkout />} />
      <Route path="/products/:productId" element={<MenuItem />} />
      <Route path="account/signup" element={<Signup />} />
      <Route path="account/signin" element={<Signin />} />
    </Routes>
  )
}

export default PageRoutes;