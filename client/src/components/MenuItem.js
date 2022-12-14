import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { fetchProduct } from "../actions";
import CoffeeLoading from "../Coffee_Loading.gif"
import CoffeeOptions from "./options/CoffeeOptions";
import NonCoffeeOptions from "./options/NonCoffeeOptions";
import LunchOptions from "./options/LunchOptions";
import BreakfastOptions from "./options/BreakfastOptions";

const MenuItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let {productId} = useParams();
  const currentProduct = useSelector(state => state.currentProduct[0])
  const user = useSelector(state => state.user.user);
  const location = useLocation();
  const date = location.state;

  useEffect(() => {
    dispatch(fetchProduct(productId))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderOptions = () => {
    switch(currentProduct.category){
      case "coffee":
        return (
          <CoffeeOptions product={currentProduct} />
        )
      case "non-coffee":
        return (
          <NonCoffeeOptions product={currentProduct} />
        )
      case "lunch":
        return (
          <LunchOptions product={currentProduct} />
        )
      case "breakfast":
        return (
          <BreakfastOptions product={currentProduct} />
        )
      default:
        return ""
    }
  }

  const renderBack = () => {
    return (user && date) ? (
      <div className="back-button" onClick={() => navigate("/order-menu", {state: date})}>Back</div>
    ) : (
      <div className="back-button" onClick={() => navigate("/account/signin")}>Signin</div>
    )
  }

  return currentProduct?.title ? (
    <div className="product-div">
      {renderBack()}
      <div className="d-flex justify-content-center row">
        <div className="col-4 info-div">
          <h3 className="text-center">{currentProduct.title}</h3>
          <p className="text-center">{currentProduct.description}</p>
          <div className="options-form">
            {renderOptions()}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="d-flex justify-content-center" style={{"paddingTop": "80px"}}>
      <img src={CoffeeLoading} width="175px" alt="loading" />
    </div>
  )
}

export default MenuItem;