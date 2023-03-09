import { Route, Routes } from "react-router"
import Menu from "./Menu";
import SetTime from "./SetTime";
import Signout from "./Signout";
import EmailVerification from "./EmailVerification";
import Profile from "./Profile";
import ProfileSignout from "./ProfileSignout";
import OrderMenu from "./OrderMenu";
import OrderSignout from "./OrderSignout";
import Cart from "./Cart";
import Checkout from "./Checkout";
import MenuItem from "./MenuItem";
import Signup from "./Signup";
import Signin from "./Signin";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/signout" element={<Signout />} />
      <Route path="set-time" element={<SetTime />} />
      <Route path="/verify-user-email/:userToken" element={<EmailVerification />} />
      <Route exact path="/profile" element={<Profile />} >
        <Route path="/profile/signout" element={<ProfileSignout />} />
      </Route>
      <Route exact path="/order-menu" element={<OrderMenu />} >
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

export default App;