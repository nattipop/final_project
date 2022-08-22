import {combineReducers } from "redux";
import AuthReducer from "./reducerAuth";
import ProductsReducer from "./reducerProducts";
import UserReducer from "./reducerUser";
import CurrentProductReducer from "./reducerProduct";
import RestaurantReducer from "./reducerRestaurant"
import CartReducer from "./reducerCart"

const rootReducer = combineReducers({
  auth: AuthReducer,
  products: ProductsReducer,
  user: UserReducer,
  currentProduct: CurrentProductReducer,
  restaurant: RestaurantReducer,
  cart: CartReducer
})

export default rootReducer;