import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchRestaurant } from "../../actions";

const NonCoffeeOptions = ({product}) => {
  const flavors = useSelector(state => state.restaurant.flavors);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!flavors) {
      dispatch(fetchRestaurant())
    }
  })

  const renderTempOps = () => {
    return (product.title === "Lemonade" || product.title === "Italian Soda") ? "" : (
      <select className="options form-select">
        <option defaultValue>Hot or Iced</option>
        <option value="Hot">Hot</option>
        <option value="Iced">Iced</option>
      </select>
    )
  }

  const renderChais = () => {
    return (product.title === "Chai") ? (
      <select className="options form-select">
        <option defaultValue>Choose Kind</option>
        <option value="Spiced">Spiced Chai</option>
        <option value="Vanilla">Vanilla Chai</option>
        <option value="Raspberry">Raspberry Chai</option>
        <option value="Pumpkin Spice">Pumpkin Spice Chai</option>
      </select>
    ) : ""
  }

  const renderFlavors = () => {
    return flavors.map((flavor, i) => (<option key={i} value={flavor}>{`${flavor}  - $0.60`}</option>))
  }

  return (
    <div>
      {renderTempOps()}
      {renderChais()}
      <select className="options form-select">
        <option defaultValue>Size</option>
        <option value="Small">{"Small (12oz, 1 shot of espresso)"}</option>
        <option value="Medium">{"Medium (16oz, 2 shots of espresso)"}</option>
        <option value="Large">{"Large (20oz, 3 shots of espresso)"}</option>
      </select>
      <select className="options form-select">
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
      <div className="add-to-cart">Add to Cart</div>
    </div>
  )
}

export default NonCoffeeOptions;