import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchProduct } from "../actions";
import CoffeeLoading from "../Coffee_Loading.gif"

const MenuItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let {productId} = useParams();
  const currentProduct = useSelector(state => state.currentProduct[0])

  useEffect(() => {
    dispatch(fetchProduct(productId))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const flavors = [ "Caramel", "Vanilla", "Chocolate", "Hazelnut", "White Chocolate", "Coconut", "Ameretto", "Strawberry", "Raspberry"]

  const renderFlavors = () => {
    return flavors.map((flavor, i) => (<option key={i} value={flavor}>{`${flavor}  - $0.60`}</option>))
  }

  const renderOptions = () => {
    switch(currentProduct.category){
      case "coffee":
        return (
          <div>
            <select className="options form-select">
              <option defaultValue>Hot or Iced</option>
              <option value="Hot">Hot</option>
              <option value="Iced">Iced</option>
            </select>
            <select className="options form-select">
              <option defaultValue>Size</option>
              <option value="Small">{"Small (12oz, 1 shot of espresso)"}</option>
              <option value="Medium">{"Medium (16oz, 2 shots of espresso)"}</option>
              <option value="Large">{"Large (20oz, 3 shots of espresso)"}</option>
            </select>
            <select className=" options form-select">
              <option defaultValue>Flavor</option>
              {renderFlavors()}
            </select>
            <select className="options form-select">
              <option defaultValue>{"Extra Espresso (not required)"}</option>
              <option value="1 shot">{"1 Extra Shot"}</option>
              <option value="2 shots">{"2 Extra Shots"}</option>
              <option value="3 shots">{"3 Extra Shots"}</option>
            </select>
            <textarea className="options form-control" placeholder="Special options or notes" type="text-box" />
          </div>
        )
      case "non-coffee":
        return (
          <select className="form-select">
            <option defaultValue>open</option>
            <option value="1">this is not coffee</option>
          </select>
        )
      // case "lunch":
      //   return (

      //   )
      // case "breakfast":
      //   return (

      //   )
      default:
        return ""
    }
  }

  return currentProduct?.title ? (
    <div className="product-div" style={{"backgroundImage": `url("${currentProduct.picture}")`}}>
      <div className="back-button" onClick={() => navigate(-1)}>Back</div>
      <div className="d-flex justify-content-center row">
        <div className="col-4 info-div">
          <h3 className="text-center">{currentProduct.title}</h3>
          <p className="text-center">{currentProduct.description}</p>
          <div className="options-form">
            {renderOptions()}
          </div>
          <div id="add-to-cart">Add to Cart</div>
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