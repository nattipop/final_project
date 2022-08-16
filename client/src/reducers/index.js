import {combineReducers } from "redux";
import AuthReducer from "./reducerAuth";
import ProductsReducer from "./reducerProducts";
import UserReducer from "./reducerUser"

const rootReducer = combineReducers({
  auth: AuthReducer,
  products: ProductsReducer,
  user: UserReducer
})

export default rootReducer;