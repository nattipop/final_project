import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router";
import { addToCart } from "../../actions";

const CoffeeOptions = ({product}) => {
  const flavors = useSelector(state => state.restaurant.flavors);
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [size, setSize] = useState(undefined);
  const [coffeeTemp, setCoffeeTemp] = useState(undefined);
  const [milk, setMilk] = useState(undefined);

  console.log(coffeeTemp)

  let price = (size) ? product.price[size].$numberDecimal : undefined
  let decimal = Number(price);
  
  let optionValues = {
    availability: {
      start: product.availability.start,
      end: product.availability.end
    },
    title: product.title,
    net_price: price,
    hot_iced: coffeeTemp,
    milk: milk,
    size: size,
    cream: undefined,
    flavor: undefined,
    extra_espresso: undefined,
    notes: undefined,
    price: undefined
  }

  const handleAddToCart = () => {
    if(!optionValues.hot_iced){
      return alert("Please choose Hot or Iced")
    }
    if(!optionValues.size){
      return alert("Please choose Size")
    }
    if(product.title === "Latte" && !optionValues.milk){
      return alert("Please choose Milk Option")
    }
    if(product.title === "Americano" && !optionValues.cream){
      return alert("Please choose Cream Option")
    }
    if(optionValues.flavor){
      decimal += 0.6
    }

    switch(optionValues.extra_espresso){
      case "1 shot":
        decimal += 0.6;
        break;
      case "2 shots":
        decimal += 1.2;
        break;
      case "3 shots":
        decimal += 1.8;
        break;
      default:
        break;
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

  const renderCreamOption = () => {
    return (product.title === "Americano" || product.title === "Brewed Coffee") ? (
      <select onChange={e => optionValues.cream = e.target.value} className="options form-select">
        <option defaultValue>Cream Option</option>
        <option value="">No Cream</option>
        <option value="Cream">Cream</option>
      </select>
    ) : ""
  }

  const renderFlavors = () => {
    if(flavors){
      return flavors.map((flavor, i) => (<option key={i} value={flavor}>{`${flavor}  - $0.60`}</option>))
    }
  }

  const renderMilkOption = () => {
    return (product.title === "Latte") ? (
      <select onChange={e => setMilk(e.target.value)} className="options form-select">
        <option defaultValue>Milk Options</option>
        <option value="Whole Milk">Whole Milk</option>
        <option value="Skim Milk">Skim Milk</option>
        <option value="Oat Milk">Oat Milk</option>
        <option value="Almond Milk">Almond Milk</option>
      </select>
    ) : ""
  }

  return (
    <div>
      <select onChange={e => {
        setCoffeeTemp(e.target.value)
      }} className="options form-select">
        <option defaultValue>Hot or Iced</option>
        <option value="Hot">Hot</option>
        <option value="Iced">Iced</option>
      </select>
      <select onChange={e => {
        setSize(e.target.value)
      }} className="size options form-select">
        <option defaultValue>Size</option>
        <option value="Small">{"Small (12oz, 1 shot of espresso)"}</option>
        <option value="Medium">{"Medium (16oz, 2 shots of espresso)"}</option>
        <option value="Large">{"Large (20oz, 3 shots of espresso)"}</option>
      </select>
      {renderCreamOption()}
      {renderMilkOption()}
      <select onChange={e => {
        optionValues.flavor = e.target.value;
      }} className="options form-select">
        <option defaultValue>Flavor</option>
        {renderFlavors()}
      </select>
      <select onChange={e => {
        optionValues.extra_espresso = e.target.value;
      }} className="options form-select">
        <option defaultValue>{"Extra Espresso (not required)"}</option>
        <option value="1 shot">{"1 Extra Shot"}</option>
        <option value="2 shots">{"2 Extra Shots"}</option>
        <option value="3 shots">{"3 Extra Shots"}</option>
      </select>
      <textarea onChange={e => optionValues.notes = e.target.value} className="options form-control" placeholder="Special options or notes" type="text-box" />
      <div onClick={handleAddToCart} className="add-to-cart">Add to Cart</div>
    </div>
  )
}

export default CoffeeOptions;