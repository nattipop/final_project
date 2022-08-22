import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router";
import { addToCart, fetchRestaurant } from "../../actions";

const NonCoffeeOptions = ({product}) => {
  const flavors = useSelector(state => state.restaurant.flavors);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user)
  const [nonSize, setNonSize] = useState(undefined)
  const [drinkTemp, setDrinkTemp] = useState(undefined);
  const [chai, setChai] = useState(undefined);

  let price = (nonSize) ? product.price[nonSize].$numberDecimal : undefined
  let decimal = Number(price);

  useEffect(() => {
    if(!flavors) {
      dispatch(fetchRestaurant())
    }
  })

  let optionValues = {
    title: product.title,
    net_price: price,
    chai_option: chai,
    hot_iced: drinkTemp,
    milk: undefined,
    size: nonSize,
    flavor: undefined,
    notes: undefined,
    price: undefined
  }

  const renderTempOps = () => {
    return (product.title === "Lemonade" || product.title === "Italian Soda") ? "" : (
      <select onChange={e => setDrinkTemp(e.target.value)} className="options form-select">
        <option defaultValue>Hot or Iced</option>
        <option value="Hot">Hot</option>
        <option value="Iced">Iced</option>
      </select>
    )
  }

  const renderMilkOption = () => {
    return (product.title === "Matcha" || product.title === "Chai") ? (
      <select onChange={(e) => optionValues.milk = e.target.value} className="options form-select">
        <option defaultValue>Milk Options</option>
        <option value="Whole Milk">Whole Milk</option>
        <option value="Skim Milk">Skim Milk</option>
        <option value="Oat Milk">Oat Milk</option>
        <option value="Almond Milk">Almond Milk</option>
      </select>
    ) : ""
  }

  const renderChais = () => {
    return (product.title === "Chai") ? (
      <select onChange={e => setChai(e.target.value)} className="options form-select">
        <option defaultValue>Choose Kind</option>
        <option value="Spiced">Spiced Chai</option>
        <option value="Vanilla">Vanilla Chai</option>
        <option value="Raspberry">Raspberry Chai</option>
        <option value="Pumpkin Spice">Pumpkin Spice Chai</option>
      </select>
    ) : ""
  }

  const handleAddToCart = () => {
    if(!optionValues.hot_iced && product.title !== "Lemonade"){
      return alert("Please choose Hot or Iced")
    }
    if(!optionValues.size){
      return alert("Please choose Size")
    }
    if(product.title === "Chai" && !optionValues.milk){
      return alert("Please choose Milk Option")
    }
    if(product.title === "Matcha" && !optionValues.milk){
      return alert("Please choose Milk Option")
    }
    if(product.title === "Chai" && !optionValues.chai_option){
      return alert("Please choose Chai Flavor")
    }
    if(optionValues.flavor){
      decimal += 0.6
    }

    switch(optionValues.milk){
      case "Oat Milk":
        decimal += 0.6;
        break;
      case "Almond Milk":
        decimal += 0.6;
        break;
      default:
        break;
    }

    optionValues.price = decimal.toFixed(2);

    if(!user){
      navigate("/account/signin")
      alert("You must be signed in to add to cart")
    }

    if(user){
      dispatch(addToCart(user._id, optionValues));
      navigate(-1)
    }
  }

  const renderFlavors = () => {
    return flavors.map((flavor, i) => (<option key={i} value={flavor}>{`${flavor}  - $0.60`}</option>))
  }

  return (
    <div>
      {renderTempOps()}
      {renderChais()}
      {renderMilkOption()}
      <select onChange={e => setNonSize(e.target.value)} className="options form-select">
        <option defaultValue>Size</option>
        <option value="Small">{"Small (12oz, 1 shot of espresso)"}</option>
        <option value="Medium">{"Medium (16oz, 2 shots of espresso)"}</option>
        <option value="Large">{"Large (20oz, 3 shots of espresso)"}</option>
      </select>
      <select onChange={e => optionValues.flavor = e.target.value} className="options form-select">
        <option defaultValue>Flavor</option>
        {renderFlavors()}
      </select>
      <textarea onChange={e => optionValues.notes = e.target.value} className="options form-control" placeholder="Special options or notes" type="text-box" />
      <div onClick={handleAddToCart} className="add-to-cart">Add to Cart</div>
    </div>
  )
}

export default NonCoffeeOptions;