import {combineReducers } from "redux";
import AuthReducer from "./reducerAuth";
import ProductsReducer from "./reducerProducts";

const rootReducer = combineReducers({
  auth: AuthReducer,
  products: ProductsReducer
})

export default rootReducer;